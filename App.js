import { NavigationContainer } from "@react-navigation/native";
import { ContextProvider } from "./context";
import { StatusBar } from "expo-status-bar";
import { TailwindProvider } from "tailwindcss-react-native";
import NavigationStack from "./navigation/index";

export default function App() {
  return (
    <TailwindProvider>
      <ContextProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </ContextProvider>
    </TailwindProvider>
  );
}
