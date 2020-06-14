import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
import {ScrollView, TouchableOpacity} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import ProfileCardBasicInfo from "../../components/ProfileCardBasicInfo";
import ProfileCardList from "../../components/ProfileCardList";
import ProfileCardText from "../../components/ProfileCardText";
import navigate from "../../RootNavigation";
import {API_IMAGE_DOWNLOAD_URI, getWorkerProfile} from "../../api/APIUtils"
import Modal from "react-native-modal";
import RateWorkerPopUp from "../../components/RateWorkerPopUp";
import {Button} from "react-native-paper";
import {imagePicker} from "../../api/Utils";

export default function WorkerProfile({route}) {

    const [visibility, setVisibility] = useState(false)

    const [userId, setUserId] = useState(route.params.workerId)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profileImage, setProfileImage] = useState('');
    const [address, setAddress] = useState('15 Alexander Road, London, SW59 0JC');
    const [phoneNumber, setPhoneNumber] = useState(7654321234);
    const [ratingTotal, setRatingTotal] = useState(5)
    const [ratingCount, setRatingCount] = useState(1)
    const [hide, setHide] = useState(false)
    const [skillsAndQualities, setSkillsAndQualities] = useState([
        {name: 'Collaborative'},
        {name: 'Hardworking'},
        {name: 'Til-trained'},
        {name: 'Interpersonal'},
        {name: 'Teamwork'},
    ])
    const [qualifications, setQualifications] = useState([
        {name: 'Driver\'s License'},
        {name: 'Food Hygiene Certificate'},
        {name: 'Clean-Driving Certificate'},
    ])
    const [experience, setExperience] = useState([
        {name: '2 years, Corporate Concierge, The SSE Arena'},
        {name: '1 year, Waiter, Romulo Cafe'},
    ])

    const [personalStatement, setPersonalStatement] = useState('My name is John, ' +
        'I am very hardworking and ameable. Ever since I was 15, I have been' +
        'in customer service through volunteering in Marie Curie. I like working with customers ' +
        'directly and I enjoy the fast-paced customer service orientated nature of Cafe work')

    useFocusEffect(
        React.useCallback(() => {

           const hideWhenWorkerAccess = async () => {
               await AsyncStorage.getItem('userType', (error, result) => {
                   console.log(result)
                   setHide(result === '2')
               })
            }

            const fetchWorkerProfile = async () => {
                try {
                    console.log(route.params)
                    const worker = await getWorkerProfile(route.params);

                    console.log(worker)
                    setFirstName(worker.fname)
                    setLastName(worker.lname)
                    // Address
                    console.log(worker.profileImageId)
                    setProfileImage(`${API_IMAGE_DOWNLOAD_URI}/profile/${worker.profileImageId}`)
                    setPhoneNumber(worker.phone)
                    // Skills&Qualities
                    // Experience
                    // Qualifications
                    setRatingTotal(worker.ratingTotal)
                    setRatingCount(worker.ratingCount)
                    setPersonalStatement(worker.personalStatement)

                } catch (e) {
                    console.log("Retrieving worker profile failed")
                    console.log(e.getMessage())
                }
            }
            let hidPromise = hideWhenWorkerAccess()
            let promise = fetchWorkerProfile()
            },
            [route.params.userId, route.params.userType])
    )

    const toggleShowRateCard = () => {
        setVisibility(!visibility)
    }

    async function changeProfileImage() {
        await imagePicker("2", userId, "Profile", setProfileImage)
    }

    return (
        <View style={{flex:1}}>
            <ScrollView style={styles.container}>
                <View style={styles.header}></View>
                {/*<Image style={styles.avatar} source={profileImage}/>*/}
                <TouchableOpacity style={styles.avatarButton}
                                  onPress={() => changeProfileImage()}>
                    <Image style={styles.avatar} source={{uri: profileImage}}/>
                </TouchableOpacity>
                <View style={styles.body}>
                    <Text style={styles.name}>{firstName}{' '}{lastName}</Text>
                    <ProfileCardBasicInfo data={{ listItemsAndIcons:
                            [
                                {name: address, icon: 'map-marker'},
                                {name: `0${phoneNumber}`, icon: 'phone-outline'},
                            ]
                    }}/>
                    <ProfileCardList data={{ title:'Skills and Qualities', listItems: skillsAndQualities
                    }}/>
                    <ProfileCardList data={{ title:'Qualifications', listItems: qualifications
                    }}/>
                    <ProfileCardList data={{ title:'Experience', listItems: experience
                    }}/>
                    <ProfileCardText data = {{
                        title: 'Personal Statement',
                        body: personalStatement
                    }} />
                </View>
                {!hide ? <View style={styles.placeholder}></View> : null}
                <Modal isVisible={visibility}
                       onBackdropPress={() => toggleShowRateCard()}>
                    <RateWorkerPopUp
                        userId={userId}
                        fname={firstName}
                        lname={lastName}
                        oldRatingTotal={ratingTotal}
                        oldRatingCount={ratingCount}
                        closePopUp={toggleShowRateCard}/>
                </Modal>
            </ScrollView>
            {!hide ?
            <Button icon="gesture-double-tap"
                    mode="contained"
                    dark={true}
                    onPress={() => toggleShowRateCard()}
                    style={styles.rateButton}
                    labelStyle={styles.rateText}
                    color={'#f1c40f'}>
                Rate</Button> : null}
        </View>
    );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.7)"
    },
    header:{
        flex: 1,
        height: height*0.2,
        backgroundColor: "#00BFFF"
    },
    avatarButton:{
        flex: 1,
        height: height*0.2,
        width: undefined,
        alignSelf: 'center',
        top: height*0.1,
        position: 'absolute',

    },
    avatar:{
        flex: 1,
        height: height*0.2,
        width: undefined,
        alignSelf: 'center',

        aspectRatio: 1,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        backgroundColor: "rgba(255,255,255,0.7)"
    },
    body: {
        flex: 1,
        alignItems: 'stretch',
        paddingTop: height*0.11,
        paddingLeft: width*0.05,
        paddingRight: width*0.05

    },
    name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600",
        alignSelf: 'center',
    },
    placeholder: {
        height: height *0.15
    },
    rateButton: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: height*0.06,
        borderColor: '#f1c40f',
        height: height*0.06,
        width: width*0.4,
        justifyContent: 'center'
    },
    rateText: {
        fontSize: 15 + height*0.009
    }
});
