import PushNotification from "react-native-push-notification"

class LocalNotificationService {
    configure = (onOpenNotification) => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("[LocalNotificationService] onRegister:", token);
            },
            onNotification: function (notification) {
                console.log("[LocalNotificationService] onNotification:", notification);
                if (!notification?.data) {
                    return
                }
                notification.userInteraction = true;
                onOpenNotification(notification.data);
            },
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        })
    }

    unregister = () => {
        PushNotification.unregister();
    }

    showNotification = (id, title, message, imgUrl, data = {}, options = {}, chanelID, chanelName, chanelDes) => {
        this.createChanelNotification(chanelID, chanelName, chanelDes);
        PushNotification.localNotification({
            /* Android Only Properties */
            ...this.buildAndroidNotification(id, title, message, data, options),
            title: title || "",
            message: message || "",

            largeIcon: imgUrl || "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
            largeIconUrl: imgUrl || "https://www.example.tld/picture.jpg", // (optional) default: undefined
            smallIcon: imgUrl || "ic_notification",
            bigPictureUrl: imgUrl || "https://www.example.tld/picture.jpg", // (optional) default: undefined
            bigLargeIcon: imgUrl || "ic_launcher", // (optional) default: undefined
            bigLargeIconUrl: imgUrl || "https://www.example.tld/bigicon.jpg", // (optional) default: undefined

            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false, // BOOLEAN : If notification was opened by the user from notification
            channelId: chanelID,
            badge: true,
        });
    }

    buildAndroidNotification = (id, title, message, imgUrl, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_notification",
            bigText: message || '',
            subText: title || '',

            largeIcon: imgUrl || "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
            largeIconUrl: imgUrl || "https://www.example.tld/picture.jpg", // (optional) default: undefined
            smallIcon: imgUrl || "ic_notification",
            bigPictureUrl: imgUrl || "https://www.example.tld/picture.jpg", // (optional) default: undefined
            bigLargeIcon: imgUrl || "ic_launcher", // (optional) default: undefined
            bigLargeIconUrl: imgUrl || "https://www.example.tld/bigicon.jpg", // (optional) default: undefined

            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || 'high',
            importance: options.importance || 'high',
            data: data,
        }
    }

    cancelAllLocalNotifications = () => {
        PushNotification.cancelAllLocalNotifications();
    }

    removeDeliveredNotificationByID = (notificationId) => {
        console.log("[LocalNotificationService] removeDeliveredNotificationByID:", notificationId);
        PushNotification.cancelLocalNotifications({ id: `${notificationId}` })
    }

    createChanelNotification = (chanelID, chanelName, chanelDes) => {
        PushNotification.createChannel(
            {
                channelId: chanelID, // (required)
                channelName: chanelName, // (required)
                channelDescription: chanelDes, // (optional) default: undefined.
                playSound: true, // (optional) default: true
                soundName: "notification.mp3", // (optional) See `soundName` parameter of `localNotification` function
                importance: 4, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    deleteChanel = (chanelID) => {
        PushNotification.deleteChannel(chanelID);
    }

}

export const localNotificationService = new LocalNotificationService();
