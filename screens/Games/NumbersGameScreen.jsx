import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useContextValue } from "../../context";

//Number Game 

const NumbersGameScreen = () => {
  const [answer, setAnswer] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useContextValue();
  const navigation = useNavigation();
  const handleBack = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    navigation.navigate("Parents");
  };
  const startTime = useMemo(() => new Date(), []);
  useEffect(() => {
    if (answer === null || answer === "") return;
    const endTime = new Date();
    if (Number(answer) === 2) {
      let takenTime = ((endTime - startTime) / 1000).toFixed();
      setOpen(true);
      const setGameScore = async () => {
        await setDoc(
          doc(db, "games", `${user.uid}`),
          {
            answerStateNumbers: "Answered",
            timeToSolveNumbers: `${takenTime} Seconds`,
            numbersDate: new Date().toISOString(),
            scoreNumbers:2
          },
          { merge: true }
        );
      };
      setGameScore();
    } else {
      setError(true);
      setInterval(() => {
        setError(false);
      }, 1000);
      let takenTime = ((endTime - startTime) / 1000).toFixed();
      const setGameScore = async () => {
        await setDoc(
          doc(db, "games", `${user.uid}`),
          {
            answerStateNumbers: "Failed",
            timeToSolveNumbers: `${takenTime} Seconds`,
            numbersDate: new Date().toISOString(),
            scoreNumbers:0
          },
          { merge: true }
        );
      };
      setGameScore();
    }
  }, [answer]);

  return (
    <SafeAreaView className="bg-[#131111] flex-1">
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View className="flex-row items-center p-4 w-full border-b border-gray-400">
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={30} color="white" />
          </Pressable>
          <Text className="ml-4 text-white font-bold text-3xl flex-1">
            Number Game
          </Text>
          <TouchableOpacity
            className="bg-gray-500 px-10 py-3 rounded-3xl"
            onPress={handleBack}
          >
            <Text className="text-white font-bold text-lg">Parents</Text>
          </TouchableOpacity>
        </View>

        <View className="justify-center items-center">
          <View className="bg-white flex-row items-center mt-10 w-11/12 rounded-2xl h-32 relative">
            <View
              className={`w-full h-full top-0 left-0  p-4 rounded-xl bg-white absolute z-10 ${
                open ? "block" : "hidden"
              }`}
            >
              <View className="items-center justify-center">
                <Ionicons name="md-checkmark-circle" size={80} color="red" />
                <Text className="text-2xl font-bold">Continue</Text>
              </View>
            </View>
            <View
              className={`w-full h-full top-0 left-0  p-4 rounded-xl bg-white absolute z-10 ${
                error ? "block" : "hidden"
              }`}
            >
              <View className="items-center justify-center">
                <Feather name="x-circle" size={80} color="red" />
                <Text className="text-2xl font-bold">Error</Text>
              </View>
            </View>
            <Text className="text-8xl ml-16 font-bold">3</Text>
            <Text className="text-8xl ml-16 font-bold">-</Text>
            <Text className="text-8xl ml-16 font-bold">1</Text>
            <Text className="text-8xl ml-16 font-bold text-blue-500">=</Text>
            <TextInput
              keyboardType="numeric"
              value={answer}
              className="flex-1 text-6xl ml-8 font-bold h-32"
              onChangeText={(val) => setAnswer(val)}
            />
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default NumbersGameScreen;
