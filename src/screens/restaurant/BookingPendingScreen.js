import React, {useState} from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import {Card, List, Title, Button, IconButton, Chip, Portal, Dialog, Paragraph, Text} from "react-native-paper";
import UserCard from "../../components/UserCard";
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import {API_JOB_URL, convertDataToReviewCardData, deleteJob, WEBSOCKET_PROTOCOL} from "../../api/APIUtils";
import WorkerReviewCard from "../../components/WorkerReviewCard";
import ListAccordion from "react-native-paper/src/components/List/ListAccordion";
import ExtraInfo from "../../components/ExtraInfo";
import {notifyMessage} from "../../api/Utils";

let retrieveNotifications = () => {
}
export default function BookingPendingScreen() {

    const [jobsList, setJobsList] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteBookingId, setDeleteBookingId] = useState("")

    useFocusEffect(
        React.useCallback(() => {
            var ws = {};
            const asyncRestaurant = AsyncStorage.getItem('restaurantId').then((asyncRestaurant) => {

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
                        ws.close()
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

    function showDeleteDialogue(id) {
        setConfirmDelete(true)
        setDeleteBookingId(id)
    }


    async function deleteBooking(deleteBookingId) {
        setConfirmDelete(false)
        const success = await deleteJob({_id: deleteBookingId})
        if (success.isSuccessful) {
            notifyMessage("Job booking successfully deleted")
        }
        else {
            notifyMessage("Error: Could not delete job booking")
        }
    }

    function workerReviewCardMaker(worker, jobsId) {
        return (
            <WorkerReviewCard worker={worker} jobsId={jobsId} key={`${jobsId}${worker.workerId}`}
                              showBottomBar={true}
                              showPhoneNumber={false}
                              updateCallBack={updateJobsList}/>
        )
    }


  function EmptyPendingOffers(){
    let shouldShow = jobsList.filter(jobWorkerObj => !jobWorkerObj.jobObj.isConfirmed).length === 0;
    if (shouldShow) {
      return (<View>
        <Card style={{marginHorizontal: 10}}>
          <Card.Content  >
            <Title>You Have No Pending Jobs Yet!</Title>
            <Paragraph>To submit a job request head to the request screen!</Paragraph>
          </Card.Content>
        </Card>
      </View>);
    } else {
      return null;
    }
  }

    function jobReviewListAccordionMaker(jobWorkerObj) {
        console.log("JobWorkerObj:")
        console.log(JSON.stringify(jobWorkerObj))
        if (jobWorkerObj.jobObj.isConfirmed) {
            return null
        } else {
            return (
                <Card style={{marginVertical: 10, marginHorizontal: 10}} key={jobWorkerObj.jobObj.id}>
                    <Card.Title title={`Booking ${jobWorkerObj.jobObj.date}`}
                                right={(props) => <IconButton icon={"delete-circle"} color={"red"} size={30}
                                                              style={{alignSelf: "flex-end"}}
                                onPress={() => showDeleteDialogue(jobWorkerObj.jobObj.id)}/>}/>
                    <Card.Content>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Title>{`£${jobWorkerObj.jobObj.hourlyRate} per hour.`}</Title>
                            <Title>{`${jobWorkerObj.jobObj.startTime} - ${jobWorkerObj.jobObj.endTime}`}</Title>
                        </View>
                        <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 15}}>
                            {jobWorkerObj.jobObj.credentials.map((c) => <Chip key={c} style={{margin: 5}}>{c}</Chip>)}
                        </View>
                        <ExtraInfo extraInfo={jobWorkerObj.jobObj.extraInfo} defaultLines={1}/>
                    </Card.Content>
                    <List.Accordion
                        title={`${jobWorkerObj.workersObj.length} workers to review!`}
                        key={jobWorkerObj.jobObj.id}
                        left={props => <List.Icon {...props} icon="account-question"/>}
                    >
                        {jobWorkerObj.workersObj.map((worker) => {
                            return workerReviewCardMaker(worker, jobWorkerObj.jobObj.id)
                        })}
                    </List.Accordion>
                </Card>
            )
        }
    }

    function deleteBookingConfirmation() {
        return <Portal>
            <Dialog
                visible={confirmDelete}
                onDismiss={() => setConfirmDelete(false)}>
                <Dialog.Title>Delete job booking</Dialog.Title>
                <Dialog.Content>
                    <Paragraph style>Are you sure you want to delete this booking?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setConfirmDelete(false)} labelStyle={{fontSize: 15}}>
                        Cancel
                    </Button>
                    <Button onPress={() => deleteBooking(deleteBookingId)} labelStyle={{fontSize: 15}}>
                        Ok
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>;
    }

    return (
        <ScrollView style={{marginTop: 0}}>
            <List.Section style={{marginTop: 15}}>
              <EmptyPendingOffers/>
                {jobsList.map(jobReviewListAccordionMaker)}
            </List.Section>
            {deleteBookingConfirmation()}
        </ScrollView>
    );
}


