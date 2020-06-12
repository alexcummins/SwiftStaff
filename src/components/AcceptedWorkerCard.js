import React, {useState} from 'react';
import {Card, List, Title, Divider, Subheading, Button, Modal} from 'react-native-paper';
import {StyleSheet, Dimensions, View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StarRating from "react-native-star-rating";
import {Rating} from 'react-native-ratings'
import {callPhone} from "../api/Utils";

export default function AcceptedWorkerCard({data}) {

    const navigation = useNavigation();

    const [ratingTotal, setRatingTotal] = useState(14)
    const [ratingCount, setRatingCount] = useState(3)
    const [userId, setUserId] = useState('2')
    const [userType, setUserType] = useState(2)
    const [firstName, setFirstName] = useState('Mike')
    const [lastName, setLastName] = useState('Adams')
    const [phone, setPhone] = useState(7654321234)
    const [hourlyRate, setHourlyRate] = useState(15)
    const [credential, setJobCredential] = useState('Waiter')

    return (
        <Card>
            <Card.Content style={style.card}>
                <View style={style.date}>
                    <Title>18-05-2020</Title>
                    <Subheading>18:00-20:00</Subheading>
                </View>
                <View>
                    <Title>{firstName}{' '}{lastName}</Title>
                    <View style={style.jobInfo}>
                        <View>
                            <Text style={style.jobTitle}>{credential}</Text>
                            <Text style={style.salary}>£{hourlyRate} per hour</Text>
                        </View>
                        <Text style={style.phoneNumber}>{'0'}{phone}</Text>
                    </View>
                    <View style={style.buttonsContainer}>
                        <Rating type='custom'
                                imageSize={width*0.08}
                                readonly={true}
                                startingValue={ratingTotal / ratingCount}
                                ratingColor='#f1c40f'/>

                        <TouchableOpacity style={style.profile}
                                          onPress={() =>
                                              navigation.navigate("JobProfile", {userId:userId, userType:userType})}>
                            <Text>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.phone}
                                          hitSlop={{top: 20, bottom: 20, left: 1, right: 1}}
                                          onPress={() => callPhone(phone)}>
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