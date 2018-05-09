import React from 'react'
import AddEntry from './components/AddEntry'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Slider
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  button: {
    backgroundColor: '#FF0000',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: '#FFFFFF'
  }
})


export default class App extends React.Component {
  handlePress = ()=> {

  }
  state = {
    value: 0
  }
  render() {
    return (
      <View style={styles.container}>
        <AddEntry />
      </View>
    )
  }
}