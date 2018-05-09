import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'

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

export default class AddEntry extends Component {
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
    // Update Redux

    this.setState(initial_state)

    // Navigate to home

    // Save to 'DB'

    // Clear local notifications
  }
  render(){
    const metaInfo = getMetricMetaInfo()

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