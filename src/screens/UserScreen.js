import React, { useState } from "react";
import {View, Text, Button, Platform, ToastAndroid, AlertIOS} from 'react-native';
import { Card, Title, Paragraph } from "react-native-paper";
import axios from 'axios';

export default function UserScreen({ navigation }) {

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [rate, setRate] = useState("");
  const [extraInfo, setExtraInfo] = useState("");

  function updateJobs() {
     getValues().then((data)=> {
      setName(data.name)
      setDate(data.date)
      setStartTime(data.startTime)
      setEndTime(data.endTime)
      setRate(data.hourlyRate)
      setExtraInfo(data.extraInfo)
    })

  }

  function clearValues() {
    setName("")
    setDate("")
    setStartTime("")
    setEndTime("")
    setRate("")
    setExtraInfo("")
  }

  return (
    <View style={{ flex: 1 }}>
      <Button title="Check for jobs" onPress={() => updateJobs()} />
      <Paragraph></Paragraph>
      <Card>
        <Card.Content>
          <Title>{name}</Title>
          <Paragraph>{date}</Paragraph>
          <Paragraph>{startTime} {endTime}</Paragraph>
          <Paragraph>{rate}</Paragraph>
          <Paragraph>{extraInfo}</Paragraph>
          <Button title="Accept" onPress={() => clearValues()} />
        </Card.Content>
      </Card>
    </View>
  );

  async function getValues() {
    var dataObj = {
      name: "",
        date: "",
      startTime: "",
      endTime: "",
      hourlyRate: "",
      extraInfo: ""
    }
     await axios.get('http://178.62.102.69:8080/api/v1/jobs').then(function (response) {
      const jobs = response.data.jobsList;
      const job = jobs[jobs.length - 1]
      dataObj = {
        name: "Test Restaurant",
        date: "Date: " + job.date,
        startTime: "Start Time:" + job.startTime,
        endTime: "End Time:" + job.endTime,
        hourlyRate: "Hourly rate: " +job.hourlyRate,
        extraInfo: "Extra Info: " + job.extraInfo
      }
      console.log(JSON.stringify(dataObj))
      notifyMessage('A job was found');
    }).catch(function (error) {
      console.log(JSON.stringify(error))
      notifyMessage('Sorry no jobs found');

    });
    return dataObj;
  }

  function notifyMessage(msg: string) {
    console.log(`Displaying: ${msg}`);
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  }
}

