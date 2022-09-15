import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { useNavigation } from "@react-navigation/native";
import { useContextValue } from "../context";
//Select child age page
const AgeSelectorScreen = () => {
  const { setAnswers, answers, setProgress } = useContextValue();
  const [selectedYears, setSelectedYears] = useState();
  const navigation = useNavigation();
  const handleNext = () => {
    setAnswers({ ...answers, years: selectedYears });
    setProgress((prev) => prev + 1);
    navigation.navigate("SpeechLevel");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#131111] flex-col items-center">
      <ProgressBar />
      <Image
        source={require("../assets/AgeSelectorSticker.png")}
        className="w-64 h-64 mt-6"
      />
      <View className="mt-4 w-full border-t border-gray-300">
        <Text className="text-white text-center text-4xl font-bold py-5 tracking-wide">
          Select your child's age
        </Text>
        <View className="border-t border-gray-300 pt-3">
          <Text className="text-white text-center mx-6 font-semibold text-lg tracking-wide">
            Age selection will personalize
          </Text>
          <Text className="text-white text-center mx-6 font-semibold text-lg tracking-wide">
            app experience
          </Text>
        </View>

        <Picker
          selectedValue={selectedYears}
          itemStyle={{ color: "white" }}
          onValueChange={(itemValue) => setSelectedYears(itemValue)}
        >
          <Picker.Item label="0-1 years" value="0-1" />
          <Picker.Item label="1-2 years" value="1-2" />
          <Picker.Item label="2-3 years" value="2-3" />
          <Picker.Item label="3-4 years" value="3-4" />
          <Picker.Item label="4-5 years" value="4-5" />
          <Picker.Item label="5-6 years" value="5-6" />
          <Picker.Item label="6-7 years" value="6-7" />
          <Picker.Item label="7-8 years" value="7-8" />
          <Picker.Item label="8-9 years" value="8-9" />
        </Picker>

        <Pressable
          onPress={handleNext}
          className="flex-row justify-center pt-16"
        >
          <View
            className={`w-3/4 ${
              answers.years ? "bg-blue-500" : "bg-white"
            } flex-row justify-between items-center p-3 rounded-3xl`}
          >
            <Text
              className={`${
                answers.years ? "text-white" : "black"
              } text-2xl font-semibold pl-10`}
            >
              Continue
            </Text>
            <Feather
              name="arrow-right-circle"
              size={24}
              color={`${answers.years ? "white" : "black"}`}
            />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AgeSelectorScreen;
