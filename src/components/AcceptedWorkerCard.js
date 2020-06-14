import React, {useState} from 'react';
import {Card, List, Title, Divider, Subheading, Button, Modal, IconButton, Chip} from 'react-native-paper';
import {StyleSheet, Dimensions, View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StarRating from "react-native-star-rating";
import {Rating} from 'react-native-ratings'
import {callPhone} from "../api/Utils";
import ExtraInfo from "./ExtraInfo";
import WorkerReviewCard from "./WorkerReviewCard";

export default function AcceptedWorkerCard({data, worker}) {

    return (
        <Card style={{marginVertical: 10, marginHorizontal: 10}} elevation={10}>
            <Card.Title title={`Confirmed booking ${data.date}`}/>
            <Card.Content>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Title>{`£${data.hourlyRate} per hour.`}</Title>
                    <Title>{`${data.startTime} - ${data.endTime}`}</Title>
                </View>
                <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 15}}>
                    {data.credentials.map((c) => <Chip key={c} style={{margin: 5}}>{c}</Chip>)}
                </View>
                <ExtraInfo extraInfo={data.extraInfo} defaultLines={1}/>
            </Card.Content>
            <WorkerReviewCard worker={worker} jobsId={data.jobId} showBottomBar={false} showPhoneNumber={true}/>
        </Card>

    );
}