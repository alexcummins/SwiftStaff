import AsyncStorage from "@react-native-community/async-storage";
import {sendWorkerAcceptDecline} from "../api/APIUtils";
import React, {useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Card, Divider, IconButton, Subheading, Surface, Title} from "react-native-paper";
import MapView from "react-native-maps";
import MapMarker from "react-native-maps/lib/components/MapMarker";
import UserCardInfo from "./UserCardInfo";
import {Rating} from "react-native-ratings";
import {scale} from "react-native-size-matters";
import {callPhone} from "../api/Utils";

export default function WorkerReviewCard({worker, jobsId, updateCallBack, showBottomBar, showPhoneNumber}) {

    const navigation = useNavigation();

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
        <Surface elevation={5} style={{marginLeft: 15, marginRight: 15, marginTop: 7.5, marginBottom: 7.5}}>
            <Card.Content style={{marginVertical: 15}}>
                <View>
                    <View style={{flexDirection: "row", alignContent: 'center', justifyContent:"center"}}>
                        <Title style={{flex: 1, marginLeft: 5, flexWrap: "wrap"}}>{`${fname} ${lname}`}</Title>
                        <Button style={{flex: 0.6, alignContent: 'center'}} labelStyle={{color: 'white'}}
                                mode="contained" uppercase={true} onPress={() =>
                            navigation.navigate("JobProfile", {workerId: workerId})}>
                            Profile
                        </Button>
                    </View>
                    <View style={{flexDirection:"row", alignSelf: "flex-start", marginTop: 5}}>
                        <Rating type='custom'
                                imageSize={width * 0.08}
                                readonly={true}
                                startingValue={worker.ratingCount === 0 ? 0 : worker.ratingTotal / worker.ratingCount}
                                ratingColor='#f1c40f'/>
                    </View>
                    {showPhoneNumber &&
                        //darkorchid
                    <Button mode={"contained"} icon={"phone-in-talk"} style={{marginTop: 15}} color="darkorchid"
                            onPress={() => callPhone(worker.phone)}>
                        {worker.phone}
                    </Button>}
                </View>
                {showBottomBar && <BottomComponent/>}
            </Card.Content>
        </Surface>
    )
}

const width = Dimensions.get('window').width;

