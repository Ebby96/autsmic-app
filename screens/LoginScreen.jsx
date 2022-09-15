import { Text, SafeAreaView, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import { useContextValue } from "../context";

WebBrowser.maybeCompleteAuthSession();

const useProxy = true;
const redirectUri = AuthSession.makeRedirectUri({
  useProxy,
});
// Login screen via fb,gmail, email

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUser, setIsAuth } = useContextValue();
  const facebookID = "482888733659979";
  const clientID =
    "143756700599-nc1cv38uohentk4o2klbp51c6ld2adt4.apps.googleusercontent.com";
  const [token, setToken] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: clientID,
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });

  const [requestFacebook, responseFacebook, promptAsyncFacebook] =
    Facebook.useAuthRequest({
      clientId: facebookID,
      responseType: ResponseType.Code,
      redirectUri,
    });

  const fetchUserDataGoogle = async () => {
    let res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response?.authentication?.accessToken);
      token && fetchUserDataGoogle();
      setIsAuth(true);
    }
    if (responseFacebook?.type === "success") {
      setIsAuth(true);
    }
  }, [response, token, responseFacebook]);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#131111]">
      <Text className="text-5xl mb-12 text-white font-semibold">
        Welcome to autismic
      </Text>

      <Pressable onPress={() => promptAsyncFacebook()}>
        <View className="w-11/12 my-3 bg-[#4285f4] rounded-2xl p-2 flex-row items-center">
          <View className="px-3">
            <FontAwesome5 name="facebook" size={35} color="#0267e9" />
          </View>
          <Text className="text-2xl text-white text-center flex-1">
            Continue with facebook
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={() => promptAsync()}>
        <View className="w-11/12 my-3 bg-[#db4437] rounded-2xl p-2 flex-row items-center">
          <View className="px-3">
            <AntDesign name="googleplus" size={35} color="white" />
          </View>
          <Text className="text-2xl text-white text-center flex-1">
            Continue with Google+
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Email")}>
        <View className="w-11/12 my-3 bg-[#898f9c] rounded-2xl p-2 flex-row items-center">
          <View className="px-3">
            <MaterialCommunityIcons name="email" size={35} color="black" />
          </View>
          <Text className="text-2xl text-white text-center flex-1">
            Continue with Email
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default LoginScreen;
