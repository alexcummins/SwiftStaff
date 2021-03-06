import React, {useState} from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  ImageBackground,
  Linking,
  TextInput
} from 'react-native';
import {
  Button,
  IconButton,
  Divider,
} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import MapView from 'react-native-maps';
import MapMarker from 'react-native-maps/lib/components/MapMarker';
import {API_IMAGE_DOWNLOAD_URI, getRestaurantProfile} from "../../api/APIUtils";
import {callPhone} from "../../api/Utils";

export default function RestaurantProfile({route}) {

  const [restaurantId, setRestaurantId] = useState(route.params.restaurantId)

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('')
  const [longitude, setLongitude] = useState(0.0);
  const [latitude, setLatitude] = useState(0.0);
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [profileImage, setProfileImage] = useState('');
  const [description, setDescription] = useState('')

  const [workerAccess, setWorkerAccess] = useState(true)
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {

      const hideWhenWorkerAccess = async () => {
        await AsyncStorage.getItem('userType', (error, result) => {
          console.log(result)
          setWorkerAccess(result === '2')
        })
      }

      const fetchRestaurantProfile = async () => {
        try {
          console.log(route.params)
          const restaurant = await getRestaurantProfile({restaurantId: route.params.restaurantId});

          console.log(restaurant.name)
          setName(restaurant.name)
          setAddress(restaurant.address)
          setPhone(restaurant.phone)
          setEmail(restaurant.email)
          setLongitude(restaurant.longitude)
          setLatitude(restaurant.latitude)
          setFacebookLink(restaurant.facebookLink)
          setTwitterLink(restaurant.twitterLink)
          setInstagramLink(restaurant.instagramLink)
          setDescription(restaurant.description)
          setProfileImage(`${API_IMAGE_DOWNLOAD_URI}/profile/${restaurant.profileImageId}`)

        } catch (e) {
          console.log("Retrieving restaurant profile failed")
          console.log(route.params.restaurantId)
        }
      }
      let hidePromise = hideWhenWorkerAccess()
      let promise = fetchRestaurantProfile()
    }, [route.params.restaurantId])
  )

  async function openURLOrFail(url : string) {
    try {
      await Linking.openURL(url)
    } catch (e) {
      console.log(e)
    }
  }


  return (
      <ScrollView>
        <ImageBackground
            // TODO: Make image source requirement dynamic
            source={{uri: profileImage}}
            style={styles.imageContainer}
        >
          <IconButton
              icon='chevron-left-circle'
              size={height * 0.05}
              style={styles.buttonAlign}
              onPress = {() => navigation.goBack()}
          />
          { !workerAccess ?
              <IconButton style={styles.settings}
                          icon="settings"
                          size={height * 0.05}
                          onPress={() => {navigation.navigate("RestaurantProfileEdit", {
                              restaurantId: restaurantId,
                              name: name,
                              address: address,
                              phone: phone,
                              email: address,
                              facebookLink: facebookLink,
                              twitterLink: twitterLink,
                              instagramLink: instagramLink,
                              profileImage: profileImage,
                              description: description
                          })}}/>
              : null}
        </ImageBackground>

        <View style={styles.userNameRow}>
          <Text style={styles.userNameText}>{name}</Text>
          <View style={styles.userContactInfoContainer}>

          </View>
          <View style={styles.userContactInfoRow}>
            <Button icon='cellphone' onPress={() => {
              callPhone(phone)
            }}>
              {`0${phone}`}
            </Button>
          </View>
          <View style={styles.userContactInfoRow}>
            <Button icon='email' onPress={() => openURLOrFail(`mailto:${email}`)}> {email}
            </Button>
          </View>
        </View>

        <Divider />


        <View style={styles.userBioRow}>
          <Text style={styles.userBioText}>{description}</Text>
        </View>

        <View style={styles.socialRow}>
          <IconButton
              icon='twitter'
              size={35}
              color='#56ACEE'
              onPress={() => openURLOrFail(twitterLink)}
          />
          <IconButton
              icon='facebook'
              size={35}
              color='#3B5A98'
              onPress={() => openURLOrFail(facebookLink)}
          />
          <IconButton
              icon='instagram'
              size={35}
              color='#bc2a8d'
              onPress={() => openURLOrFail(instagramLink)}
          />
        </View>

        <Divider />

        <View style={[styles.userContactInfoRow, {paddingTop: 5, paddingBottom: 10}]}>
          <Button icon='map-marker' />
          <Text style={styles.userContactInfoRow}> {address} </Text>
        </View>

        <View style={styles.container}>
          <MapView style={styles.mapStyle} showsUserLocation={true}
                   region={{
                     latitude: latitude,
                     longitude: longitude,
                     latitudeDelta: 0.1,
                     longitudeDelta: 0.1,
                   }}>
            <MapMarker coordinate={{latitude: latitude, longitude: longitude}}/>
          </MapView>
        </View>

      </ScrollView>
  )

}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  settings:{
    top: height * 0.04,
    right: 0,
    position: 'absolute',
  },

  imageContainer: {
    flex: 1,
    height: width * (3 / 5),
  },
  buttonAlign: {
    top: height * 0.04,
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    color: 'rgba(237, 237, 237, 0.8)',
    fontSize: 28,
    fontWeight: '600',
    paddingLeft: 15,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  userNameRow: {
    marginTop: 15,
    marginBottom: 10,
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  userNameText: {
    color: '#5B5A5A',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userBioText: {
    paddingTop: 10,
    color: 'rgba(77, 88, 96, 0.7)',
    fontSize: 13.5,
    textAlign: 'center',
  },
  userContactInfoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -5,

  },
  userContactInfoText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userContactInfoContainer: {
    flexDirection: 'column',
  },
  mapStyle: {
    width : width,
    height: width,
  },

});
