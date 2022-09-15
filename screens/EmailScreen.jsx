import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContextValue } from "../context";
import * as yup from "yup";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { db } from "../firebase";

//email loginscreen

const signUpSchema = yup.object({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
});

const SignInSchema = yup.object({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

const EmailScreen = () => {
  const navigation = useNavigation();
  const { setUserId, setUser, user } = useContextValue();
  const [signUp, setSignUp] = useState(true);
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-[#131111]">
      <Pressable onPress={Keyboard.dismiss} className="flex-1">
        <View className="border-b border-gray-300 py-3 flex-row items-center">
          <Pressable onPress={() => navigation.goBack()}>
            <View className="ml-3">
              <Feather name="arrow-left-circle" size={24} color="white" />
            </View>
          </Pressable>
          <Text className="text-white text-2xl flex-1 text-center">
            {signUp ? "Register" : "Login"} with E-mail
          </Text>
        </View>

        {signUp ? (
          <Formik
            initialValues={{ email, password, confirmPassword }}
            validationSchema={signUpSchema}
            onSubmit={(values, actions) => {
              setEmail(values.email);
              setPassword(values.password);
              setConfirmPassword(values.confirmPassword);
              createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
              )
                .then(async (data) => {
                  // await AsyncStorage.setItem("user", "email");
                  setUserId("email");
                  setUserId(data.user);
                })
                .catch((err) => console.warn(err));
              actions.resetForm();
            }}
          >
            {(props) => (
              <View className="mt-2">
                <Text className="text-xl text-blue-400 font-semibold mb-2">
                  E-mail
                </Text>
                <TextInput
                  className="bg-white flex-1 mr-3 h-10 px-2 rounded-2xl"
                  placeholder="E-mail"
                  placeholderTextColor={"gray"}
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                  onBlur={props.handleBlur("email")}
                />
                <Text className="text-red-500 text-base ml-2">
                  {props.touched.email &&
                    props.errors.email !== undefined &&
                    "*" + props.errors.email}
                </Text>
                <Text className="text-xl text-blue-400 font-semibold mb-2">
                  Enter Password
                </Text>
                <TextInput
                  className="bg-white flex-1 mr-3 h-10 px-2 rounded-2xl"
                  placeholderTextColor={"gray"}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  secureTextEntry
                  onBlur={props.handleBlur("password")}
                />
                <Text className="text-red-500 text-base ml-2">
                  {props.touched.password && props.errors.password}
                </Text>
                <Text className="text-xl text-blue-400 font-semibold mb-2">
                  Re-enter Password
                </Text>
                <TextInput
                  className="bg-white flex-1 mr-3 h-10 px-2 rounded-2xl"
                  placeholderTextColor={"gray"}
                  secureTextEntry
                  onChangeText={props.handleChange("confirmPassword")}
                  value={props.values.confirmPassword}
                  onBlur={props.handleBlur("confirmPassword")}
                />
                <Text className="text-red-500 text-base ml-2">
                  {props.touched.confirmPassword &&
                    props.errors.confirmPassword}
                </Text>
                <View className="w-full ml-14 mt-5">
                  <Pressable onPress={props.handleSubmit}>
                    <View className="w-3/4 bg-blue-500 flex-row justify-between items-center p-3 rounded-3xl">
                      <Text className="text-white text-2xl font-semibold pl-10">
                        Continue
                      </Text>
                      <Feather
                        name="arrow-right-circle"
                        size={24}
                        color="white"
                      />
                    </View>
                  </Pressable>
                </View>
              </View>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{ email, password }}
            validationSchema={SignInSchema}
            onSubmit={(values, actions) => {
              setEmail(values.email);
              setPassword(values.password);
              signInWithEmailAndPassword(auth, values.email, values.password)
                .then((data) => {
                  // AsyncStorage.setItem("user", "email");
                  setUserId("email");
                  setUser(data.user);
                })
                .catch((err) => console.warn(err));
              actions.resetForm();
            }}
          >
            {(props) => (
              <View className="mt-2">
                <Text className="text-xl text-blue-400 font-semibold mb-2">
                  E-mail
                </Text>
                <TextInput
                  className="bg-white flex-1 mr-3 h-10 px-2 rounded-2xl"
                  placeholder="E-mail"
                  placeholderTextColor={"gray"}
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                  onBlur={props.handleBlur("email")}
                />
                <Text className="text-red-500 text-base ml-2">
                  {props.touched.email &&
                    props.errors.email !== undefined &&
                    "*" + props.errors.email}
                </Text>
                <Text className="text-xl text-blue-400 font-semibold mb-2">
                  Enter Password
                </Text>
                <TextInput
                  className="bg-white flex-1 mr-3 h-10 px-2 rounded-2xl"
                  placeholderTextColor={"gray"}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  secureTextEntry
                  onBlur={props.handleBlur("password")}
                />
                <Text className="text-red-500 text-base ml-2">
                  {props.touched.password && props.errors.password}
                </Text>

                <View className="w-full ml-14 mt-5">
                  <Pressable onPress={props.handleSubmit}>
                    <View className="w-3/4 bg-blue-500 flex-row justify-between items-center p-3 rounded-3xl">
                      <Text className="text-white text-2xl font-semibold pl-10">
                        Continue
                      </Text>
                      <Feather
                        name="arrow-right-circle"
                        size={24}
                        color="white"
                      />
                    </View>
                  </Pressable>
                </View>
              </View>
            )}
          </Formik>
        )}
        <View className="w-full ml-14 mt-5">
          {signUp ? (
            <Pressable onPress={() => setSignUp(false)}>
              <View className="w-3/4 bg-white flex-row justify-between items-center p-3 rounded-3xl">
                <Text className="text-blue-500 text-2xl font-semibold pl-10">
                  Login
                </Text>
                <Feather
                  name="arrow-right-circle"
                  size={24}
                  color="dodgerblue"
                />
              </View>
            </Pressable>
          ) : (
            <Pressable onPress={() => setSignUp(true)}>
              <View className="w-3/4 bg-white flex-row justify-between items-center p-3 rounded-3xl">
                <Text className="text-blue-500 text-2xl font-semibold pl-10">
                  Register
                </Text>
                <Feather
                  name="arrow-right-circle"
                  size={24}
                  color="dodgerblue"
                />
              </View>
            </Pressable>
          )}
        </View>

        <View className="w-full ml-14 mt-5"></View>
      </Pressable>
    </SafeAreaView>
  );
};

export default EmailScreen;
