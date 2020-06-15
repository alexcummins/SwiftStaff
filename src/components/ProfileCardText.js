import React from 'react';
import {Card, Paragraph, Title, Divider, Surface, List} from 'react-native-paper';

export default function ProfileCardText({data}) {

    ProfileCardText.defaultProps = {
        title: '',
        body: ''
    }

    return (
        <Surface elevation={5} style={{marginTop: 10}}>
            <Card.Content>
                <List.Subheader>{data.title}</List.Subheader>
                <Divider style={{marginBottom: 10}}/>
                <Paragraph style={{margin:10, marginBottom:30}}> {data.body} </Paragraph>
            </Card.Content>
        </Surface>
    );


}