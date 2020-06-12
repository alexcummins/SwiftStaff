import React from 'react';
import {Card, List, Title, Divider} from 'react-native-paper';
import {StyleSheet, Dimensions} from 'react-native';

export default function ProfileCardBasicInfo({data}) {

    ProfileCardBasicInfo.defaultProps = {
        listItemsAndIcons: [],
    }

    return (
        <List.Section>
            {data.listItemsAndIcons.map( item =>
                <List.Item
                    key={item.name}
                    title={item.name}
                    titleNumberOfLines={2}
                    left={() => <List.Icon icon={item.icon} />}
                    style={style.listItem}
                />
            )}
        </List.Section>
    );
}

const height = Dimensions.get('window').height;
const style = StyleSheet.create({
    listItem: {
        height:height*0.075,
    },


})