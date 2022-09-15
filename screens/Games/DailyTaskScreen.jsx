import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useMemo, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useContextValue } from "../../context";

//Daily task game

const DailyTaskScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const startTime = useMemo(() => new Date(), []);
  const { user } = useContextValue();
  const handleBack = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    navigation.navigate("Parents");
  };
  const handleChange = (_, selected) => {
    setSelectedDate(selected);
  };
  const handleCheck = () => {
    if (!selectedDate) return null;
    const endTime = new Date();
    if (selectedDate.getHours() === 19 && selectedDate.getMinutes() === 0) {
      setOpen(true);
      const takenTime = ((endTime - startTime) / 1000).toFixed();
      const setGameScore = async () => {
        await setDoc(
          doc(db, "games", `${user.uid}`),
          {
            answerStateDaily: "Answered",
            timeToSolveDaily: `${takenTime} Seconds`,
            dateDaily: new Date().toISOString(),
            scoreDaily:2
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
      const takenTime = ((endTime - startTime) / 1000).toFixed();
      const setGameScore = async () => {
        await setDoc(
          doc(db, "games", `${user.uid}`),
          {
            answerStateDaily: "Failed",
            timeToSolveDaily: `${takenTime} Seconds`,
            dateDaily: new Date().toISOString(),
            scoreDaily:0
          },
          { merge: true }
        );
      };
      setGameScore();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#131111]">
      <View className="flex-row items-center p-4 w-full border-b border-gray-400">
        <Pressable onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={30} color="white" />
        </Pressable>

        <Text className="ml-4 text-white font-bold text-3xl flex-1">
          Daily Task
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

        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={handleChange}
          style={{ width: 250 }}
        />

        <View className="flex-row items-center ">
          <Ionicons name="alarm-outline" size={120} color="dodgerblue" />
          <View className="mx-3">
            <Text className="text-2xl text-left">
              Your task for today is set alarm for 7:00 am
            </Text>
            <TouchableOpacity
              onPress={handleCheck}
              className="rounded-xl bg-blue-500 mt-8"
            >
              <Text className="font-bold text-xl text-center  text-white px-3">
                Click Here after it's done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DailyTaskScreen;
