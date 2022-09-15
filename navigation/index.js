import LoginScreen from "../screens/LoginScreen";
import EmailScreen from "../screens/EmailScreen";
import Home from "../screens/Home";
import AgeSelectorScreen from "../screens/AgeSelectorScreen";
import SpeechLevelScreen from "../screens/SpeechLevelScreen";
import Q1Screen from "../screens/Questions/Q1Screen";
import Q2Screen from "../screens/Questions/Q2Screen";
import Q3Screen from "../screens/Questions/Q3Screen";
import Q4Screen from "../screens/Questions/Q4Screen";
import Q5Screen from "../screens/Questions/Q5Screen";
import Q6Screen from "../screens/Questions/Q6Screen";
import Q7Screen from "../screens/Questions/Q7Screen";
import { useContextValue } from "../context";
import DoctorExamineScreen from "../screens/DoctorExamineScreen";
import LoginTypeScreen from "../screens/LoginTypeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ParentsScreen from "../screens/ParentsScreen";
import ChildScreen from "../screens/ChildScreen";
import NumbersGameScreen from "../screens/Games/NumbersGameScreen";
import SolvePuzzleScreen from "../screens/Games/SolvePuzzleScreen";
import StoryTime from "../screens/Games/StoryTime";
import MatchShapeScreen from "../screens/Games/MatchShapeScreen";
import DailyTaskScreen from "../screens/Games/DailyTaskScreen";
import FindItemScreen from "../screens/Games/FindItemScreen";
import CompleteHistoryScreen from "../screens/CompleteHistoryScreen";
import StoryItemScreen from "../screens/StoryItemScreen";
import DoctorsListScreen from "../screens/Doctor/DoctorsListScreen";
import DoctorDetailsScreen from "../screens/Doctor/DoctorDetailsScreen";
import DoctorReviews from "../screens/Doctor/DoctorReviews";
import DoctorChat from "../screens/Doctor/DoctorChat";


//All the navigational screens
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="LoginType" component={LoginTypeScreen} />
      <Stack.Screen name="Parents" component={ParentsScreen} />
      <Stack.Screen name="Child" component={ChildScreen} />
      <Stack.Screen name="Complete" component={CompleteHistoryScreen} />
      <Stack.Screen name="Numbers" component={NumbersGameScreen} />
      <Stack.Screen name="Puzzle" component={SolvePuzzleScreen} />
      <Stack.Screen name="Story" component={StoryTime} />
      <Stack.Screen name="Daily" component={DailyTaskScreen} />
      <Stack.Screen name="Shape" component={MatchShapeScreen} />
      <Stack.Screen name="Item" component={FindItemScreen} />
      <Stack.Screen name="StoryPage" component={StoryItemScreen} />
      <Stack.Screen name="Doctors" component={DoctorsListScreen} />
      <Stack.Screen name="DoctorScreen" component={DoctorDetailsScreen} />
      <Stack.Screen options={{presentation:'modal'}} name="DoctorChat" component={DoctorChat} />
      <Stack.Screen options={{presentation:'modal'}} name="DoctorReviews" component={DoctorReviews} />
    </Stack.Navigator>
  );
};

const QuestionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AgeSelector" component={AgeSelectorScreen} />
      <Stack.Screen name="SpeechLevel" component={SpeechLevelScreen} />
      <Stack.Screen name="DoctorExamine" component={DoctorExamineScreen} />
      <Stack.Screen name="QOne" component={Q1Screen} />
      <Stack.Screen name="QTwo" component={Q2Screen} />
      <Stack.Screen name="QThree" component={Q3Screen} />
      <Stack.Screen name="QFour" component={Q4Screen} />
      <Stack.Screen name="QFive" component={Q5Screen} />
      <Stack.Screen name="QSex" component={Q6Screen} />
      <Stack.Screen name="QSeven" component={Q7Screen} />
    </Stack.Navigator>
  );
};

const NavigationStack = () => {
  const { userId, QuestionsCompleted } = useContextValue();

  return (
    <>
      {userId !== "email" ? (
        <AuthStack />
      ) : QuestionsCompleted === "true" ? (
        <MainStack />
      ) : (
        <QuestionStack />
      )}
    </>
  );
};

export default NavigationStack;
