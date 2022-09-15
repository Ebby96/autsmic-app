import { View, Text, SafeAreaView, TouchableOpacity,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import DoctorCard from '../../components/DoctorCard';
//Doctor Details
const DoctorDetailsScreen = () => {
    const {params:{doctor}} = useRoute();
    const navigation = useNavigation();

  return (
    <View className="flex-1 bg-[#131111]">
      
      <View className="w-full bg-gray-800 pt-16 space-y-3 pb-6 rounded-b-[60px] relative">
            <TouchableOpacity className="absolute top-14 ml-4" onPress={()=>navigation.goBack()}>
                <Ionicons name="arrow-back-circle-outline" size={32} color="lightgray" />
            </TouchableOpacity>

            <View className="flex-row py-6 justify-center">
                <View className="bg-gray-600 w-11/12 rounded-2xl my-2 flex-row items-center p-3">
                    <Image source={doctor.imgUrl} className="w-20 bg-white h-20 rounded-full" />
                    <View className="ml-3 text-left space-y-1">
                        <Text className='text-white text-2xl'>{doctor.name}</Text>
                        <Text className='text-white text-lg font-bold tracking-wider'>{doctor.type}</Text>
                    </View>
                </View>
            </View>

        </View>


        <View className="flex-row justify-center">

            <View className="bg-white w-11/12 mt-10 p-4 rounded-xl space-y-1">
                <Text className="text-gray-900 font-semibold text-2xl">Contact Details</Text>
                <Text className="text-gray-900 text-xl">Phone:{" "} 06221 / 26 404</Text>
                <Text className="text-gray-900 text-xl">Email-ID: info@gynaekologe-heidelberg.de</Text>
                <Text className="text-gray-900 font-semibold text-xl">Opening Timings</Text>
                <Text className="text-gray-900 text-xl">Mon - Fri : 08:00 -13:00 Uhr</Text>
            </View>

        </View>

        <View className="items-center mt-20 space-y-4">
            
            <TouchableOpacity className="bg-white w-10/12 rounded-xl py-6" onPress={()=> navigation.navigate('DoctorReviews',{doctor})}>
                <Text className='text-center font-semibold text-3xl'>Ratings & Reviews</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white w-10/12 rounded-xl py-6" onPress={()=> navigation.navigate('DoctorChat',{doctor})}>
                <Text className='text-center font-semibold text-3xl mx-6'>Have a conversation or Book an Appointment</Text>
            </TouchableOpacity>

        </View>

    </View>
  )
}

export default DoctorDetailsScreen