import React from 'react'
import AddEntry from './components/AddEntry'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)} >
        <View style={styles.container}>
          <AddEntry />
        </View>
      </Provider>
    )
  }
}