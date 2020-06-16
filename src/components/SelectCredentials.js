import React, {useState, useEffect} from 'react';
import {View} from 'react-native'
import {List, Checkbox, Chip} from 'react-native-paper';

export default function SelectCredentials(props) {

    const { selectedCredentials } = props
    const { title } = props
    // Pass in your setState function as this prop.

    const [credentials, setCredentials] = useState([])
    const [refresh, setRefresh] = useState(props.refresh)
    const kitchenCredentials = ["Kitchen Porter", "Food Prep Assistant", "Commie Chef", "Chef de Partie", "Head Chef"]
    const fohCredentials = ["Waiting Staff", "Barista", "Bar staff", "Cocktail Staff"]
    const cleaningCredentials = ["General Cleaner"]

    useEffect(() => {
        setCredentials([]); //children function of interest
    }, [props.refresh]);

    function updateCredentials(credential) {
        if (credentials.includes(credential)) {
            setCredentials(credentials.filter(c => c !== credential))
            selectedCredentials(credentials.filter(c => c !== credential))
        } else {
            setCredentials([...credentials, credential])
            selectedCredentials([...credentials, credential])
        }

    }

    function createCredentialCheckbox(c) {
        return <Checkbox.Item
            label={c}
            key={c}
            color={"orange"}
            status={credentials.includes(c) ? 'checked' : 'unchecked'}
            onPress={() => updateCredentials(c)}
        />;
    }

    function createCredentialChips(c, icon) {
        return (
            <Chip
                icon={icon}
                key={c}
                onClose={() => updateCredentials(c)}
                onPress={() => updateCredentials(c)}
                style={{color: "red"}}
            >
                {c}
            </Chip>
        )
    }

    return (
        <List.Section title={title}>
            <List.AccordionGroup>
                <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                    {credentials.map(c => createCredentialChips(c))}
                </View>
                <List.Accordion
                    title="Kitchen"
                    left={props => <List.Icon {...props} icon="chef-hat"/>}
                    id={"1"}
                >
                    {kitchenCredentials.map(c => createCredentialCheckbox(c))}
                </List.Accordion>

                <List.Accordion
                    title="Front of house"
                    left={props => <List.Icon {...props} icon="bow-tie"/>}
                    id={"2"}
                >
                    {fohCredentials.map(c => createCredentialCheckbox(c))}
                </List.Accordion>

                <List.Accordion
                    title="Cleaning"
                    left={props => <List.Icon {...props} icon="broom"/>}
                    id={"3"}
                >
                    {cleaningCredentials.map(c => createCredentialCheckbox(c))}
                </List.Accordion>
            </List.AccordionGroup>
        </List.Section>
    )
}