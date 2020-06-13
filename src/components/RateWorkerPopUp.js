import React, {useState} from 'react';
import {Card, Button, Title, Divider} from 'react-native-paper';
import {StyleSheet, Dimensions} from 'react-native';
import Modal from "react-native-modal";
import {Rating} from "react-native-ratings";
import {TouchableOpacity} from 'react-native';
import {sendNewWorkerRating} from "../api/APIUtils";

export default function RateWorkerPopUp(props) {

    const [rating, setRating] = useState(0)
    const [completed, setCompleteRating] = useState(false)


    function completeRating() {
        setCompleteRating(true)
    }

    function startValue() {
        let result = 0
        if (props.oldRatingCount !== 0) {
            result = props.oldRatingTotal / props.oldRatingCount
        }
        return result
    }

    function onFinishRating(rating) {
        setRating(rating)
        console.log("RatingAfter" + rating)
    }

    const apply = async ()  => {
        const newRatingTotal = props.oldRatingTotal + rating
        const newRatingCount = props.oldRatingCount + 1
        console.log(newRatingTotal)
        console.log(props.userId)
        console.log(newRatingCount)
        completeRating()

        let promise = await sendNewWorkerRating(
            {
                userId: props.userId,
                newRating: rating
            })
    }

    return (
            <Card>
                <Card.Content style={styles.rateCard}>
                    <Title>Rate {props.fname} {props.lname} !</Title>
                    <Divider/>
                    <Rating showRating={true}
                            fractions="1"
                            startingValue={startValue().toString()}
                            onFinishRating={(rating) => onFinishRating(rating)}/>
                    {!completed ?
                        <Button icon="gesture-double-tap"
                                         mode="outlined"
                                         onPress={() => apply()}
                                         style={styles.rateButton}
                                         color={'#f1c40f'}>
                        Rate
                        </Button> : null}
                    {completed ?
                        <Title style={styles.afterRateText}>Thank you for the rate!</Title>
                        : null }
                </Card.Content>
            </Card>
    );
}

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    rateCard: {
        alignItems: 'center'
    },
    rateButton: {
        marginTop : height *0.02,
        borderColor: '#f1c40f'
    },
    afterRateText: {
        color: '#f1c40f',
        fontSize: 30,
        marginTop: height *0.02
    }
})
