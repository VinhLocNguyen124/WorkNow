
//Notification config
import { fcmService } from '../notifications/FCMService';
import { localNotificationService } from '../notifications/LocalNotificationService';

const onInitialFCMConfig = () => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
}

const onRegister = (token) => {
    console.log("[App] Token", token);
}

const onNotification = (notify) => {
    // console.log("[App] onNotification", notify);
    const options = {
        soundName: 'default',
        playSound: true,
    }

    localNotificationService.showNotification(
        0,
        notify.notification.title,
        notify.notification.body,
        notify.data.imageUrl,
        notify,
        options,
        "notification_chanel",
        "Remote Notification Chanel Other",
        "This chanel for receiving noti from server"
    )
}

const onOpenNotification = async (notify) => {
    //on Press to notification
    console.log('notify', notify);
}

export {
    onInitialFCMConfig,
}
