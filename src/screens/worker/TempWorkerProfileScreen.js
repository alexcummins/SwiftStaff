import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
import {ScrollView} from "react-native";
import ProfileCardBasicInfo from "../../components/ProfileCardBasicInfo";
import ProfileCardList from "../../components/ProfileCardList";
import ProfileCardText from "../../components/ProfileCardText";
export default function Profile() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={require('../../../resources/img/selfie.jpg')}/>
            <View style={styles.body}>
                <Text style={styles.name}> Max Adams</Text>
                <ProfileCardBasicInfo data={{ listItemsAndIcons:
                        [
                            {name:'15 Alexander Road, London, SW59 0JC', icon: 'map-marker'},
                            {name:'07654321234', icon: 'phone-outline'},
                        ]
                }}/>
                <ProfileCardList data={{ title:'Skills and Qualities', listItems:
                        [
                            {name: 'Collaborative'},
                            {name: 'Hardworking'},
                            {name: 'Til-trained'},
                            {name: 'Interpersonal'},
                            {name: 'Teamwork'},
                        ]
                }}/>
                <ProfileCardList data={{ title:'Qualifications', listItems:
                        [
                            {name: 'Collaborative'},
                            {name: 'Hardworking'},
                            {name: 'Til-trained'},
                            {name: 'Interpersonal'},
                            {name: 'Teamwork'},
                        ]
                }}/>
                <ProfileCardList data={{ title:'Experience', listItems:
                        [
                            {name: '2 years, Corporate Concierge, The SSE Arena'},
                            {name: '1 year, Waiter, Romulo Cafe'},
                        ]
                }}/>
                <ProfileCardText data = {{
                    title: 'Experience',
                    body:'My name is Mike, I am very hardworking and ameable. Ever since I was 15, I have been' +
                        'in customer service through volunteering in Marie Curie. I like working with customers ' +
                        'directly and I enjoy the fast-paced customer service orientated nature of Cafe work'
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
    info:{
        fontSize:16,
        color: "#00BFFF",
        marginTop:10
    },
    description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
    },
});


// const styles = StyleSheet.create({
//     container:{
//       flex: 1,
//     },
//     header:{
//         backgroundColor: "#00BFFF",
//         height:200,
//     },
//     avatar: {
//         width: 130,
//         height: 130,
//         borderRadius: 63,
//         borderWidth: 4,
//         borderColor: "white",
//         marginBottom:10,
//         alignSelf:'center',
//         position: 'absolute',
//         marginTop:130
//     },
//     body:{
//         marginTop:40,
//     },
//     bodyContent: {
//         // flex: 1,
//         alignItems: 'center',
//         // padding:30,
//     },
//     name:{
//         fontSize:28,
//         color: "#696969",
//         fontWeight: "600"
//     },
//     info:{
//         fontSize:16,
//         color: "#00BFFF",
//         marginTop:10
//     },
//     description:{
//         fontSize:16,
//         color: "#696969",
//         marginTop:10,
//         textAlign: 'center'
//     },
//     buttonContainer: {
//         marginTop:10,
//         height:45,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom:20,
//         width:250,
//         borderRadius:30,
//         backgroundColor: "#00BFFF",
//     },
// });
