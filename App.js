import React from "react";
import Dashboard from "./src/screens/Dashboard";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddDiary from "./src/screens/AddDiary";
import ViewDiary from "./src/screens/ViewDiary";
import { Provider } from "react-redux";
import dataStore from "./datastore";
const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={dataStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Add New Diary" component={AddDiary} />
          <Stack.Screen name="ViewDiary" component={ViewDiary} />
          {/* <Stack.Screen name="ColorPalette" component={ColorPalette} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
