import React, {useState, useEffect} from 'react';
import {View, Text, Button, Platform, ToastAndroid, Alert, ScrollView} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {List} from 'react-native-paper';

import {convertDataToJobCardData, getJobs} from '../api/APIUtils';
import UserCard from '../components/userCard';
var ws = new WebSocket('ws://localhost:8080/api/v1/jobs');
ws.onopen = (e) => {
  console.log(e);
}


ws.onerror = (e) => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = (e) => {
  // connection closed
  console.log(e.code, e.reason);
};

export default function UserScreen({navigation}) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [rate, setRate] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [jobsList, setJobsList] = useState([]);
  const [timer, setTimer] = useState(setInterval(retrieveNotifications, 10000))
  function updateJobs() {
    getJobs().then((data) => {
      setJobsList(data.reverse());
    });

  }

  useEffect(() => {
    // (async () => {
    //   const data = await getJobs();
    //   setJobsList(data.reverse());
    // })();
    ws.send("open")
  }, []);

  ws.onmessage = (e) => {
    // a message was received
    const newList = convertDataToJobCardData(JSON.parse(e.data));
    if(newList.length !== 0){
      setJobsList(newList.reverse())
    }
  };

  function jobCardMaker(job) {
    return (<UserCard data={job} key={job.id}/>)
  }

  function clearValues() {
    setName('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setRate('');
    setExtraInfo('');
  }

   async function retrieveNotifications()  {
    const res = ws.send("check")
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



