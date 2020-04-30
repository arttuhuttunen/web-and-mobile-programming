import React from 'react';
import {Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import styles from './styles.js'
import { render } from 'react-dom';

class MobileNotes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [
        {note: 'note1'}
      ],
      newNote: ' ',
    }
  }

  /* handleNoteChange = (event) => {
    this.setState({note: event.target.value})
  } */

  addNote() {
    this.setState({notes: this.state.notes.concat({note: this.state.newNote})})
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.notes.map(note =>
            <Note 
            content={note.note}
            />
            )}
        </ScrollView>
        <TextInput style={{ height: 40, width: '100%', borderColor: 'gray', borderWidth: 1 }} onChangeText={text => this.setState({newNote: text})}/>
        <Button title='ADD NOTE' onPress={this.addNote}/>
      </View>
    )
  }
}


const Note = (props) => {
  return (
    <Text>
      {props.content}
    </Text>
  )
}

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Notes'>
        <Stack.Screen name='Notes' component={MobileNotes} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;