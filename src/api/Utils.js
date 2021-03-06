import {Alert, Platform, ToastAndroid} from "react-native";
import {check, request, PERMISSIONS, RESULTS} from "react-native-permissions";
import call from "react-native-phone-call";
import ImagePicker from "react-native-image-picker";
import {uploadImage} from "./APIUtils";

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

export const callPhone = (phone : string) => {
    const phoneState = {
        number: `0${phone}`,
        prompt: false
    }
    call(phoneState).catch(console.error)
}


export const imagePicker = async (userType : string,
                                  userId: string,
                                  resourceName : string,
                                  setter = (_) => {},
                                  upload = true) => {

    checkPermission(PERMISSION_TYPE.photos)
    checkPermission(PERMISSION_TYPE.camera)

    const options = {
        title: `Update ${resourceName} Picture`,
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else {
            console.log("Got here")
            console.log("Loading")
            // loading(true)
            setter(response.uri)
            if (upload) {
                uploadImage(response.uri, userType, userId, resourceName.toLowerCase())
            }
            // uploadImage(response.uri, userType, userId, resourceName.toLowerCase()).then(introduceDelay(setter,loading, response.uri))
        }
    });
}

// // Delay doesn't actually introduce a delay. Refactor/ Remove
// function introduceDelay(setter = (_) => {}, loading = (_) => {}, uri) {
//     loading(false)
//     setter(uri)
//     console.log("I deleyaed")
// }
