import {Alert, Platform, ToastAndroid} from "react-native";

export function notifyMessage(msg: string) {
    console.log(`Displaying: ${msg}`);
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
        Alert.alert(msg);
    }
}

export const userTypeEnum = {restaurant: 1, worker: 2}
