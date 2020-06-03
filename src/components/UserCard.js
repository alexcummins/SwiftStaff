import React, {useState} from 'react';
import {View, Text, Platform, ToastAndroid, Alert, StyleSheet, Dimensions} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import MapView from 'react-native-maps';
import MapMarker from 'react-native-maps/lib/components/MapMarker';
import UserCardInfo from "./UserCardInfo";

export default function UserCard({data}) {

    const [name, setName] = useState(data.name);
    const [date, setDate] = useState(data.date);
    const [startTime, setStartTime] = useState(data.startTime);
    const [endTime, setEndTime] = useState(data.endTime);
    const [rate, setRate] = useState(data.hourlyRate);
    const [extraInfo, setExtraInfo] = useState(data.extraInfo);
    const [restaurantLong, setRestaurantLong ] = useState(-0.172002);
    const [restaurantLat, setRestaurantLat ] = useState(51.499014);

    function updateCard(data) {
        setName(data.name);
        setDate(data.date);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        setRate(data.hourlyRate);
        setExtraInfo(data.extraInfo);
    }

    function clearValues() {
        setName('');
        setDate('');
        setStartTime('');
        setEndTime('');
        setRate('');
        setExtraInfo('');
    }

    return (
        <View>
            <Card style={{marginVertical: 10, marginHorizontal: 10}} elevation={10}>
                <Card.Title title={data.name} subtitle={data.date}/>
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
                        <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
                            <Button style={{flex: 1, alignContent: 'center', marginRight: 5}} labelStyle={{color: 'white'}}
                                    mode="contained"
                                    color='red' uppercase={true} onPress={() => clearValues()}>
                                Decline
                            </Button>
                            <Button style={{flex: 1, alignContent: 'center', marginLeft: 5}} labelStyle={{color: 'white'}}
                                    mode="contained" color='green' uppercase={true} onPress={() => clearValues()}>
                                Accept
                            </Button>
                        </View>
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
