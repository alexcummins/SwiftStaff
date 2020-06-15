import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
import {ScrollView, TouchableOpacity} from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import ProfileCardBasicInfo from "../../components/ProfileCardBasicInfo";
import ProfileCardList from "../../components/ProfileCardList";
import ProfileCardText from "../../components/ProfileCardText";
import navigate from "../../RootNavigation";
import {API_IMAGE_DOWNLOAD_URI, getWorkerProfile} from "../../api/APIUtils"
import Modal from "react-native-modal";
import RateWorkerPopUp from "../../components/RateWorkerPopUp";
import {Button, IconButton} from "react-native-paper";
import {imagePicker} from "../../api/Utils";
import {add} from "react-native-reanimated";

export default function WorkerProfile({route}) {

    const [visibility, setVisibility] = useState(false)

    const navigation = useNavigation()

    const [userId, setUserId] = useState(route.params.workerId)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profileImage, setProfileImage] = useState('');
    const [address, setAddress] = useState('15 Alexander Road, London, SW59 0JC');
    const [phoneNumber, setPhoneNumber] = useState(7654321234);
    const [ratingTotal, setRatingTotal] = useState(5)
    const [ratingCount, setRatingCount] = useState(1)
    const [workerAccess, setWorkerAccess] = useState(false)
    const [skillsAndQualities, setSkillsAndQualities] = useState([])
    const [qualifications, setQualifications] = useState([])
    const [experience, setExperience] = useState([])
    const [personalStatement, setPersonalStatement] = useState('')

    useFocusEffect(
        React.useCallback(() => {

           const hideWhenWorkerAccess = async () => {
               await AsyncStorage.getItem('userType', (error, result) => {
                   console.log(result)
                   setWorkerAccess(result === '2')
               })
            }

            const fetchWorkerProfile = async () => {
                try {
                    console.log(route.params)
                    const worker = await getWorkerProfile(route.params);

                    console.log(worker)
                    setFirstName(worker.fname)
                    setLastName(worker.lname)
                    setAddress(worker.address)
                    console.log(worker.profileImageId)
                    setProfileImage(`${API_IMAGE_DOWNLOAD_URI}/profile/${worker.profileImageId}`)
                    setPhoneNumber(worker.phone)
                    console.log(skillsAndQualities)
                    console.log(worker.skillsAndQualities)
                    setSkillsAndQualities(worker.skillsAndQualities)
                    setQualifications(worker.qualifications)
                    setExperience(worker.experience)
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
        await imagePicker("2", userId, "Profile", setProfileImage, true)
    }

    return (
        <View style={{flex:1}}>
            <ScrollView style={styles.container}>
                <View style={styles.header}></View>
                {workerAccess ?
                    <IconButton style={styles.settings}
                                icon="account-edit"
                                size={height * 0.05}
                                onPress={() => {navigation.navigate("JobProfileEdit", {
                                    workerId: userId,
                                    firstName: firstName,
                                    lastName: lastName,
                                    profileImage: profileImage,
                                    address: address,
                                    phoneNumber: `0${phoneNumber}`,
                                    skillsAndQualities: skillsAndQualities,
                                    qualifications: qualifications,
                                    experience: experience,
                                    personalStatement: personalStatement
                                })}}/>
                : null}
                {workerAccess ?
                    <TouchableOpacity style={styles.avatarButton}
                                      onPress={() => changeProfileImage()}>
                        <Image style={styles.avatar} source={{uri: profileImage}}/>
                    </TouchableOpacity>
                :   <Image style={styles.untouchableAvatar} source={{uri: profileImage}}/>}

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
                {!workerAccess ? <View style={styles.placeholder}></View> : <View style={styles.space}></View>}
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
            {!workerAccess ?
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
    settings:{
        top: 0,
        right: 0,
        position: 'absolute',
    },
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
    untouchableAvatar:{
        flex: 1,
        height: height*0.2,
        width: undefined,
        alignSelf: 'center',
        top: height*0.1,
        position: 'absolute',
        aspectRatio: 1,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
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
    space:{
        height:height *0.05
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
