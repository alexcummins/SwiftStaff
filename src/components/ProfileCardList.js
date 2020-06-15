import React from 'react';
import {Card, List, Title, Divider, Surface} from 'react-native-paper';
import {StyleSheet, Dimensions} from 'react-native';

export default function ProfileCardList({data}) {

    ProfileCardList.defaultProps = {
        title: '',
        listItems: [],
    }

    return (
        <Surface elevation={5} style={style.Card}>
            <Card.Content>
                <List.Section style={{marginBottom:15}}>
                    <List.Subheader>{data.title}</List.Subheader>
                    <Divider style={{marginBottom: 10}}/>
                    {data.listItems.map( (itemNames, index) =>
                        <List.Item
                            key={index}
                            title={itemNames}
                            titleNumberOfLines={2}
                            left={() => <List.Icon icon="square-small" />}
                            style={style.listItem}
                        />
                    )}
                </List.Section>
            </Card.Content>
        </Surface>
    );
}

const height = Dimensions.get('window').height;
const style = StyleSheet.create({
    listItem: {
        height:height*0.04,
        top: height*(-0.02),
    },
    Card: {
        marginTop: 10,
    },
})