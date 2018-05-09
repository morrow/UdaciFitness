import React from 'react'
import { View, Text, Slider } from 'react-native'

export default function UdaciSlider({ max, unit, step, value, onChange}){
  return (
    <View>
      <Slider
          step={step}
          value={value}
          minimumValue={0}
          maximumValue={max}
          onValueChange={onChange}
        />
        <Text>{value} {unit}</Text>
    </View>
  )
}