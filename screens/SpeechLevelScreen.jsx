import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import ProgressBar from "../components/ProgressBar";
import { useContextValue } from "../context";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";

//Speech level of your child screen

const SpeechLevelScreen = () => {
  const [choose, setChoose] = useState(1);
  const { answers, setAnswers, setProgress } = useContextValue();
  const navigation = useNavigation();
  const handleNext = () => {
    setAnswers({ ...answers, speechLevel: choose });
    setProgress((prev) => prev + 1);
    navigation.navigate("DoctorExamine");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#131111] flex-col items-center">
      <BackButton />
      <ProgressBar />
      <Image
        source={require("../assets/speechlevelSticker.png")}
        className="w-64 h-64 mt-6"
      />
      <View className="mt-4 w-full border-t border-gray-300">
        <Text className="text-white text-center text-4xl font-bold py-5 tracking-wide">
          Speech level
        </Text>

        <Pressable onPress={() => setChoose(1)}>
          <View className="border-t border-gray-300 py-3 flex-row justify-between mx-3">
            <Text className="text-white text-center mr-4  text-lg tracking-wide">
              Nonverbal
            </Text>
            {choose === 1 && (
              <AntDesign name="check" size={24} color="dodgerblue" />
            )}
          </View>
        </Pressable>

        <Pressable onPress={() => setChoose(2)}>
          <View className="border-t border-gray-300 py-3 flex-row justify-between mx-3">
            <Text className="text-white text-center mr-4  text-lg tracking-wide">
              Verbal
            </Text>
            {choose === 2 && (
              <AntDesign name="check" size={24} color="dodgerblue" />
            )}
          </View>
        </Pressable>

        <Pressable onPress={() => setChoose(3)}>
          <View className="border-t border-gray-300 py-3 flex-row justify-between mx-3">
            <Text className="text-white text-center mr-4  text-lg tracking-wide">
              Cannot speak but understand words
            </Text>
            {choose === 3 && (
              <AntDesign name="check" size={24} color="dodgerblue" />
            )}
          </View>
        </Pressable>

        <Pressable onPress={() => setChoose(4)}>
          <View className="border-t border-gray-300 py-3 flex-row justify-between mx-3">
            <Text className="text-white text-center mr-4  text-lg tracking-wide">
              Can speak but not everyone understand words
            </Text>
            {choose === 4 && (
              <AntDesign name="check" size={24} color="dodgerblue" />
            )}
          </View>
        </Pressable>

        <Pressable
          onPress={handleNext}
          className="flex-row justify-center pt-16"
        >
          <View
            className={`w-3/4 ${
              answers.speechLevel ? "bg-blue-500" : "bg-white"
            } flex-row justify-between items-center p-3 rounded-3xl`}
          >
            <Text
              className={`${
                answers.speechLevel ? "text-white" : "text-black"
              } text-2xl font-semibold pl-10`}
            >
              Continue
            </Text>
            <Feather
              name="arrow-right-circle"
              size={24}
              color={answers.speechLevel ? "white" : "black"}
            />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SpeechLevelScreen;
