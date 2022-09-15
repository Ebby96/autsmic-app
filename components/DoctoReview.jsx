import { View, Text } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
//Doctor review
const DoctoReview = () => {
  return (
    <View className="bg-white w-10/12 my-2 rounded-xl p-4 space-y-3">
        <View className="flex-row justify-between">
            <Text className="text-2xl font-bold">Anna</Text>
            <View className="flex-row items-center">
                {Array(5).fill().map((i)=>(<Entypo name="star" size={24} color="gold" />))}
            </View>
        </View>
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti hic aut et? Numquam animi at eum sunt dolore praesentium accusamus, necessitatibus maxime laudantium, atque blanditiis?</Text>
    </View>
  )
}

export default DoctoReview