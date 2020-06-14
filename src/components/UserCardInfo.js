import React, {useState} from 'react';
import {List, Text} from 'react-native-paper';
import {TouchableOpacity, Dimensions} from "react-native";
import {scale} from "react-native-size-matters"
import ExtraInfo from "./ExtraInfo";

export default function UserCardInfo({data}) {

    UserCardInfo.defaultProps = {
        startTime: '',
        endTime: '',
        hourlyRate: '',
        extraInfo: ''
    }

    return (
        <List.Section>
            <List.Item
                title="Hourly pay"
                description={`£${data.hourlyRate}ph`}
                descriptionStyle={{fontSize: scale(20)}}
                left={() => <Text style={{fontSize: 50, color: "#157EFB"}}>•</Text>}
            />
            <List.Item
                title="Shift Time"
                description={data.startTime + '-' + data.endTime}
                descriptionStyle={{fontSize: scale(20)}}
                descriptionNumberOfLines={3}
                left={() => <Text style={{fontSize: 50, color: "#157EFB"}}>•</Text>}
            />
            <ExtraInfo extraInfo={data.extraInfo} defaultLines={3} />
        </List.Section>
    );
}