import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useMemo, useState } from "react";
import { Feather, FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useContextValue } from "../../context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Match the shape Game

const MatchShapeScreen = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useContextValue();
  const startDate = useMemo(() => new Date(), []);
  const handleBack = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    navigation.navigate("Parents");
  };

  const errorHandler = () => {
    setError(true);
    setInterval(() => {
      setError(false);
    }, 1000);
    const endTime = new Date();
    const takenTime = ((endTime - startDate) / 1000).toFixed();
    const setGameScore = async () => {
      await setDoc(
        doc(db, "games", `${user.uid}`),
        {
          answerStateMatch: "Failed",
          timeToSolveMatch: `${takenTime} Seconds`,
          matchDate: new Date().toISOString(),
          scoreMatch:0
        },
        { merge: true }
      );
    };
    setGameScore();
  };

  const handleTrue = () => {
    setOpen(true);
    const endTime = new Date();
    const takenTime = ((endTime - startDate) / 1000).toFixed();
    const setGameScore = async () => {
      await setDoc(
        doc(db, "games", `${user.uid}`),
        {
          answerStateMatch: "Answered",
          timeToSolveMatch: `${takenTime} Seconds`,
          matchDate: new Date().toISOString(),
          scoreMatch:2
        },
        { merge: true }
      );
    };
    setGameScore();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#131111]">
      <View className="flex-row items-center p-4 w-full border-b border-gray-400">
        <Pressable onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={30} color="white" />
        </Pressable>
        <Text className="ml-4 text-white font-bold text-3xl flex-1">
          Match Shape
        </Text>
        <TouchableOpacity
          className="bg-gray-500 px-10 py-3 rounded-3xl"
          onPress={handleBack}
        >
          <Text className="text-white font-bold text-lg">Parents</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-6 bg-white rounded-xl flex-row justify-between w-full relative">
        <View
          className={`absolute flex-1 w-full flex-col items-center justify-center h-full rounded-xl z-10 bg-white ${
            open ? "block" : "hidden"
          }`}
        >
          <AntDesign name="checkcircle" size={80} color="red" />
          <Text className="text-2xl font-bold mt-4">Continue</Text>
        </View>

        <View
          className={`absolute flex-1 w-full flex-col items-center justify-center h-full rounded-xl z-10 bg-white ${
            error ? "block" : "hidden"
          }`}
        >
          <Feather name="x-circle" size={80} color="red" />
          <Text className="text-2xl font-bold mt-4">Wrong</Text>
        </View>

        <View className="flex-row items-center ">
          <View className="border-r border-gray-500 pr-10">
            <Feather name="triangle" size={180} color="dodgerblue" />
          </View>

          <TouchableOpacity onPress={errorHandler}>
            <View className="ml-20">
              <FontAwesome name="circle" size={180} color="orange" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleTrue}>
            <View className="ml-20">
              <Ionicons name="ios-triangle-sharp" size={180} color="blue" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MatchShapeScreen;
