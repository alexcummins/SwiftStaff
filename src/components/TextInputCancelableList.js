import React, {useState} from 'react';
import {View} from 'react-native'
import {List, Checkbox, Chip, TextInput} from 'react-native-paper';

export default function TextInputCancelableList(props) {

    const { entries } = props
    const { setEntries } = props
    const { title } = props
    const { placeholder } = props

    const [buffer, setBuffer] = useState("")

    function updateListAndResetBuffer() {
        console.log("Here")
        setEntries([...entries, buffer])
        setBuffer("")
        console.log(buffer)
    }

    function removeEntry(entry) {
        if (entries.includes(entry)) {
            setEntries(entries.filter(e => e !== entry))
        }
    }

    function createEntryChip(entry : string, icon = 'plus-circle-outline') {
        return (
            <Chip
                icon={icon}
                key={entry}
                onClose={() => removeEntry(entry)}
                onPress={() => removeEntry(entry)}
            >
                {entry}
            </Chip>
        );
    }

    return (
        <List.Section>
            <List.Subheader>{title || null}</List.Subheader>
            <View style={{flexDirection: "row", flexWrap: "wrap"}} >
                {entries.map(entry => createEntryChip(entry))}
            </View>
            <TextInput multiline={false}
                       onChangeText={(text) => setBuffer(text)}
                       onSubmitEditing={(_) => updateListAndResetBuffer()}
                       placeholder={placeholder}
                       value={buffer}
            />
        </List.Section>
    );
}