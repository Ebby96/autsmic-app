import { View, Text,SafeAreaView, Pressable, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign, Feather } from '@expo/vector-icons';

//Chat with Doctor

const DoctorChat = () => {

    const navigation = useNavigation();
    const {params} = useRoute();
    const [message,setMessage]=useState('');
    const doctor = params.doctor;
  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={60} style={{flex:1}}>
        <View className="flex-1 justify-between bg-[#131111] relative">
            <Pressable onPress={()=>navigation.goBack()} className=" top-0">
                <MaterialIcons name="cancel" size={30} color="white" />
            </Pressable>

            <Pressable className="flex-1 justify-between" onPress={()=>Keyboard.dismiss()}>

                <View className="flex-row justify-center mt-10">
                    <View className="bg-gray-600 w-10/12 rounded-2xl my-2 flex-row items-center p-3">
                        <Image source={doctor?.imgUrl} className="w-20 bg-white h-20 rounded-full" />

                        <View className="ml-3 text-left space-y-1">
                            <Text className='text-white text-xl'>{doctor?.name}</Text>
                            <Text className='text-white text-lg font-bold tracking-wider'>{doctor?.type}</Text>
                        </View>
                    </View>
                </View>

                <View className="w-full flex-row justify-center">
                        <View className="w-11/12 p-2 flex-row items-center bg-gray-600 rounded-2xl">
                            <TouchableOpacity className="mr-2 border rounded-full">
                                <AntDesign name="plus" size={24} color="black" />
                            </TouchableOpacity>
                            <TextInput value={message} onChangeText={setMessage} className="border rounded-3xl flex-1 bg-white p-2" placeholder='your message' />
                            <TouchableOpacity className="ml-2">
                                <Feather name="send" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
            </Pressable>
        </View>
    </KeyboardAvoidingView>
  )
}

export default DoctorChat