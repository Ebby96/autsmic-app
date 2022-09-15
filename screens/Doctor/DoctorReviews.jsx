import { View, Text, Image, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
import DoctoReview from '../../components/DoctoReview';
//Doctor's Reviews
const DoctorReviews = () => {
    const {params} = useRoute();
    const navigation = useNavigation();
    const [review,setReivew]=useState('')
  return (
    <View className="flex-1 bg-[#131111] relative">

        <Pressable onPress={()=>navigation.goBack()} className="absolute right-4 top-2">
            <MaterialIcons name="cancel" size={30} color="white" />
        </Pressable>

        <View className="flex-row justify-center mt-10">
            <View className="bg-gray-600 w-10/12 rounded-2xl my-2 flex-row items-center p-3">
                <Image source={params?.doctor?.imgUrl} className="w-20 bg-white h-20 rounded-full" />

                <View className="ml-3 text-left space-y-1">
                    <Text className='text-white text-xl'>{params?.doctor?.name}</Text>
                    <Text className='text-white text-lg font-bold tracking-wider'>{params?.doctor?.type}</Text>
                </View>
            </View>
        </View>

        <View className="flex-row justify-center w-full mt-10">
            <View className="bg-white w-10/12 rounded-xl p-4 space-y-3">
                <Text className="text-2xl font-bold">Do you want to Rate the Doctor?</Text>
                <View className="flex-row items-center">
                    {Array(5).fill().map((i)=>(<Entypo name="star" size={24} color="gold" />))}
                </View>

                <Text className="text-2xl font-bold">Leave a Review</Text>
                <TextInput value={review} onChangeText={setReivew} className="flex-1 border rounded-xl py-2 px-2" placeholder='your review....' />
            </View>
        </View>


        <View className="w-full items-center mt-10">
            {Array(2).fill().map((i)=> <DoctoReview />)}
        </View>


    </View>
  )
}

export default DoctorReviews