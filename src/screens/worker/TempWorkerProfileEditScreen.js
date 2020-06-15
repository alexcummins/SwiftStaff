import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ProfileCardBasicInfo from "../../components/ProfileCardBasicInfo";
import ProfileCardList from "../../components/ProfileCardList";
import ProfileCardText from "../../components/ProfileCardText";
import Modal from "react-native-modal";
import RateWorkerPopUp from "../../components/RateWorkerPopUp";
import {Button, List, TextInput} from "react-native-paper";
import React, {useState} from "react";
import TextInputCancelableList from "../../components/TextInputCancelableList";
import {imagePicker} from "../../api/Utils";
import {updateWorkerProfile, uploadImage} from "../../api/APIUtils";


export default function TempWorkerProfileEditScreen({route}) {

    const [workerId, setUserId] = useState(route.params.workerId)
    const [firstName, setFirstName] = useState(route.params.firstName)
    const [lastName, setLastName] = useState(route.params.lastName)
    const [profileImage, setProfileImage] = useState(route.params.profileImage);
    const [address, setAddress] = useState(route.params.address);
    const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);

    const [skillsAndQualities, setSkillsAndQualities] = useState(route.params.skillsAndQualities)
    const [qualifications, setQualifications] = useState(route.params.qualifications)
    const [experience, setExperience] = useState(route.params.experience)

    const [personalStatement, setPersonalStatement] = useState(route.params.personalStatement)

    async function pickImage() {
        await imagePicker("2", workerId, "Profile", setProfileImage, false)
    }

    async function apply() {
        console.log(personalStatement)
        await updateWorkerProfile({
            workerId: workerId,
            firstName: firstName,
            lastName: lastName,
            address: address,
            phoneNumber: phoneNumber,
            skillsAndQualities: skillsAndQualities,
            qualifications: qualifications,
            experience: experience,
            personalStatement: personalStatement
        })
        await uploadImage(profileImage, "2", workerId, "profile")
    }

    return (
        <View style={{flex:1}}>
            <ScrollView style={styles.container}>
                <View style={styles.header}></View>
                <TouchableOpacity style={styles.avatarButton}
                                  onPress={() => pickImage()}>
                    <Image style={styles.avatar} source={{uri: profileImage}}/>
                </TouchableOpacity>
                <View style={styles.body}>
                    <Text style={styles.name}>{firstName}{' '}{lastName}</Text>
                    <ProfileCardBasicInfo data={{ listItemsAndIcons:
                            [
                                {name: address, icon: 'map-marker'},
                                {name: `${phoneNumber}`, icon: 'phone-outline'},
                            ]
                    }}/>
                    <List.Section>
                        <List.Subheader>Basic Info</List.Subheader>
                        <TextInput
                            multiline={false}
                            onChangeText={(text) => setFirstName(text)}
                            placeholder="Change your first name"
                        />
                        <TextInput
                            multiline={false}
                            onChangeText={(text) => setLastName(text)}
                            placeholder="Change your last name"
                        />
                        <TextInput
                            multiline={true}
                            onChangeText={(text) => setAddress(text)}
                            placeholder="Change your address"
                        />
                        <TextInput
                            multiline={false}
                            onChangeText={(text) => setPhoneNumber(text)}
                            placeholder="Change phone number"
                        />
                    </List.Section>

                    <TextInputCancelableList entries={skillsAndQualities}
                                             setEntries={setSkillsAndQualities}
                                             title="Skills and Qualities"
                                             placeholder="Type a skill or quality and press enter"/>
                    <ProfileCardList data={{ title:'Skills and Qualities', listItems: skillsAndQualities
                    }}/>
                    <TextInputCancelableList entries={qualifications}
                                             setEntries={setQualifications}
                                             title="Qualifications"
                                             placeholder="Type a qualification and press enter"/>
                    <ProfileCardList data={{ title:'Qualifications', listItems: qualifications
                    }}/>
                    <TextInputCancelableList entries={experience}
                                             setEntries={setExperience}
                                             title="Experience"
                                             placeholder="Type your experience and press enter"/>
                    <ProfileCardList data={{ title:'Experience', listItems: experience
                    }}/>

                    <List.Section>
                        <List.Subheader>Personal Statement</List.Subheader>
                        <TextInput
                            multiline={true}
                            onChangeText={(text) => setPersonalStatement(text)}
                            placeholder="Enter a short description about you!"
                        />
                    </List.Section>
                    <ProfileCardText data = {{
                        title: 'Personal Statement',
                        body: personalStatement
                    }} />
                </View>
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
    saveButton: {
        alignSelf: 'center',
        marginBottom: height*0.07,
        marginTop: height*0.03,
        borderColor: '#38B6FF',
        height: height*0.06,
        width: width*0.4,
        justifyContent: 'center'
    },
    rateText: {
        fontSize: 15 + height*0.009
    }
})