import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useMemo, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useContextValue } from "../../context";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

//Find the item game

const FindItemScreen = () => {
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const { user } = useContextValue();
  const startTime = useMemo(() => new Date(), []);
  const handleBack = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    navigation.navigate("Parents");
  };
  const handleError = () => {
    setError(true);
    setInterval(() => {
      setError(false);
    }, 1000);

    const endTime = new Date();
    const takenTime = ((endTime - startTime) / 1000).toFixed();
    const setGameScore = async () => {
      await setDoc(
        doc(db, "games", `${user.uid}`),
        {
          answerStateFind: "Failed",
          timeToSolveFind: `${takenTime} Seconds`,
          findDate: new Date().toISOString(),
          scoreFind:0
        },
        { merge: true }
      );
    };
    setGameScore();
  };

  const handleAnswer = () => {
    setAnswer(true);
    const endTime = new Date();
    const takenTime = ((endTime - startTime) / 1000).toFixed();
    const setGameScore = async () => {
      await setDoc(
        doc(db, "games", `${user.uid}`),
        {
          answerStateFind: "Answered",
          timeToSolveFind: `${takenTime} Seconds`,
          findDate: new Date().toISOString(),
          scoreFind:2
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
          Find Item
        </Text>
        <TouchableOpacity
          className="bg-gray-500 px-10 py-3 rounded-3xl"
          onPress={handleBack}
        >
          <Text className="text-white font-bold text-lg">Parents</Text>
        </TouchableOpacity>
      </View>
      <View className="items-center justify-center mt-16">
        <View className="relative w-11/12 bg-white h-44 p-4 rounded-2xl overflow-hidden">
          <Text className="text-2xl font-semibold">
            Can you find glass of water ?
          </Text>
          <View className="flex-row items-center justify-around">
            <Pressable onPress={handleError}>
              <Image
                source={require("../../assets/spoon.png")}
                className="h-28 w-28"
              />
            </Pressable>
            <Pressable onPress={handleError}>
              <Image
                source={require("../../assets/dish.png")}
                className="h-28 w-28"
              />
            </Pressable>
            <Pressable onPress={handleAnswer}>
              <Image
                source={require("../../assets/glasswater.png")}
                className="h-28 w-28"
              />
            </Pressable>
          </View>
          <View
            className={`w-full h-full top-0 left-0 m-4 p-4 rounded-xl bg-white absolute z-10 ${
              answer ? "block" : "hidden"
            }`}
          >
            <View className="items-center justify-center">
              <AntDesign name="checkcircle" size={80} color="red" />
              <Text className="text-2xl font-bold">Continue</Text>
            </View>
          </View>
          <View
            className={`w-full h-full top-0 left-0 m-4 p-4 rounded-xl bg-white absolute z-10 ${
              error ? "block" : "hidden"
            }`}
          >
            <View className="items-center justify-center">
              <Feather name="x-circle" size={80} color="red" />
              <Text className="text-2xl font-bold">Wrong</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FindItemScreen;
