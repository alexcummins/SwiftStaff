import React from 'react';
import {Card, Paragraph, Title, Divider} from 'react-native-paper';

export default function ProfileCardText({data}) {

    ProfileCardText.defaultProps = {
        title: '',
        body: ''
    }

    return (
        <Card style={{marginTop: 10, backgroundColor: "#ffffff"}}>
            <Card.Content>
                <Title> {data.title} </Title>
                <Divider />
                <Paragraph style={{margin:10}}> {data.body} </Paragraph>
            </Card.Content>
        </Card>
    );


}