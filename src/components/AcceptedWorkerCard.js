import React from 'react';
import {Card, List, Title, Divider, Subheading, Button} from 'react-native-paper';
import {StyleSheet, Dimensions, View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function AcceptedWorkerCard({data}) {

    const navigation = useNavigation();


    return (
        <Card>
            <Card.Content style={style.card}>
                <View style={style.date}>
                    <Title>18-05-2020</Title>
                    <Subheading>18:00-20:00</Subheading>
                </View>
                <View>
                    <Title>Mike Adams</Title>
                    <View style={style.jobInfo}>
                        <View>
                            <Text style={style.jobTitle}>Waiter</Text>
                            <Text style={style.salary}>£15 per hour</Text>
                        </View>
                        <Text style={style.phoneNumber}>07654321234</Text>
                    </View>
                    <View style={style.buttonsContainer}>
                        <TouchableOpacity style={style.profile} onPress={() => navigation.navigate("JobProfile")}>
                            <Text>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.phone}>
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
    job:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:width*0.1,
        backgroundColor: "#00BFFF",
        width: width*0.2,
        marginRight: width*0.15
    },
    profile:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:width*0.1,
        backgroundColor: "#00BFFF",
        width: width*0.2,
        marginRight: width*0.15
    },
    phone:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width*0.2
    },
    phoneImage:{
        height: height*0.05,
        resizeMode : 'contain'
    }
})