import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DoctorCard = ({doctor}) => {

    const navigation = useNavigation();
    //Doctor name,speciallity, rating and other details
  return (
    <View className="bg-gray-600 w-full rounded-2xl my-2 flex-row items-center p-3">
      
      <Image source={doctor.imgUrl} className="w-20 bg-white h-20 rounded-full" />
      
      <View className="ml-3 text-left space-y-1">
      
        <Text className='text-white text-xl'>{doctor.name}</Text>
        <Text className='text-white text-lg font-bold tracking-wider'>{doctor.type}</Text>
        <View className="flex-row items-center">
            {Array(doctor.rating).fill(0).map((item)=><Ionicons name="md-star" size={20} color="yellow" />)}
            {doctor.rating !== 5 && Array(5 -doctor.rating).fill(0).map((item)=><Ionicons name="ios-star-outline" size={20} color="black" />)}
        </View>
      </View>

      <View className="flex-1 flex-row justify-end">
        <TouchableOpacity className="bg-gray-400 p-5 rounded-full" onPress={()=>navigation.navigate('DoctorScreen',{doctor})}>
            <Text className="text-white font-bold">Details</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default DoctorCard