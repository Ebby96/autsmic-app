import { View, Text, SafeAreaView, Pressable, FlatList } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useContextValue } from "../context";
import { AntDesign } from "@expo/vector-icons";
import { format } from "timeago.js";

//Child's complete history screen

const CompleteHistoryScreen = () => {
  const { user } = useContextValue();
  const [loggedDays, setLoggedDays] = useState([]);
  const navigation = useNavigation();
  const {
    params: { gamesState },
  } = useRoute();
  // console.log(gamesState);
  // console.log(loggedDays.sort((a,b)=>b-a));
  const data = useMemo(() => [...loggedDays].slice(0, 7), [loggedDays]);
  useEffect(() => {
    let unsubscribe = false;
    const fetchData = async () => {
      const res = await getDoc(doc(db, "child", `${user.uid}`));
      setLoggedDays(Object.values(res.data()));
      // console.log(Object.values(res.data()));
    };

    if (!unsubscribe) fetchData();

    return () => {
      unsubscribe = true;
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#131111]">
      <View className="relative w-full">
        <View className="w-full">
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={30} color="white" />
          </Pressable>
        </View>

        <Text className="text-white text-center text-2xl mt-3 font-semibold">
          Your child last Activity
        </Text>
      </View>

      <View className="w-full h-32 bg-white rounded-xl mt-4">
        <Text className="text-lg text-center font-semibold underline">
          Logged Days
        </Text>
        {data !== null ? (
          <FlatList
            data={data}
            style={{ marginHorizontal: 20, marginTop: 30 }}
            keyExtractor={(item) => item}
            horizontal
            renderItem={({ item }) => {
              return (
                <View className="rounded-full mx-1  border-2 border-blue-500 h-12 w-12 items-center justify-center">
                  <Text className="text-lg">{item}</Text>
                  <AntDesign name="checkcircle" size={20} color="green" />
                </View>
              );
            }}
          />
        ) : (
          <Text>Sorry your child didn't login yet.</Text>
        )}
      </View>

      {gamesState !== null && (
        <>
          <View className="w-full">
            <Text className="text-white text-3xl text-center mt-4">
              Numbers Game
            </Text>
            <View className="flex-row items-center justify-evenly mt-4">
              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Answered</Text>
                {gamesState?.answerStateNumbers === "Answered" ? (
                  <AntDesign name="checkcircle" size={20} color="green" />
                ) : (
                  <Feather name="x-circle" size={24} color="red" />
                )}
              </View>

              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Time Taken To solve</Text>
                <Text className="text-white">
                  {gamesState?.timeToSolveNumbers}
                </Text>
              </View>

              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Score</Text>
                <Text className="text-white">
                  {gamesState?.scoreNumbers}
                </Text>
              </View>

              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Last Answer At</Text>
                <Text className="text-white">
                  {format(gamesState?.numbersDate)}
                </Text>
              </View>

            </View>
          </View>

          <View className="w-full">
            <Text className="text-white text-3xl text-center mt-4">
              Match Game
            </Text>
            <View className="flex-row items-center justify-evenly mt-4">
              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Answered</Text>
                {gamesState?.answerStateMatch === "Answered" ? (
                  <AntDesign name="checkcircle" size={20} color="green" />
                ) : (
                  <Feather name="x-circle" size={24} color="red" />
                )}
              </View>

              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Time Taken To solve</Text>
                <Text className="text-white">
                  {gamesState?.timeToSolveMatch}
                </Text>
              </View>

              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Score</Text>
                <Text className="text-white">
                  {gamesState?.scoreMatch}
                </Text>
              </View>

              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Last Answer At</Text>
                <Text className="text-white">
                  {format(gamesState?.matchDate)}
                </Text>
              </View>
            </View>
          </View>

          <View className="w-full">
            <Text className="text-white text-3xl text-center mt-4">
              Find Item Game
            </Text>
            <View className="flex-row items-center justify-evenly mt-4">
              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Answered</Text>
                {gamesState?.answerStateFind === "Answered" ? (
                  <AntDesign name="checkcircle" size={20} color="green" />
                ) : (
                  <Feather name="x-circle" size={24} color="red" />
                )}
              </View>

              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Time Taken To solve</Text>
                <Text className="text-white">
                  {gamesState?.timeToSolveFind}
                </Text>
              </View>

              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Score</Text>
                <Text className="text-white">
                  {gamesState?.scoreFind}
                </Text>
              </View>

              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Last Answer At</Text>
                <Text className="text-white">
                  {format(gamesState?.findDate)}
                </Text>
              </View>
            </View>
          </View>

          <View className="w-full">
            <Text className="text-white text-3xl text-center mt-4">
              Daily Task Game
            </Text>
            <View className="flex-row items-center justify-evenly mt-4">
              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Answered</Text>
                {gamesState?.answerStateDaily === "Answered" ? (
                  <AntDesign name="checkcircle" size={20} color="green" />
                ) : (
                  <Feather name="x-circle" size={24} color="red" />
                )}
              </View>

              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Time Taken To solve</Text>
                <Text className="text-white">
                  {gamesState?.timeToSolveDaily}
                </Text>
              </View>

              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Score</Text>
                <Text className="text-white">
                  {gamesState?.scoreDaily}
                </Text>
              </View>

              <View className="items-center justify-center space-y-2 mt-2">
                <Text className="text-white">Last Answer At</Text>
                <Text className="text-white">
                  {format(gamesState?.dailyDate)}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CompleteHistoryScreen;
