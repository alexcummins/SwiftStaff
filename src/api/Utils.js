import {Alert, Platform, ToastAndroid} from "react-native";
import {check, request, PERMISSIONS, RESULTS} from "react-native-permissions";
import call from "react-native-phone-call";

export function notifyMessage(msg: string) {
    console.log(`Displaying: ${msg}`);
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
        Alert.alert(msg);
    }
}


export class userTypeEnumClass {
    constructor(type) {
        this.RESTAURANT = 1;
        this.WORKER = 2;
    }
}

const PLATFORM_CAMERA_PERMISSIONS = {
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA
}

const PLATFORM_PHOTOS_PERMISSIONS = {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
}

const REQUEST_PERMISSION_TYPE = {
    camera: PLATFORM_CAMERA_PERMISSIONS,
    photos: PLATFORM_PHOTOS_PERMISSIONS
}

export const PERMISSION_TYPE = {
    camera: 'camera',
    photos: 'photos'
}

const requestPermission = async (permissions): Promise<boolean> => {
    try {
        const result = await request(permissions)
        return result === RESULTS.GRANTED
    } catch (e) {
        console.log(e)
        console.log("Request Permission Unknown failure")
        return false
    }
}

export const checkPermission = async (permType): Promise<boolean> => {
    const permissions = REQUEST_PERMISSION_TYPE[permType][Platform.OS]
    if (!permissions) {
        return true
    }
    try {
        const result = await check(permissions)
        if (result === RESULTS.GRANTED) {
            return true
        } else {
            return requestPermission(permissions)
        }
    } catch (e) {
        console.log(e)
        console.log("Check Permission Unknown Failure")
        return false
    }
}

export const callPhone = (phone) => {
    const phoneState = {
        number: `0${phone}`,
        prompt: false
    }
    call(phoneState).catch(console.error)
}


