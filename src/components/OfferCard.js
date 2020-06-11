import React, {useState} from 'react';
import {View, Text, Platform, ToastAndroid, Alert, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Card, Title, Paragraph, Button, IconButton, List, Divider} from 'react-native-paper';
import MapView from 'react-native-maps';
import MapMarker from 'react-native-maps/lib/components/MapMarker';
import {CommonActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from "axios";

export default function OfferCard({data}) {
  const navigation = useNavigation();

  const [name, setName] = useState('Eastside Cafe');
  const [date, setDate] = useState('22/05/2020');
  const [startTime, setStartTime] = useState('18:00');
  const [endTime, setEndTime] = useState('20:00');
  const [rate, setRate] = useState('15.00');
  const [extraInfo, setExtraInfo] = useState("Waiter");
  const [restaurantLong, setRestaurantLong] = useState(-0.172002);
  const [restaurantLat, setRestaurantLat] = useState(51.499014);
  const [restaurantId, setRestaurantId] = useState("-1");

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

  function clearValues() {
    setName('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setRate('');
    setExtraInfo('');
  }

  useFocusEffect(
    React.useCallback(() => {
    }), []);

  return (
    <ScrollView>
      <List.Section style={{marginTop: 30}}>
        <Card style={{marginVertical: 10, marginHorizontal: 10}} elevation={10}>
          <Card.Title
            title={name}
            subtitle={date}
            right={(props) =>
              <IconButton {...props}
                          icon="chevron-right"
                          color="black"
                          onPress={() => {
                            console.log(restaurantId)
                            navigation.navigate("RestaurantProfile", {restaurantId: restaurantId})
                          }}
              />
            }
          />
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
                  <List.Section>
                    <List.Item
                      title="Salary"
                      description={'£' + rate + 'ph'}
                      left={() => <List.Icon color="#157EFB" icon="checkbox-blank-circle"/>}
                    />
                    <List.Item
                      title="Shift Time"
                      description={startTime + '-' + endTime}
                      left={() => <List.Icon color="#157EFB" icon="checkbox-blank-circle"/>}
                    />
                    <List.Item
                      title="Extra Info"
                      description={extraInfo}
                      left={() => <List.Icon color="#157EFB" icon="checkbox-blank-circle"/>}
                    />
                  </List.Section>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
                <Button style={{flex: 1, alignContent: 'center', marginRight: 5}} labelStyle={{color: 'white'}}
                        mode="contained"
                        color='red' uppercase={true} onPress={() => {
                  clearValues()
                  //TODO: API Call and Populate Offer Screen By Removing Card
                }}>
                  Decline
                </Button>
                <Button style={{flex: 1, alignContent: 'center', marginLeft: 5}} labelStyle={{color: 'white'}}
                        mode="contained" color='green' uppercase={true} onPress={() => {
                  clearValues()
                  //TODO: Add to Upcoming Screen
                  //TODO: API Call and Populate Offer Screen By Removing Card

                }}>
                  Accept
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      </List.Section>
    </ScrollView>
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