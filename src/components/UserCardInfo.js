import React, {useState} from 'react';
import {List} from 'react-native-paper';

export default function UserCardInfo({data}) {

    UserCardInfo.defaultProps = {
        startTime: '',
        endTime: '',
        hourlyRate: '',
        extraInfo: ''
    }

    return (
        <List.Section>
            <List.Subheader>Some title</List.Subheader>
            <List.Item
                title="Salary"
                description={data.hourlyRate + 'ph'}
                left={() => <List.Icon color="#157EFB" icon="checkbox-blank-circle" />}
            />
            <List.Item
                title="Shift Time"
                description={data.startTime + ' - ' + data.endTime}
                left={() => <List.Icon color="#157EFB" icon="checkbox-blank-circle" />}
            />
            <List.Item
                title="Extra Info"
                description={data.extraInfo}
                left={() => <List.Icon color="#157EFB" icon="checkbox-blank-circle" />}
            />
        </List.Section>
    );


}