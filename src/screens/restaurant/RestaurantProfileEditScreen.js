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
} from 'react-native';
import {
    Button,
    IconButton,
    Divider,
    List,
    TextInput
} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import MapView from 'react-native-maps';
import MapMarker from 'react-native-maps/lib/components/MapMarker';
import {API_IMAGE_DOWNLOAD_URI, getRestaurantProfile, updateRestaurantProfile} from "../../api/APIUtils";
import {callPhone} from "../../api/Utils";

export default function RestaurantProfile({route}) {

    const [restaurantId, setRestaurantId] = useState(route.params.restaurantId)

    const [name, setName] = useState(route.params.name);
    const [address, setAddress] = useState(route.params.address);
    const [phone, setPhone] = useState(route.params.phone);
    const [email, setEmail] = useState(route.params.email)
    const [facebookLink, setFacebookLink] = useState(route.params.facebookLink);
    const [twitterLink, setTwitterLink] = useState(route.params.twitterLink);
    const [instagramLink, setInstagramLink] = useState(route.params.instagramLink);
    const [profileImage, setProfileImage] = useState(route.params.profileImage);

    const navigation = useNavigation();

    async function apply() {
        console.log("Trying to update")
        await updateRestaurantProfile({
            restaurantId: restaurantId,
            email: email,
            name: name,
            address: address,
            phone: phone,
            facebookLink: facebookLink,
            twitterLink: twitterLink,
            instagramLink: instagramLink
        })

        // API call for images
    }

    return (
        <ScrollView>
            <ImageBackground
                // TODO: Make image source requirement dynamic
                source={require('../../../resources/img/restaurantfront.jpg')}
                style={styles.imageContainer}
            >
                <IconButton
                    icon='chevron-left-circle'
                    size={height * 0.05}
                    color='rgb(237, 237, 237)'
                    style={styles.buttonAlign}
                    onPress = {() => navigation.goBack()}
                />
            </ImageBackground>

            <View style={styles.userNameRow}>
                <Text style={styles.userNameText}>{name}</Text>
                <View style={styles.userContactInfoContainer}>

                </View>
                <View style={styles.userContactInfoRow}>
                    <Button icon='cellphone'>
                        {phone}
                    </Button>
                </View>
                <View style={styles.userContactInfoRow}>
                    <Button icon='email'> {email}
                    </Button>
                </View>
            </View>

            <List.Section>
                <List.Subheader>Cafe Info</List.Subheader>
                <TextInput
                    multiline={false}
                    onChangeText={(text) => setName(text)}
                    placeholder="Change your cafe's name"
                />
                <TextInput
                    multiline={false}
                    onChangeText={(text) => setPhone(text)}
                    placeholder="Change your branch's contact details"
                    keyboardType = 'phone-pad'
                />
                <TextInput
                    multiline={true}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Change your branch's email address"
                    keyboardType = 'email-address'
                />
            </List.Section>



            {/*<View style={styles.userBioRow}>*/}
            {/*  <Text style={styles.userBioText}>Our mission is to serve the downtown business community by providing the highest-quality coffees, sandwiches, snacks, baked goods, noodles, rice and specialty laksa and Laksam in an atmosphere that meets the needs of customers who are in a hurry as well as those who want a place to relax and enjoy their beverages and food.</Text>*/}
            {/*</View>*/}

            <View style={styles.socialRow}>
                <IconButton
                    icon='twitter'
                    size={35}
                    color='#56ACEE'
                />
                <IconButton
                    icon='facebook'
                    size={35}
                    color='#3B5A98'
                />
                <IconButton
                    icon='instagram'
                    size={35}
                    color='#bc2a8d'
                />
            </View>
            <List.Section>
                <List.Subheader>Social Media Links</List.Subheader>
                <TextInput
                    multiline={false}
                    onChangeText={(text) => setTwitterLink(text)}
                    placeholder={`Twitter link: ${twitterLink}`}
                    keyboardType = 'url'
                />
                <TextInput
                    multiline={false}
                    onChangeText={(text) => setFacebookLink(text)}
                    placeholder={`Facebook link: ${facebookLink}`}
                    keyboardType = 'url'
                />
                <TextInput
                    multiline={true}
                    onChangeText={(text) => setInstagramLink(text)}
                    placeholder={`Instagram link: ${instagramLink}`}
                    keyboardType = 'url'
                />
            </List.Section>


            <View style={[styles.userContactInfoRow, {paddingTop: 5, paddingBottom: 10}]}>
                <Button icon='map-marker' />
                <Text style={styles.userContactInfoRow}> {address} </Text>
            </View>

            <List.Section>
                <List.Subheader>Address</List.Subheader>
                <TextInput
                    multiline={false}
                    onChangeText={(text) => setAddress(text)}
                    placeholder={'Change your address'}
                />
            </List.Section>
            <Button icon="check-bold"
                    mode="contained"
                    dark={true}
                    onPress={() => apply()}
                    style={styles.saveButton}
                    labelStyle={styles.rateText}
                    color={'#38B6FF'}>
                Save
            </Button>
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
    saveButton: {
        alignSelf: 'center',
        marginBottom: height*0.07,
        marginTop: height*0.03,
        borderColor: '#38B6FF',
        height: height*0.06,
        width: width*0.4,
        justifyContent: 'center'
    },
});