import React from 'react';
import {Card, List, Title, Divider} from 'react-native-paper';
import {StyleSheet, Dimensions} from 'react-native';

export default function ProfileCardList({data}) {

    ProfileCardList.defaultProps = {
        title: '',
        listItems: []
    }

    return (
        <Card style={style.Card}>
            <Card.Content>
                <Title> {data.title} </Title>
                <Divider />
                <List.Section>
                    {data.listItems.map( itemNames =>
                        <List.Item
                            title={itemNames.name}
                            titleNumberOfLines={2}
                            left={() => <List.Icon icon="square-small" />}
                            style={style.listItem}
                        />
                    )}
                </List.Section>
            </Card.Content>
        </Card>
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
        backgroundColor: "rgb(255,255,255)"
    },
    ListSection: {
        top: 100
    },
})