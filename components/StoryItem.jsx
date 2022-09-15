import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
//storytime card component
const StoryItem = () => {
  const story ="One hot day, a thirsty crow flew all over the  fields looking for water. For a long time, he could not find any. He felt very weak, almost lost all hope. Suddenly, he saw a water jug below the tree. He flew straight down to see if there was any water inside. Yes, he could see some water inside the jug!"  
  const navigation = useNavigation();
  
  return (
    <Pressable onPress={()=>{
      navigation.navigate('StoryPage',{story});
    }}>
      <View className="bg-white rounded-xl p-2 w-44 mx-2 items-center">
        <Text className="text-2xl text-center font-bold py-5">
          Thirsty Cow
        </Text>
        <MaterialCommunityIcons name="cow" size={165} color="black" />
      </View>
    </Pressable>

  );
};

export default StoryItem;
