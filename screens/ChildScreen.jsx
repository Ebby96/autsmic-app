import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useContextValue } from "../context";


//Child login

const ChildScreen = () => {
  const { user } = useContextValue();
  const navigation = useNavigation();
  const newDate = new Date();
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
    const setDate = `${newDate.getMonth() + "-" + newDate.getDate()}`;
    const addActivity = async () => {
      const data = await setDoc(
        doc(db, "child", `${user.uid}`),
        {
          [newDate.getMonth() + "-" + newDate.getDate()]: setDate,
        },
        { merge: true }
      );
    };
    addActivity();
  }, []);
  const handleBack = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    navigation.replace("Parents");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#131111]">
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-white text-3xl font-bold">Let's Start</Text>
        <TouchableOpacity
          className="bg-gray-500 px-12 py-4 rounded-3xl"
          onPress={handleBack}
        >
          <Text className="text-white font-bold text-lg">Parents</Text>
        </TouchableOpacity>
      </View>

      <View className="m-4 flex-row justify-between mt-20">
        <Pressable onPress={() => navigation.navigate("Numbers")}>
          <Image
            source={require("../assets/NumbersGame.png")}
            className="w-32 h-36 mx-1 rounded-2xl"
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Puzzle")}>
          <Image
            source={require("../assets/SolvePuzzle.png")}
            className="w-32 h-36 mx-1 rounded-2xl"
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Story")}>
          <Image
            source={require("../assets/StoryTime.png")}
            className="w-32 h-36 mx-1 rounded-2xl"
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Shape")}>
          <Image
            source={require("../assets/MatchShape.png")}
            className="w-32 h-36 mx-1 rounded-2xl"
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Daily")}>
          <Image
            source={require("../assets/DailyTask.png")}
            className="w-32 h-36 mx-1 rounded-2xl"
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Item")}>
          <Image
            source={require("../assets/FindItem.png")}
            className="w-32 h-36 mx-1 rounded-2xl"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ChildScreen;
