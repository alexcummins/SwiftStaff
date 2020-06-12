import React, {useState} from "react";
import {View, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import {List} from "react-native-paper";
import UserCard from "../../components/UserCard";
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import {API_JOB_URL, convertDataToJobCardData, WEBSOCKET_PROTOCOL} from "../../api/APIUtils";

let retrieveNotifications = () => {}
export default function BookingPendingScreen() {
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
                            const newList = convertDataToJobCardData(JSON.parse(e.data));
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

    function jobReviewCardMaker(job, worker) {
        if(props.accepted){
            if(job.workerId === workerId){
                return (<WorkerReviewCard job={job} worker={worker} key={job.id} accepted={true} updateCallBack={updateJobsList}/>)
            } else {
                return null
            }
        } else {
            return (<WorkerReviewCard job={job} worker={worker} key={job.id}  accepted={false} updateCallBack={updateJobsList}/>)
        }
    }

    return (
        <ScrollView style={{marginTop: 30}}>
            <List.Section style={{marginTop:30}}>
                {jobsList.map(jobReviewCardMaker)}
            </List.Section>
        </ScrollView>
    );

}