import React, {useState} from 'react';
import {Card, List, Title, Divider, Subheading, Button, Modal, IconButton, Chip} from 'react-native-paper';
import {StyleSheet, Dimensions, View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StarRating from "react-native-star-rating";
import {Rating} from 'react-native-ratings'
import {callPhone} from "../api/Utils";
import ExtraInfo from "./ExtraInfo";
import WorkerReviewCard from "./WorkerReviewCard";

export default function AcceptedWorkerCard({data, worker}) {

    const navigation = useNavigation();

    const [ratingTotal, setRatingTotal] = useState(data.ratingTotal)
    const [ratingCount, setRatingCount] = useState(data.ratingCount)
    const [workerId, setWorkerId] = useState(data.workerId)
    const [userType, setUserType] = useState('1')
    const [hourlyRate, setHourlyRate] = useState(data.hourlyRate)
    const [startTime, setStartTime] = useState(data.startTime)
    const [endTime, setEndTime] = useState(data.startTime)
    const [date, setDate] = useState(data.date)
    const [fname, setFname] = useState(data.fname)
    const [lname, setLname] = useState(data.lname)
    const [workerPhone, setWorkerPhone] = useState(data.workerPhone)
    const [jobId, setJobId] = useState(data.jobId)

    return (
        <Card style={{marginVertical: 10, marginHorizontal: 10}} elevation={10}>
            <Card.Title title={`Confirmed booking ${data.date}`}/>
            <Card.Content>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Title>{`£${data.hourlyRate} per hour.`}</Title>
                    <Title>{`${data.startTime} - ${data.endTime}`}</Title>
                </View>
                <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 15}}>
                    {data.credentials.map((c) => <Chip key={c} style={{margin: 5}}>{c}</Chip>)}
                </View>
                <ExtraInfo extraInfo={data.extraInfo} defaultLines={1}/>
            </Card.Content>
            <WorkerReviewCard worker={worker} jobsId={data.jobId} showBottomBar={false} showPhoneNumber={true}/>
        </Card>

    );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const style = StyleSheet.create( {
    card:{
        // flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    date: {
        // flex: 1,
        fontSize:28,
        color: "#696969",
        fontWeight: "600",
        height: height*0.06,
    },
    workerInfo:{
        padding:10,
        flex: 1,
        // width: '100%',
        height: height*0.24,
    },
    profileTitle:{
        flexDirection:'row'
    },
    jobInfo:{
        flexDirection:'column',
        height: height*0.05,
        width: width,
        padding: '1%'
    },
    jobTitle:{
        // flex: 1,
        // width: 100,
        height: '50%',
    },
    salary:{
        // flex: 1,
        // width: 100,
        height: '50%',
    },
    phoneNumber:{
        // flex: 1,
        // width: 100,
        height: '50%',
        alignSelf: 'flex-end',
        top: '50%',
        right: '10%',
        position: 'absolute',
    },
    buttonsContainer:{
        flexDirection: 'row',
        width: width,
        // justifyContent: 'space-around',
        marginTop:'2%',
    },
    rating:{
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: width*0.2,
        // marginRight: width*0.15
    },
    profile:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:width*0.1,
        backgroundColor: "#00BFFF",
        width: width*0.2,
        marginLeft: width*0.05
    },
    phone:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // width: width*0.2,
        // marginLeft: width*0.05
    },
    phoneImage:{
        height: height*0.05,
        resizeMode : 'contain'
    }
})