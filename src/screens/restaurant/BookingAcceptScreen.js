import React, {useState} from "react";
import {View, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import {List, Text} from "react-native-paper";
import UserCard from "../../components/UserCard";
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import {API_JOB_URL, convertDataToReviewCardData, WEBSOCKET_PROTOCOL} from "../../api/APIUtils";
import WorkerReviewCard from "../../components/WorkerReviewCard";
import ListAccordion from "react-native-paper/src/components/List/ListAccordion";
import AcceptedWorkerCard from '../../components/AcceptedWorkerCard';

let retrieveNotifications = () => {
}
export default function BookingAcceptScreen() {
  const [jobsList, setJobsList] = useState([]);
  const [restaurantId, setRestaurantId] = useState('')

  useFocusEffect(
    React.useCallback(() => {
      var ws = {};
      const asyncRestaurant = AsyncStorage.getItem('restaurantId').then((asyncRestaurant) => {
          setRestaurantId(asyncRestaurant);

          const workerIdSocketString = `restaurantId: ${asyncRestaurant}`;
          console.log(`${WEBSOCKET_PROTOCOL}${API_JOB_URL}`);
          ws = new WebSocket(`${WEBSOCKET_PROTOCOL}${API_JOB_URL}`);
          ws.onopen = (e) => {
            console.log(workerIdSocketString);
            ws.send(workerIdSocketString);
          };

          ws.onerror = (e) => {
            console.log(e.message);
          };

          ws.onclose = (e) => {
            console.log(e.code, e.reason);
          };

          ws.onmessage = (e) => {
            console.log(JSON.stringify(e))
            if (e.data === 'update') {
              retrieveNotifications();
            } else {
              const newList = convertDataToReviewCardData(JSON.parse(e.data));
              if (newList.length !== 0) {
                setJobsList(newList.reverse());
              }
            }
          };
          retrieveNotifications = async () => {
            ws.send(workerIdSocketString);
          };

        },
      );
      return () => {
        ws.close();
      };

    }, []))
  const updateJobsList = (newList) => {
    setJobsList(newList)
  }


  function jobReviewListAccordionMaker(jobWorkerObj) {
    if (!jobWorkerObj.jobObj.isConfirmed) {
      return null
    } else {
      let workerObj = jobWorkerObj.workersObj.find((el) => {
        return el.id === jobWorkerObj.jobObj.confirmedWorkerId
      })
      let dataObj = {
        fName: workerObj.fName,
        lName: workerObj.lName,
        workerPhone: workerObj.phone,
        date: jobWorkerObj.jobObj.date,
        startTime: jobWorkerObj.jobObj.startTime,
        endTime: jobWorkerObj.jobObj.endTime,
        hourlyRate: jobWorkerObj.jobObj.hourlyRate,
        workerId: workerObj.id,
        ratingCount: workerObj.ratingCount,
        ratingTotal: workerObj.ratingTotal,
        jobId: jobWorkerObj.jobObj.id
      }
      return (

        <AcceptedWorkerCard data={dataObj} key={jobWorkerObj.jobObj.id} updateCallBack={updateJobsList}/>

      )
    }
  }

  return (
    <ScrollView >
      <List.Section >
        {jobsList.map(jobReviewListAccordionMaker)}
      </List.Section>
    </ScrollView>
  );

}
