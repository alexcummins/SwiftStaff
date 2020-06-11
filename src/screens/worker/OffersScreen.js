import React, {useState, useEffect} from 'react';
import {View, Text, Button, Platform, ToastAndroid, Alert, ScrollView} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {List} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import {API_JOB_URL, convertDataToJobCardData, getJobRequest, WEBSOCKET_PROTOCOL} from '../../api/APIUtils';
import OfferCard from "../../components/OfferCard";

export default function OffersScreen(props) {

  return (
    <ScrollView >
      <OfferCard/>
    </ScrollView>
  );

}



