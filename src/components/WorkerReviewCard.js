import AsyncStorage from "@react-native-community/async-storage";
import {sendWorkerAcceptDecline} from "../api/APIUtils";
import React, {useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Card, Divider, IconButton, Subheading, Title} from "react-native-paper";
import MapView from "react-native-maps";
import MapMarker from "react-native-maps/lib/components/MapMarker";
import UserCardInfo from "./UserCardInfo";
import {Rating} from "react-native-ratings";

export default function WorkerReviewCard({worker, jobsId, updateCallBack}) {

    const [fname, setFname] = useState(worker.fname);
    const [lname, setLname] = useState(worker.lname);
    const [rating, setRating] = useState(worker.ratingTotal);
    const [workerId, setWorkerId] = useState(worker.id);
    const [jobId, setJobId] = useState(jobsId);

    function updateCard() {
        setFname(worker.fname);
        setLname(worker.lname);
        setRating(worker.ratingTotal);
        setWorkerId(worker.id);
        setJobId(jobsId);
    }

    async function acceptWorker() {
        let acceptObj = {
            jobId: jobId,
            workerId: workerId,
            commandId: 2
        }
        console.log(`Accepting ${workerId} ${jobId}`)
        let newList = await sendWorkerAcceptDecline(acceptObj)
        updateCallBack(newList)
    }

    async function declineWorker() {
        let acceptObj = {
            jobId: jobId,
            workerId: workerId,
            commandId: 4
        }
        console.log(`Declining ${workerId} ${jobId}`)
        let newList = await sendWorkerAcceptDecline(acceptObj)
        updateCallBack(newList)
    }

    useFocusEffect(
        React.useCallback(() => {
        }), []);


    function BottomComponent() {
            return (
                <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
                    <Button style={{flex: 1, alignContent: 'center', marginRight: 5}} labelStyle={{color: 'white'}}
                            mode="contained"
                            color='red' uppercase={true} onPress={() => acceptWorker()}>
                        Decline
                    </Button>
                    <Button style={{flex: 1, alignContent: 'center', marginLeft: 5}} labelStyle={{color: 'white'}}
                            mode="contained" color='green' uppercase={true} onPress={() => declineWorker()}>
                        Accept
                    </Button>
                </View>
            )
        }

    return (
        <Card>
            <Card.Content style={style.card}>
                <View>
                    <Title>{`${fname} ${lname}`}</Title>
                    <View style={style.buttonsContainer}>
                        <Rating type='custom'
                                imageSize={width * 0.08}
                                readonly={true}
                                startingValue={worker.ratingTotal}
                                ratingColor='#f1c40f'/>

                        <TouchableOpacity style={style.profile}
                                          onPress={() =>
                                              navigation.navigate("JobProfile", {userId: userId, userType: userType})}>
                            <Text>Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.profile}
                                          onPress={() => acceptWorker()}>
                            <Text>Accept</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <Divider/>
            </Card.Content>
        </Card>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const style = StyleSheet.create({
    card: {
        // flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    date: {
        // flex: 1,
        fontSize: 28,
        color: "#696969",
        fontWeight: "600",
        height: height * 0.06,
    },
    workerInfo: {
        padding: 10,
        flex: 1,
        // width: '100%',
        height: height * 0.24,
    },
    profileTitle: {
        flexDirection: 'row'
    },
    jobInfo: {
        flexDirection: 'column',
        height: height * 0.05,
        width: width,
        padding: '1%'
    },
    jobTitle: {
        // flex: 1,
        // width: 100,
        height: '50%',
    },
    salary: {
        // flex: 1,
        // width: 100,
        height: '50%',
    },
    phoneNumber: {
        // flex: 1,
        // width: 100,
        height: '50%',
        alignSelf: 'flex-end',
        top: '50%',
        right: '10%',
        position: 'absolute',
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: width,
        // justifyContent: 'space-around',
        marginTop: '2%',
    },
    rating: {
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: width*0.2,
        // marginRight: width*0.15
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.1,
        backgroundColor: "#00BFFF",
        width: width * 0.2,
        marginLeft: width * 0.05
    },
    phone: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // width: width*0.2,
        // marginLeft: width*0.05
    },
    phoneImage: {
        height: height * 0.05,
        resizeMode: 'contain'
    }
})

const styles = StyleSheet.create({
    container: {
        minHeight: 200,
        flex: 2,
        flexDirection: 'row',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
    },
    para: {
        flex: 1,
    },
    mapStyle: {
        flexGrow: 10,
        flex: 10,
        marginRight: 20,

    },
});
