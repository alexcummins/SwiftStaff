import React, {useState, useEffect} from 'react';
import {View, Text, Button, Platform, ToastAndroid, Alert, ScrollView} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {List} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import {API_JOB_URL, convertDataToJobCardData, getJobRequest, WEBSOCKET_PROTOCOL} from '../../api/APIUtils';
import UserCard from '../../components/UserCard';
import AsyncStorage from '@react-native-community/async-storage';

let retrieveNotifications = () => {}
export default function TempWorkerOffersScreen( props) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [rate, setRate] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [jobsList, setJobsList] = useState(props.preFetchDataJobList);
  const [timer, setTimer] = useState(setInterval(retrieveNotifications, 100000))
  const [workerId, setWorkerId] = useState('')
  useFocusEffect(

    React.useCallback(() => {
      var ws = {};
      const asyncWorker = AsyncStorage.getItem("workerId").then((asyncWorkerId) => {
        setWorkerId(asyncWorkerId)

      const workerIdSocketString = `workerId: ${asyncWorkerId}`
      console.log(`${WEBSOCKET_PROTOCOL}${API_JOB_URL}`);
        ws = new WebSocket(`${WEBSOCKET_PROTOCOL}${API_JOB_URL}`);
      ws.onopen = (e) => {
        console.log(workerIdSocketString)
        ws.send(workerIdSocketString)
      }

      ws.onerror = (e) => {
        // an error occurred
        console.log(e.message);
      };

      ws.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
      };

      ws.onmessage = (e) => {
        // a message was received
        const newList = convertDataToJobCardData(JSON.parse(e.data));
        if(newList.length !== 0){
          setJobsList(newList.reverse())
        }
      };
      retrieveNotifications = async () => {
        const res = ws.send(workerIdSocketString)
      }

        }

      )
      return () => {
        clearInterval(timer);
        ws.close();
      };

    }, []))


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


  return (
    <ScrollView >
      <List.Section style={{marginTop:30}}>
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



