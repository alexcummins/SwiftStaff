import React, {useState} from 'react';
import {List, Text} from 'react-native-paper';

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
        left={() => <Text style={{fontSize: 50, color: "#157EFB"}}>•</Text>}
      />
      <List.Item
        title="Shift Time"
        description={data.startTime + ' - ' + data.endTime}
        left={() =><Text style={{fontSize: 50, color: "#157EFB"}}>•</Text>}
      />
      <List.Item
        title="Extra Info"
        description={data.extraInfo}
        left={() =><Text style={{fontSize: 50, color: "#157EFB"}}>•</Text>}
      />
    </List.Section>
  );


}