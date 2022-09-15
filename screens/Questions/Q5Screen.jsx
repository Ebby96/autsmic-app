import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import { useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import { useContextValue } from "../../context";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/BackButton";
//Question 5
const QFive = () => {
  const { answers, setAnswers, setProgress } = useContextValue();
  const [choose, setChoose] = useState(false);
  const navigation = useNavigation();
  const handleNext = (val) => {
    setChoose(val);
    setAnswers({ ...answers, QFive: val });
    setProgress((prev) => prev + 1);
    navigation.navigate("QSex");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#131111] flex-col items-center">
      <BackButton />
      <ProgressBar />
      <Image
        source={require("../../assets/Question5Sticker.png")}
        className="w-full mt-6"
      />
      <View className="mt-4 w-full border-t border-gray-300">
        <Text className="text-white text-center text-4xl font-semibold mx-8 py-5 tracking-wide">
          Does your child can figure out sane vs different ?
        </Text>

        <View className="flex-row justify-between mx-10 mt-40">
          <Pressable onPress={() => handleNext(true)}>
            <View
              className={`py-4 px-8 rounded-3xl ${
                answers.QFive === true ? "bg-blue-500" : "bg-white"
              }`}
            >
              <Text
                className={`${
                  answers.QFive === true ? "text-white" : "text-black"
                } font-bold`}
              >
                Yes
              </Text>
            </View>
          </Pressable>

          <Pressable onPress={() => handleNext(false)}>
            <View
              className={`py-4 px-8 rounded-3xl ${
                answers.QFive === false ? "bg-blue-500" : "bg-white"
              }`}
            >
              <Text
                className={`${
                  answers.QFive === false ? "text-white" : "text-black"
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

export default QFive;
