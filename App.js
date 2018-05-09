import React from 'react'
import AddEntry from './components/AddEntry'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handlePress}>
          <Text style={styles.buttonText}>Test</Text>
        </TouchableOpacity>
        <AddEntry />
      </View>
    )
  }
}