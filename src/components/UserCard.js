import React, {useState} from 'react';
import {View, Text, Button, Platform, ToastAndroid, Alert} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import UserCardInfo from "./UserCardInfo";

export default function UserCard({data}) {

  return (
    <View>
      <Card style={{ marginVertical: 10, marginHorizontal: 10}}>
        <Card.Title title={data.name} subtitle={data.date}/>
        <Card.Content>
          <UserCardInfo data={data}/>
          <Button title="Accept" onPress={() => clearValues()}/>
        </Card.Content>
      </Card>
    </View>
  );
}
