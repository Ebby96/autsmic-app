import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import StoryItem from "../../components/StoryItem";
import * as ScreenOrientation from "expo-screen-orientation";

//Story time 

const StoryTime = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    navigation.navigate("Parents");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#131111]">
      <View className="flex-row items-center p-4 w-full border-b border-gray-400">
        <Pressable onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={30} color="white" />
        </Pressable>
        <Text className="ml-4 text-white font-bold text-3xl flex-1">
          Story Time
        </Text>
        <TouchableOpacity
          className="bg-gray-500 px-10 py-3 rounded-3xl"
          onPress={handleBack}
        >
          <Text className="text-white font-bold text-lg">Parents</Text>
        </TouchableOpacity>
      </View>

      <View className=" flex-row flex-wrap p-6 space-x-2">
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
      </View>
    </SafeAreaView>
  );
};

export default StoryTime;
