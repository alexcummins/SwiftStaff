import React from 'react';
import {Card, Title, Modal, ActivityIndicator, Colors} from 'react-native-paper';
import {StyleSheet, Dimensions} from 'react-native';

export default function LoadingPopUp(props) {

    return(
        <Modal isVisible={props.loading}>
            <Card>
                <Card.Content style={styles.loadingCard}>
                    <ActivityIndicator animating={true}
                                       color={Colors.blue800} size='large'
                                       style={styles.loadingIcon}/>
                    <Title style={styles.loadingMessage}>{props.message}</Title>
                </Card.Content>
            </Card>
        </Modal>
    );
}



const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    loadingCard: {
        alignItems: 'center'
    },
    loadingIcon: {
        margin : 15 + height * 0.02,
        borderColor: '#f1c40f'
    },
    loadingMessage: {
        margin: 15 + height *0.01
    }
})