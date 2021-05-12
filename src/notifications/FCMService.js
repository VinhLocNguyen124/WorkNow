import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { localNotificationService } from './LocalNotificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';


/**  
 * ?                                                                      true -> getToken()
 * ? Workflow: registerAppWithFCM() -> register() -> checkPermission() ->                                           -> createNotificationListeners() -> Lắng nghe remote noti truyền đến ứng dụng trong các trạng thái foreground - background - quit và sử dụng các hàm bên file LocalNotificationService.js để hiển thị noti -- Listen remote notifications sent from server in one of client app states, foreground - background - quit. Then, using some functions inside  LocalNotificationService.js file to display notification.
 * ?                                                                      false -> requestPermission() -> getToken()
 *  */

class FCMService {
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister);
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
    }

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled();
        }
    }

    checkPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // User has permission
                    // this.getToken(onRegister);
                } else {
                    // User don't have permission
                    this.requestPermission(onRegister);
                }
            }).catch(error => {
                console.log("[FCMService] Permission Rejected", error);
            })
    }

    getToken = (onRegister) => {
        messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    onRegister(fcmToken)
                } else {
                    console.log("[FCMService] User does not have a devices token")
                }
            }).catch(error => {
                console.log("[FCMService] getToken Rejected", error);
            })
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission()
            .then(() => {
                // this.getToken(onRegister);
            }).catch(error => {
                console.log("[FCMService] Request Permission Rejected", error);
            })
    }

    deleteToken = () => {
        console.log("[FCMService] Delete Token");
        messaging().deleteToken()
            .catch(error => {
                console.log("[FCMService] Delete Token Error", error);
            })
    }

    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {

        // When Application Running on Background
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("[FCMService] OnNotificationOpenedApp getInitialNotification", remoteMessage);
            if (remoteMessage) {
                const notification = remoteMessage;
                onOpenNotification(notification);
            }
        });

        //When Application open from quit state
        messaging().getInitialNotification()
            .then(remoteMessage => {
                console.log("[FCMService] getInitialNotification getInitialNotification", remoteMessage);
                if (remoteMessage) {
                    const notification = remoteMessage;
                    localNotificationService.cancelAllLocalNotifications();
                    onOpenNotification(notification);
                }
            });

        //Foreground state message
        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log("[FCMService] A new FCm message arrived", remoteMessage);
            if (remoteMessage) {
                let notification = null;
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.data
                } else {
                    notification = remoteMessage
                }

                //Handle message in here before push notification

                onNotification(notification);
            }
        });

        //Background state message
        this.messageListenerOnBackground = messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log("[FCMService]Message handled in the background!", remoteMessage);
            if (remoteMessage) {
                let notification = null;
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.data
                } else {
                    notification = remoteMessage
                }

                onNotification(notification);
            }
        });


        // Triggered when have new Token
        messaging().onTokenRefresh(fcmToken => {
            // try {
            //     AsyncStorage.setItem('token', fcmToken);
            // } catch (e) {
            //     console.log(e);
            // }

            console.log("[FCMService] New token refresh", fcmToken);
            onRegister(fcmToken);
        });
    }

    unRegister = () => {
        this.messageListener();
        this.messageListenerOnBackground();
    }

    stopAlarmRing = async () => {
        if (Platform.OS != 'ios') {
            await messaging().stopAlarmRing();
            console.log('sdfghjkldfgh', "stopAlarmRing");
        }
    }




}

export const fcmService = new FCMService()

// const a = {
//     "collapseKey": "com.bgservice1",
//     "data": {},
//     "from": "627132951312",
//     "messageId": "0:1615737100267261%492b59ee492b59ee",
//     "notification": {
//         "android": {},
//         "body": "Test notification from firebase",
//         "title": "Test noti2"
//     },
//     "sentTime": 0, "ttl": 2419200
// }

// const a = {
//     "data": {
//         "greeting": "Hello guys"
//     },
//     "from": "421076469731",
//     "messageId": "0:1616310248727789%a6cabeb8f9fd7ecd",
//     "sentTime": 1616310248708,
//     "ttl": 2419200
// }