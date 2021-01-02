import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

const PLATFORM_MICROPHONE_PERMISSIONS = {
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO
}

const PLATFORM_CAMERA_PERMISSIONS = {
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA
}

const PLATFORM_PHOTO_PERMISSIONS = {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
}

const REQUEST_PERMISSION_TYPE = {
    microphone: PLATFORM_MICROPHONE_PERMISSIONS,
    photo: PLATFORM_PHOTO_PERMISSIONS,
    camera: PLATFORM_CAMERA_PERMISSIONS,
}

const PERMISSION_TYPE = {
    microphone: 'microphone',
    photo: 'photo',
    camera: 'camera',
}

class AppPermission {
    checkPermission = async (type: string): Promise<boolean> => {
        console.log("AppPermission checkPermission type: ", type);
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
        console.log("AppPermission checkPermission: ", permissions);
        if (!permissions) {
            return true;
        }
        try {
            const result = await check(permissions);
            console.log("AppPermission checkPermission result: ", result);
            if (result === RESULTS.GRANTED) return true;
            return this.requestPermission(permissions)//request permission
        } catch (error) {
            console.log("AppPermission checkPermission error: ", error);
            return false;
        }
    }

    requestPermission = async (permissions): Promise<boolean> => {
        console.log("AppPermission requestPermission permissions: ", permissions);
        try {
            const result = await request(permissions);
            console.log("AppPermission requestPermission result: ", result);
            return result === RESULTS.GRANTED
        } catch (error) {
            console.log("AppPermission requestPermission error: ", error);
            return false;
        }
    }

    requestMultiple = async (types): Promise<boolean> => {
        console.log("AppPermission requestMultiple types: ", types);
        const results = [];
        for (const type of types) {
            const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];
            if (!permission) {
                const result = await this.requestPermission(permission);
                results.push(result);
            }
        }
        for (const result of results) {
            if (!result) {
                return false;
            }
        }
        return true;
    }
}

const Permission = new AppPermission();
export { Permission, PERMISSION_TYPE }