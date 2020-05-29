import React, {useState} from 'react';
import {View, Text, Button, Platform, ToastAndroid, Alert} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

export default function UserCard({data}) {

  const [name, setName] = useState(data.name);
  const [date, setDate] = useState(data.date);
  const [startTime, setStartTime] = useState(data.startTime);
  const [endTime, setEndTime] = useState(data.endTime);
  const [rate, setRate] = useState(data.hourlyRate);
  const [extraInfo, setExtraInfo] = useState(data.extraInfo);

  function updateCard(data) {
    setName(data.name);
    setDate(data.date);
    setStartTime(data.startTime);
    setEndTime(data.endTime);
    setRate(data.hourlyRate);
    setExtraInfo(data.extraInfo);
  }

  function clearValues() {
    setName('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setRate('');
    setExtraInfo('');
  }

  return (
    <View>
      <Card style={{ marginVertical: 10, marginHorizontal: 10}}>
        <Card.Title title={name} subtitle={date}/>
        <Card.Content>
          <Paragraph>{startTime}</Paragraph>
          <Paragraph>{endTime}</Paragraph>
          <Paragraph>{rate}</Paragraph>
          <Paragraph>{extraInfo}</Paragraph>
          <Button title="Accept" onPress={() => clearValues()}/>
        </Card.Content>
      </Card>
    </View>
  );
}
