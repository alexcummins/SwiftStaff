import React, {useState} from 'react';
import {View, Text, Platform, ToastAndroid, Alert, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph, Button, IconButton} from 'react-native-paper';
import MapView from 'react-native-maps';
import MapMarker from 'react-native-maps/lib/components/MapMarker';
import UserCardInfo from "./UserCardInfo";
import {CommonActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {sendWorkerAcceptDecline} from '../api/APIUtils';


export default function UserCard({data, updateCallBack, workerId, accepted}) {

    const [name, setName] = useState(data.name);
    const [date, setDate] = useState(data.date);
    const [startTime, setStartTime] = useState(data.startTime);
    const [endTime, setEndTime] = useState(data.endTime);
    const [rate, setRate] = useState(data.hourlyRate);
    const [extraInfo, setExtraInfo] = useState(data.extraInfo);
    const [restaurantLong, setRestaurantLong ] = useState(data.longitude);
    const [restaurantLat, setRestaurantLat ] = useState(data.latitude);
    const [restaurantId, setRestaurantId] = useState(data.restaurantId);
    const [jobId, setJobId] = useState(data.id)
    const navigation = useNavigation();

    // const [name, setName] = useState('Eastside Cafe');
    // const [date, setDate] = useState('22/05/2020');
    // const [startTime, setStartTime] = useState('18:00');
    // const [endTime, setEndTime] = useState('20:00');
    // const [rate, setRate] = useState('15.00');
    // const [extraInfo, setExtraInfo] = useState("Waiter");
    // const [restaurantLong, setRestaurantLong] = useState(-0.172002);
    // const [restaurantLat, setRestaurantLat] = useState(51.499014);
    // const [restaurantId, setRestaurantId] = useState("69");

    function updateCard(data) {
        setName(data.name);
        setDate(data.date);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        setRate(data.hourlyRate);
        setExtraInfo(data.extraInfo);
        setRestaurantLong(data.longitude);
        setRestaurantLat(data.latitude);
        setRestaurantId(data.restaurantId)
    }



    async function declineJob(){
        let workerId = await AsyncStorage.getItem("workerId");
        let declineObj = {
            jobId: jobId,
            workerId: workerId,
            commandId: 3
        }
        console.log(`Declining ${workerId}`)
        let newList = await sendWorkerAcceptDecline(declineObj)
        updateCallBack(newList)

    }



    async function acceptJob(){
        let workerId = await AsyncStorage.getItem("workerId");
        let acceptObj = {
            jobId: jobId,
            workerId: workerId,
            commandId: 1
        }
        console.log(`Accepting ${workerId}`)
        let newList = await sendWorkerAcceptDecline(acceptObj)
        updateCallBack(newList)
    }


    useFocusEffect(
      React.useCallback(() => {
      }), []);

    function BottomComponent() {
            if(accepted){
                return null
            } else if(data.reviewList.includes(workerId)){
                return (
                <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
                    <Button style={{flex: 1, alignContent: 'center', marginRight: 5}} labelStyle={{color: 'white'}}
                            mode="contained"
                            color='red' uppercase={true} onPress={() => declineJob()}>
                        Decline
                    </Button>
                    <Button style={{flex: 1, alignContent: 'center', marginLeft: 5}} labelStyle={{color: 'white'}}
                            mode="contained" color='green' uppercase={true} onPress={() => {}}>
                        Pending
                    </Button>
                </View>
                )
            } else {
                return (
                  <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
                      <Button style={{flex: 1, alignContent: 'center', marginRight: 5}} labelStyle={{color: 'white'}}
                              mode="contained"
                              color='red' uppercase={true} onPress={() => declineJob()}>
                          Decline
                      </Button>
                      <Button style={{flex: 1, alignContent: 'center', marginLeft: 5}} labelStyle={{color: 'white'}}
                              mode="contained" color='green' uppercase={true} onPress={() => acceptJob()}>
                          Accept
                      </Button>
                  </View>
                )
            }

    }
    return (
        <View>
            <Card style={{marginVertical: 10, marginHorizontal: 10}} elevation={10}>
                <TouchableOpacity onPress={() => navigation.navigate("RestaurantProfile", {restaurantId: restaurantId,latitude: restaurantLat,
                    longitude: restaurantLong, restaurantName: name }) }>
                <Card.Title
                  title={data.name}
                  subtitle={data.date}
                  right={(props) =>
                    <IconButton {...props}
                      icon="chevron-right"
                      color="black"
                      onPress={() => navigation.navigate("RestaurantProfile", {restaurantId: restaurantId,latitude: restaurantLat,
                          longitude: restaurantLong, restaurantName: name }) }
                    />
                  }
                />
                </TouchableOpacity>
                <Card.Content>
                    <View style={{flexDirection: 'column'}}>
                        <View style={styles.container}>
                            <MapView style={styles.mapStyle} showsUserLocation={true}
                                     initialRegion={{
                                         latitude: restaurantLat,
                                         longitude: restaurantLong,
                                         latitudeDelta: 0.1,
                                         longitudeDelta: 0.1,
                                     }}>
                                <MapMarker coordinate={{latitude: restaurantLat, longitude: restaurantLong}}/>
                            </MapView>
                            <View style={{flexDirection: 'column', flex: 10}}>
                                <UserCardInfo data={data}/>
                            </View>
                        </View>
                        <BottomComponent/>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
}

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
