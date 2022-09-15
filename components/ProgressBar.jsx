import { View } from "react-native";
import React from "react";
import { useContextValue } from "../context";
//progressBar on question screens
const ProgressBar = () => {
  const { progress } = useContextValue();
  const progressValue = ((progress / 9) * 100).toFixed();
  
  return (
    <View className="w-40 rounded-lg h-2 mt-6 overflow-hidden border border-blue-500">
      <View
        style={{ width: `${progressValue}%` }}
        className="bg-blue-500 h-2 rounded-lg"
      ></View>
    </View>
  );
};

export default ProgressBar;
