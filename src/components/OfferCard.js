import React, {useState} from 'react';
import {View, Text, Platform, ToastAndroid, Alert, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Card, Title, Paragraph, Button, IconButton, List, Divider} from 'react-native-paper';
import MapView from 'react-native-maps';
import MapMarker from 'react-native-maps/lib/components/MapMarker';
import UserCardInfo from "./UserCardInfo";
import {CommonActions, useNavigation} from '@react-navigation/native';

export default function OfferCard({data}) {
  const navigation = useNavigation();

  return (
        <Card style={{marginVertical: 10, marginHorizontal: 10}} elevation={10}>
          <Card.Title
            title='Eastside Cafe'
            subtitle='22/05/2020'
            right={(props) =>
              <IconButton {...props}
                          icon="chevron-right"
                          color="black"
                          onPress={() => navigation.navigate("RestaurantProfile")}/>}
          />
          <Card.Content>
            <View style={{flexDirection: 'column'}}>
              <View style={styles.container}>
                <MapView style={styles.mapStyle} showsUserLocation={true}
                         initialRegion={{
                           latitude: 51.499014,
                           longitude: -0.172002,
                           latitudeDelta: 0.1,
                           longitudeDelta: 0.1,
                         }}>
                  <MapMarker coordinate={{latitude: 51.499014, longitude: -0.172002}}/>
                </MapView>
                <View style={{flexDirection: 'column', flex: 10}}>
                  <List.Section>
                    <List.Item
                      title="Salary"
                      description='£15.00ph'
                      left={() => <List.Icon color="#157EFB" icon="checkbox-blank-circle" />}
                    />
                    <List.Item
                      title="Shift Time"
                      description='18:00-20:00'
                      left={() => <List.Icon color="#157EFB" icon="checkbox-blank-circle" />}
                    />
                    <List.Item
                      title="Extra Info"
                      description='Waiter'
                      left={() => <List.Icon color="#157EFB" icon="checkbox-blank-circle" />}
                    />
                  </List.Section>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
                <Button style={{flex: 1, alignContent: 'center', marginRight: 5}} labelStyle={{color: 'white'}}
                        mode="contained"
                        color='red' uppercase={true} onPress={() => {}}>
                  Decline
                </Button>
                <Button style={{flex: 1, alignContent: 'center', marginLeft: 5}} labelStyle={{color: 'white'}}
                        mode="contained" color='green' uppercase={true} onPress={() => {}}>
                  Accept
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>
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