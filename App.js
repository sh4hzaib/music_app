import React from "react";
import Dashboard from "./src/screens/Dashboard";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddDiary from "./src/screens/AddDiary";
import ViewDiary from "./src/screens/ViewDiary";
import Signup from "./src/screens/Signup";
import Signin from "./src/screens/Signin";
// Initializing stack navigator to navigate between the screens
const Stack = createStackNavigator();
export default function App() {
  return (
    // our navigation container is here where we can navigate between screens
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Add New Diary" component={AddDiary} />
        <Stack.Screen name="ViewDiary" component={ViewDiary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
