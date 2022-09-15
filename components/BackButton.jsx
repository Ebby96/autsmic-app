import { View, Text, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContextValue } from "../context";

const BackButton = () => {
  const navigation = useNavigation();
  const { setProgress } = useContextValue();

  const handleBack = () => {
    navigation.goBack();
    setProgress((prev) => prev - 1);
  };
    //back button component
  return (
    <SafeAreaView className="absolute top-16 left-3">
      <Pressable onPress={handleBack}>
        <Feather name="arrow-left-circle" size={28} color="dodgerblue" />
      </Pressable>
    </SafeAreaView>
  );
};

export default BackButton;
