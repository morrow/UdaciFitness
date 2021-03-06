import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'

const initial_state = {
  run: 0,
  bike: 0,
  swim: 0,
  sleep: 0,
  eat: 0,
}

const SubmitButton = ({ onPress })=> {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {
  state = JSON.parse(JSON.stringify(initial_state))
  increment = (metric)=> {
    const { max, step } = getMetricMetaInfo(metric)
    this.setState((state)=>{
      const count = state[metric] + step
      return {
        ...state,
        [metric]: count > max ? max : count
      }
    })
  }
  decrement = (metric)=> {
    const { step } = getMetricMetaInfo(metric)
    this.setState((state)=>{
      const count = state[metric] - step
      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      }
    })
  }
  slide = (metric, value)=> {
    this.setState(()=>({
      [metric]: value
    }))
  }
  submit = ()=> {
    const key = timeToString()
    const entry = this.state

    this.props.dispatch(addEntry({
      [key]: entry
    }))

    this.setState(initial_state)

    // Navigate to home

    submitEntry({ key, entry})

    // Clear local notifications
  }
  reset = ()=>{
    const key = timeToString()
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))
    // Route to home
    removeEntry(key)
  }

  render(){
    const metaInfo = getMetricMetaInfo()

    if(this.props.alreadyLogged){
      return (
        <View>
          <Ionicons name='ios-happy-outline' size={100} />
          <Text>You already logged your information for today.</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      )
    }

    return (
      <View>
        <DateHeader date={(new Date().toLocaleDateString())} />
        { Object.keys(metaInfo).map((key)=>{
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]
          return (
            <View key={key}>
              { getIcon() }
              { type === 'slider'
                ? <UdaciSlider
                  value={value}
                  onChange={(value)=>this.slide(key, value)}
                  {...rest} />
                : <UdaciStepper
                    value={value}
                    onIncrement={()=>this.increment(key)}
                    onDecrement={()=>this.decrement(key)}
                    {...rest} />
                }
              }
            </View>
          )
        })}
        <SubmitButton onPress={this.submit}/>
      </View>
    )
  }
}

const mapStateToProps = (state)=> {
  const key = timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps)(AddEntry)