import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
import {ScrollView} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import ProfileCardBasicInfo from "../../components/ProfileCardBasicInfo";
import ProfileCardList from "../../components/ProfileCardList";
import ProfileCardText from "../../components/ProfileCardText";
import navigate from "../../RootNavigation";

export default function Profile() {

    const [firstName, setFirstName] = useState('Mike')
    const [lastName, setLastName] = useState('Adams')
    const [profileImage, setprofileImage] = useState(require('../../../resources/img/selfie.jpg'));
    const [address, setAddress] = useState('15 Alexander Road, London, SW59 0JC');
    const [phoneNumber, setphoneNumber] = useState('07654321234');
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

    const [personalStatement, setPersonalStatement] = useState('My name is Mike, ' +
        'I am very hardworking and ameable. Ever since I was 15, I have been' +
        'in customer service through volunteering in Marie Curie. I like working with customers ' +
        'directly and I enjoy the fast-paced customer service orientated nature of Cafe work')

    useEffect(() => updateProfile)
    async function updateProfile() {
        AsyncStorage.getItem('fName', (notFound, found) => {
            if (!notFound) {
                setFirstName(found)
            }
            else {
                // console.log('First name of user not found on Login')
            }
        })
        AsyncStorage.getItem('lName', (notFound, found) => {
            if (!notFound) {
                setLastName(found)
            }
            else {
                // console.log('Last name of user not found on Login')
            }
        })
        AsyncStorage.getItem('phone', (notFound, found) => {
            if (!notFound) {
                setphoneNumber(found)
            }
            else {
                // console.log('Phone name of user not found on Login')
            }
        })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={profileImage}/>
            <View style={styles.body}>
                <Text style={styles.name}>{firstName}{' '}{lastName}</Text>
                <ProfileCardBasicInfo data={{ listItemsAndIcons:
                        [
                            {name: address, icon: 'map-marker'},
                            {name: phoneNumber, icon: 'phone-outline'},
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
        </ScrollView>
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
    avatar:{
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
});
