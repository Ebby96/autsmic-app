import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useContextValue } from "../context";

//Parent's login screen

const ParentsScreen = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [gamesState, setGamesState] = useState({});
  const date = new Date();
  const navigation = useNavigation();
  const { user } = useContextValue();
  const handleBack = () => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
    navigation.replace("Child");
  };

  useEffect(() => {
    let unsubscribe = false;
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    const fetchGamesState = async () => {
      const res = await getDoc(doc(db, "games", `${user.uid}`));
      setGamesState(res.data());
    };
    if (!unsubscribe) fetchGamesState();

    return () => {
      unsubscribe = false;
    };
  }, []);

  return (
    <SafeAreaView className="bg-[#131111] flex-1 justify-between">
      <View className="px-4 flex-row items-center justify-between pb-4 border-b border-gray-400">
        <Text className="text-white text-4xl">Daily Report</Text>
        <TouchableOpacity
          className="bg-gray-500 px-12 py-4 rounded-3xl"
          onPress={handleBack}
        >
          <Text className="text-white font-bold text-lg">Child</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View className="flex-row justify-between">
          <Text className="text-white my-3 text-3xl ml-4">Today</Text>
          <TouchableOpacity className="bg-gray-500 mr-4 px-12 py-4 rounded-3xl" onPress={()=> navigation.navigate('Doctors')}>
            <Text className="text-white text-xl font-bold">Contact a doctor</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-white text-xl ml-4">
          {months[date.getMonth()] + " " + date.getDate()}
        </Text>
      </View>

      <View className="w-full bg-white h-32 rounded-2xl mt-3 flex-row items-center justify-between overflow-hidden">
        <View>
          <Text className="text-3xl font-bold opacity-40 mt-1 ml-2">
            You break the streak
          </Text>
          <Text className="opacity-40 ml-2">
            {months[date.getMonth()] + " " + date.getDate()}
          </Text>

          <View className="flex-row mx-4 mt-2">
            <View className="items-center space-y-1 mx-1">
              <Text className="font-bold opacity-40">S</Text>
              <Ionicons name="ios-checkmark-circle" size={24} color="orange" />
            </View>

            <View className="items-center space-y-1 mx-1">
              <Text className="font-bold opacity-40">M</Text>
              <Ionicons name="ios-checkmark-circle" size={24} color="orange" />
            </View>

            <View className="items-center space-y-1 mx-1">
              <Text className="font-bold opacity-40">T</Text>
              <Ionicons name="ios-checkmark-circle" size={24} color="orange" />
            </View>

            <View className="items-center space-y-1 mx-1">
              <Text className="font-bold opacity-40">W</Text>
              <Ionicons
                name="ios-checkmark-circle"
                size={24}
                color="lightgray"
              />
            </View>

            <View className="items-center space-y-1 mx-1">
              <Text className="font-bold opacity-40">T</Text>
              <Ionicons
                name="ios-checkmark-circle"
                size={24}
                color="lightgray"
              />
            </View>

            <View className="items-center space-y-1 mx-1">
              <Text className="font-bold opacity-40">F</Text>
              <Ionicons
                name="ios-checkmark-circle"
                size={24}
                color="lightgray"
              />
            </View>

            <View className="items-center space-y-1 mx-1">
              <Text className="font-bold opacity-40">S</Text>
              <Ionicons
                name="ios-checkmark-circle"
                size={24}
                color="lightgray"
              />
            </View>
          </View>
        </View>

        <Image
          source={require("../assets/ParentsScreenSticker.png")}
          className="object-contain ml-4"
        />
      </View>

      <View className="border-b border-gray-500">
        <Text className="text-white text-xl text-center py-4 font-semibold">
          Keep in mind to practice daily for better learning benefits
        </Text>
      </View>

      <View className="pb-3 border-b border-gray-500">
        <View className="w-full h-16 bg-gray-400 flex-row items-center px-4 rounded-3xl my-6">
          <FontAwesome5 name="arrow-circle-down" size={24} color="dodgerblue" />
          <Text className="text-xl font-semibold text-center tracking-wide ml-2">
            Your kid spent less time today on number game
          </Text>
        </View>

        <View className="w-full h-16 bg-gray-400 flex-row items-center px-4 rounded-3xl">
          <AntDesign name="exclamationcircle" size={24} color="orange" />
          <Text className="text-xl font-semibold text-center tracking-wide ml-2">
            Your kid has not started spell game yet
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Complete", { gamesState })}
        >
          <View className="bg-blue-500 mt-10 mb-3 py-4 rounded-2xl">
            <Text className="font-bold text-white text-center text-xl">
              See Complete History
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="mt-4 w-full h-16 rounded-xl bg-gray-400 flex-row items-center justify-around">
        <TouchableOpacity>
          <Ionicons name="settings" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
          <FontAwesome5 name="blogger" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="settings" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ParentsScreen;
