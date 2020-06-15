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
import {API_IMAGE_DOWNLOAD_URI, getRestaurantProfile, sendUpdateRestaurantProfile} from "../../api/APIUtils";
import {callPhone} from "../../api/Utils";

export default function RestaurantProfile({route}) {

  const [restaurantId, setRestaurantId] = useState(route.params.restaurantId)
  const [modifyContent, setModifyContent] = useState(route.params.modifyContent)
  const [name, setName] = useState(route.params.restaurantName);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(2569984529);
  const [email, setEmail] = useState("")
  const [longitude, setLongitude] = useState(route.params.longitude);
  const [latitude, setLatitude] = useState(route.params.latitude);
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [profileImage, setprofileImage] = useState(`${API_IMAGE_DOWNLOAD_URI}/profile/${restaurantId}`);

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
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

        } catch (e) {
          console.log("Retrieving restaurant profile failed")
          console.log(route.params)
          console.log(route.params.restaurantId)
        }
      }
      let promise = fetchRestaurantProfile()
    }, [route.params.restaurantId])
  )

  async function updateRestaurantProfile(data, updateAddress) {
    let response = await sendUpdateRestaurantProfile(data)
    console.log(JSON.stringify(response))
    if (updateAddress) {
      setLongitude(response.longitude)
      setLatitude(response.latitude)
    }
  }

  function displayName() {
    if (!modifyContent) {
      return (<Text style={styles.userNameText}>{name}</Text>);
    } else {
      return (<TextInput
        label='Establishment Name'
        defaultValue={name}
        textContentType='organizationName'
        // onSubmitEditing={(val) => updateRestaurantProfile({restaurantId: restaurantId, name: val}, false)}
      />)
    }
  }

  function displayPhone() {
    const phoneNumber = `0${phone}`
    if (!modifyContent) {
      return (<View style={styles.userContactInfoRow}>
        <Button icon='cellphone' onPress={() => {
          callPhone(phone)
        }}>
          {phoneNumber}
        </Button>
      </View>)
    } else {
      return (<TextInput
        label='Phone'
        defaultValue={phoneNumber}
        textContentTyoe='telephoneNumber'
        onSubmitEditing={(val) => {
          //TODO:
        }}
      />)
    }
  }

  function displayEmail() {
    if (!modifyContent) {
      return (<View style={styles.userContactInfoRow}>
        <Button icon='email' onPress={() => Linking.openURL(`mailto:${email}`)}>
          {email}
        </Button>
      </View>)
    } else {
      return (<TextInput
        label='Email'
        defaultValue={email}
        textContentType='emailAddress'
        onSubmitEditing={(val) => {
          //TODO:
        }}
      />)
    }
  }

  function displaySocialMediaLinks() {
    if (!modifyContent) {
      return (<View style={styles.socialRow}>
        <IconButton
          disabled={!twitterLink.length}
          icon='twitter'
          size={35}
          color='#56ACEE'
          onPress={() => Linking.openURL(twitterLink)}
        />
        <IconButton
          disabled={!facebookLink.length}
          icon='facebook'
          size={35}
          color='#3B5A98'
          onPress={() => Linking.openURL(facebookLink)}
        />
        <IconButton
          disabled={!instagramLink.length}
          icon='instagram'
          size={35}
          color='#bc2a8d'
          onPress={() => Linking.openURL(instagramLink)}
        />
      </View>)
    } else {
      //TODO: update
    }
  }

  function displayAddress() {
    if (!modifyContent) {
      return (
        <View style={[styles.userContactInfoRow, {paddingTop: 5, paddingBottom: 10}]}>
          <Button icon='map-marker'/>
          <Text style={styles.userContactInfoText}> {address} </Text>
        </View>)
    } else {
      return (<TextInput
        label='Address'
        defaultValue={address}
        textContentType='fullStreetAddress'
        onSubmitEditing={(val) => {
          // TODO:
        }}
      />)
    }
  }

  function displayMap() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle} showsUserLocation={true}
                 initialRegion={{
                   latitude: latitude,
                   longitude: longitude,
                   latitudeDelta: 0.1,
                   longitudeDelta: 0.1,
                 }}>
          <MapMarker coordinate={{latitude: latitude, longitude: longitude}}/>
        </MapView>
      </View>)
  }


  return (
    <ScrollView>

      <ImageBackground
        source={{uri: profileImage}}
        style={styles.imageContainer}
      >
        <IconButton
          icon='chevron-left-circle'
          size={30}
          color='rgb(237, 237, 237)'
          style={styles.buttonAlign}
          onPress={() => navigation.goBack()}
        />
      </ImageBackground>

      <View style={styles.userNameRow}>
        {displayName()}
        <View style={styles.userContactInfoContainer}>

        </View>
        {displayPhone()}
        {displayEmail()}
      </View>

      <Divider/>

      {displaySocialMediaLinks()}

      <Divider/>

      {displayAddress()}
      {displayMap({latitude, longitude})}

      {/*todo: change display address*/}


    </ScrollView>
  )

}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    height: width * (3 / 5),
  },
  buttonAlign: {
    alignItems: 'flex-start',
    marginTop: 30
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
    width: 0,
    flexGrow: 1,
    flex: 1,
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userContactInfoContainer: {
    flexDirection: 'column',
  },
  mapStyle: {
    width,
    height: width * (3 / 4),
  },

});

