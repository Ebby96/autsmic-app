import { View, Pressable, SafeAreaView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Login type parent or child screen


const LoginTypeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-[#131111]">
      <View className="flex-row justify-center">
        <Image source={require("../assets/logo.png")} className="w-28 h-28" />
      </View>
      <View className="flex-row justify-between items-end">
        <Pressable onPress={() => navigation.navigate("Parents")}>
          <Image source={require("../assets/ParentsLogin.png")} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Child")}>
          <Image
            source={require("../assets/ChildLogin.png")}
            className="mb-2"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginTypeScreen;
