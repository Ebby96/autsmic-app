import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import { useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import { useContextValue } from "../../context";
import BackButton from "../../components/BackButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Question 7
const DSeven = () => {
  const {
    answers,
    setAnswers,
    setProgress,
    reFetchStorage,
    setQuestionsCompleted,
    user,
  } = useContextValue();
  const [choose, setChoose] = useState(false);

  const handleNext = async (val) => {
    setChoose(val);
    setAnswers({ ...answers, QSeven: val });
    AsyncStorage.setItem(user.email, "true");
    // setQuestionsCompleted("true");
    setProgress((prev) => prev + 1);
    reFetchStorage();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#131111] flex-col items-center">
      <BackButton />
      <ProgressBar />
      <Image
        source={require("../../assets/Question6Sticker.png")}
        className="w-full mt-6"
      />
      <View className="mt-4 w-full">
        <Text className="text-white text-center text-4xl font-semibold mx-8 py-5 tracking-wide">
          Is your child able to respond on your instructions ?
        </Text>

        <View className="flex-row justify-between mx-10 mt-40">
          <Pressable onPress={() => handleNext(true)}>
            <View
              className={`py-4 px-8 rounded-3xl ${
                answers.QSeven === true ? "bg-blue-500" : "bg-white"
              }`}
            >
              <Text
                className={`${
                  answers.QSeven === true ? "text-white" : "text-black"
                } font-bold`}
              >
                Yes
              </Text>
            </View>
          </Pressable>

          <Pressable onPress={() => handleNext(false)}>
            <View
              className={`py-4 px-8 rounded-3xl ${
                answers.QSeven === false ? "bg-blue-500" : "bg-white"
              }`}
            >
              <Text
                className={`${
                  answers.QSeven === false ? "text-white" : "text-black"
                } font-bold`}
              >
                No
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DSeven;
