import {Alert, Platform, ToastAndroid} from "react-native";

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


