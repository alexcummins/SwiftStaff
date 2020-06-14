import React, {useState} from 'react';
import {TouchableOpacity} from "react-native";
import {List, Text} from "react-native-paper";
import {scale} from "react-native-size-matters";

export default function ExtraInfo({extraInfo, defaultLines}) {

    function expandInfo() {
        if (extraInfoLines === defaultLines){
            setExtraInfoLines(100)
        } else {
            setExtraInfoLines(defaultLines)
        }
    }

    const [extraInfoLines, setExtraInfoLines] = useState(defaultLines)

    return <TouchableOpacity onPress={() => expandInfo()}>
        <List.Item
            title={'Extra Info'}
            description={extraInfo === "" ? "No extra info" : extraInfo}
            descriptionStyle={{fontSize: scale(15)}}
            descriptionNumberOfLines={extraInfoLines}
            left={() => <Text style={{fontSize: 50, color: "#157EFB"}}>•</Text>}
        />
    </TouchableOpacity>;
}