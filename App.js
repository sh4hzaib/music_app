import React from "react";
import Dashboard from "./src/screens/Dashboard";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Daily Diary" component={Dashboard} />
        {/* <Stack.Screen name="Tracks" component={Tracks} /> */}
        {/* <Stack.Screen name="ColorPalette" component={ColorPalette} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
