import React, {useState} from 'react';
import {Card, List, Title, Divider, Subheading, Button, Modal} from 'react-native-paper';
import {StyleSheet, Dimensions, View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StarRating from "react-native-star-rating";
import {Rating} from 'react-native-ratings'

export default function AcceptedWorkerCard({data}) {

    const navigation = useNavigation();

    const [ratingTotal, setRatingTotal] = useState(data.ratingTotal)
    const [ratingCount, setRatingCount] = useState(data.ratingCount)
    const [workerId, setWorkerId] = useState(data.workerId)
    const [userType, setUserType] = useState(2)
    const [hourlyRate, setHourlyRate] = useState(data.hourlyRate)
    const [startTime, setStartTime] = useState(data.startTime)
    const [endTime, setEndTime] = useState(data.startTime)
    const [date, setDate] = useState(data.date)
    const [fName, setFName] = useState(data.fName)
    const [lName, setLName] = useState(data.lName)
    const [workerPhone, setWorkerPhone] = useState(data.workerPhone)
    const [jobId, setJobId] = useState(data.jobId)
    return (
        <Card style={{marginVertical: 10, marginHorizontal: 10}} elevation={10}>
            <Card.Content style={style.card}>
                <View style={style.date}>
                    <Title>{date}</Title>
                    <Subheading>{`${startTime} - ${endTime}`}</Subheading>
                </View>
                <View>
                    <Title>{`${fName} ${lName}`}</Title>
                    <View style={style.jobInfo}>
                        <View>
                            <Text style={style.jobTitle}></Text>
                            <Text style={style.salary}>{hourlyRate}</Text>
                        </View>
                        <Text style={style.phoneNumber}>{`0${workerPhone}`}</Text>
                    </View>
                    <View style={style.buttonsContainer}>
                        <Rating type='custom'
                                imageSize={width*0.08}
                                readonly={true}
                                startingValue={ratingTotal / ratingCount}
                                ratingColor='#f1c40f'/>

                        <TouchableOpacity style={style.profile}
                                          onPress={() =>
                                              navigation.navigate("JobProfile", {workerId:workerId, userType:userType})}>
                            <Text>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.phone}
                                          hitSlop={{top: 20, bottom: 20, left: 1, right: 1}}>
                            <Image style={style.phoneImage}
                                source={require('../../resources/img/phone.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Divider/>
            </Card.Content>
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
