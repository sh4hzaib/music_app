import React from "react";
import Dashboard from "./src/screens/Dashboard";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddDiary from "./src/screens/AddDiary";
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Daily Diary" component={Dashboard} />
        <Stack.Screen name="Add New Diary" component={AddDiary} />
        {/* <Stack.Screen name="ColorPalette" component={ColorPalette} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
