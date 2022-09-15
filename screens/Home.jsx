import { View, Text, SafeAreaView, Image, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

//start test screen

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-[#131111] flex-col items-center">
      <Image
        source={require("../assets/StartTestScreenSticker.png")}
        className="w-64 h-64 mt-20"
      />
      <View className="mt-4 w-full border-t border-gray-300">
        <Text className="text-white text-center text-4xl font-bold py-6 tracking-wide">
          Start with your child's understanding ability test
        </Text>
        <Text className="text-white text-center mx-6 font-semibold text-lg tracking-wide">
          This text will help to understand how much adaptive is your child and
          what level of support they need to learn better
        </Text>
        <Pressable
          onPress={() => navigation.replace("AgeSelector")}
          className="flex-row justify-center mt-32"
        >
          <View className="w-3/4 bg-blue-500 flex-row justify-between p-3 rounded-3xl">
            <Text className="text-white text-2xl font-semibold pl-10">
              Start Now
            </Text>
            <Feather name="arrow-right-circle" size={24} color="white" />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Home;
