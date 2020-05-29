import React, {useState, useEffect} from 'react';
import {View, Text, Button, Platform, ToastAndroid, Alert, ScrollView} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {List} from 'react-native-paper';

import {getJobs} from '../api/APIUtils';
import UserCard from '../components/userCard';

export default function UserScreen({navigation}) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [rate, setRate] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [jobsList, setJobsList] = useState([]);

  function updateJobs() {
    getJobs().then((data) => {
      setJobsList(data);
    });

  }

  useEffect(() => {
    (async () => {
      const data = await getJobs();
      setJobsList(data);
    })();

  });


  function jobCardMaker(job) {
    return (<UserCard data={job}/>)
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
    <ScrollView >
      <Paragraph></Paragraph>
      <List.Section>
        {jobsList.map(jobCardMaker)}
      </List.Section>
    </ScrollView>
  );


  function notifyMessage(msg: string) {
    console.log(`Displaying: ${msg}`);
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }
}

