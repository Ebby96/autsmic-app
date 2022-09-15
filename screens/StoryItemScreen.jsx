import { View, Text, SafeAreaView, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Feather,FontAwesome,FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native'
import * as ScreenOrientation from "expo-screen-orientation";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from "expo-speech";


//Story screen after opening story card

const StoryItemScreen = () => {
    const {params:{story}} = useRoute();
    const [play, setPlay] = useState(false);
    const navigation = useNavigation();
    const handleBack = () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
        navigation.navigate("Parents");
        Speech.stop();
      };
    const startSpeech = () => {
        setPlay(true);
        Speech.speak(story);
    };
    const stopSpeech = () => {
        setPlay(false);
        Speech.stop();
    };
  return (
    <SafeAreaView className="flex-1 bg-[#131111]">
      
      <View className="flex-row items-center p-4 w-full border-b border-gray-400">
        <Pressable onPress={() => {
            Speech.stop();
            navigation.goBack();
        }}>
          <Feather name="arrow-left-circle" size={30} color="white" />
        </Pressable>
        <Text className="ml-4 text-white font-bold text-3xl flex-1">
          Story
        </Text>
        <TouchableOpacity
          className="bg-gray-500 px-10 py-3 rounded-3xl"
          onPress={handleBack}
        >
          <Text className="text-white font-bold text-lg">Parents</Text>
        </TouchableOpacity>
      </View>

      <View className="w-full px-8 bg-white rounded-3xl mt-10 min-h-[200px] flex-row items-start">
        <View className="">
            <MaterialCommunityIcons name="butterfly" size={180} color="dodgerblue" />
        </View>
        <Text className="flex-1 text-2xl tracking-wider mt-4">{story}</Text>
        <View className="mt-2">
            {
                play ? (
                    <Pressable onPress={stopSpeech}>
                        <FontAwesome5 name="volume-mute" size={50} color="black" />
                    </Pressable>
                    ):(
                        <Pressable onPress={startSpeech}>
                            <FontAwesome name="volume-up" size={50} color="black" />
                        </Pressable>
                )
            }
        </View>
      </View>

    </SafeAreaView>
  )
}

export default StoryItemScreen