import {
  View,
  ActivityIndicator,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { Feather } from "@expo/vector-icons";
import { PicturePuzzle } from "react-native-picture-puzzle";

//Solve the puzzle game

const SolvePuzzleScreen = () => {
  const navigation = useNavigation();
  const [hidden, setHidden] = useState(0); // piece to obscure
  const [pieces, setPieces] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const source = useMemo(
    () => ({
      uri: "http://bitly.ws/tIav",
    }),
    []
  );
  const renderLoading = useCallback(() => <ActivityIndicator />, []);
  const onChange = useCallback(
    (nextPieces, nextHidden) => {
      setPieces([...nextPieces]);
      setHidden(nextHidden);
    },
    [setPieces, setHidden]
  );
  const handleBack = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    navigation.navigate("Parents");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#131111]">
      <View className="flex-row items-center p-4 w-full border-b border-gray-400">
        <Pressable onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={30} color="white" />
        </Pressable>
        <Text className="ml-4 text-white font-bold text-3xl flex-1">
          Solve Puzzle
        </Text>
        <TouchableOpacity
          className="bg-gray-500 px-10 py-3 rounded-3xl"
          onPress={handleBack}
        >
          <Text className="text-white font-bold text-lg">Parents</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between">
        <PicturePuzzle
          size={300}
          pieces={pieces}
          hidden={hidden}
          onChange={onChange}
          source={source}
          renderLoading={renderLoading}
        />
        <Image source={{ uri: "http://bitly.ws/tIav" }} className="w-64" />
      </View>
    </SafeAreaView>
  );
};

export default SolvePuzzleScreen;
