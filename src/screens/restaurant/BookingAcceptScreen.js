import React, {useState} from "react";
import {View, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import {Card, List, Paragraph, Text, Title} from 'react-native-paper';
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
    const [timer, setTimer] = useState(setInterval(retrieveNotifications, 5000))

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
                        // console.log(JSON.stringify(e))
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
              clearInterval(timer);
              ws.close();
            };

        }, []))

    const updateJobsList = (newList) => {
        setJobsList(newList)
    }
  function EmptyAcceptedOffers(){
    let shouldShow = jobsList.filter(jobWorkerObj => jobWorkerObj.jobObj.isConfirmed).length === 0;
    if (shouldShow) {
      return (<View>
        <Card style={{marginHorizontal: 10}}>
          <Card.Content >
            <Title>You Have No Accepted Jobs Yet!</Title>
            <Paragraph>To Accept a worker head to the Pending tab!</Paragraph>
            <Paragraph>To submit a job request head to the Request screen!</Paragraph>
          </Card.Content>
        </Card>
      </View>);
    } else {
      return null;
    }
  }

    function jobReviewListAccordionMaker(jobWorkerObj) {
        if (!jobWorkerObj.jobObj.isConfirmed) {
            return null
        } else {
            let workerObj = jobWorkerObj.workersObj.find((el) => {
                return el.id === jobWorkerObj.jobObj.confirmedWorkerId
            })
            let dataObj = {
                fname: workerObj.fname,
                lname: workerObj.lname,
                workerPhone: workerObj.phone,
                date: jobWorkerObj.jobObj.date,
                startTime: jobWorkerObj.jobObj.startTime,
                endTime: jobWorkerObj.jobObj.endTime,
                hourlyRate: jobWorkerObj.jobObj.hourlyRate,
                workerId: workerObj.id,
                ratingCount: workerObj.ratingCount,
                ratingTotal: workerObj.ratingTotal,
                credentials: jobWorkerObj.jobObj.credentials,
                extraInfo: jobWorkerObj.jobObj.extraInfo,
                jobId: jobWorkerObj.jobObj.id
            }
            return (
                <AcceptedWorkerCard data={dataObj} worker={workerObj} key={jobWorkerObj.jobObj.id}
                                    updateCallBack={updateJobsList} showBottomBar={true} showPhoneNumber={false}/>
            )
        }
    }

    return (
        <ScrollView>
            <List.Section>
              <EmptyAcceptedOffers/>
                {jobsList.map(jobReviewListAccordionMaker)}
            </List.Section>
        </ScrollView>
    );

}
