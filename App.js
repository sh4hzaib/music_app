import React, { useEffect, useCallback } from "react";
import Dashboard from "./src/screens/Dashboard";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddDiary from "./src/screens/AddDiary";
import ViewDiary from "./src/screens/ViewDiary";
import Signup from "./src/screens/Signup";
import Signin from "./src/screens/Signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initializing stack navigator to navigate between the screens
const Stack = createStackNavigator();
export default function App() {
  const setDefaultData = useCallback(async () => {
    const diaries = [
      {
        comment: [],
        date: "2021-12-23T10:12:54.224Z",
        desc: "Xg",
        end_pg: "1",
        start_pg: "1",
        title: "Xg"
      }
    ];

    const user = [{ username: "admin", pwd: "@dmin", role: "admin" }];
    await AsyncStorage.setItem("@db_user", JSON.stringify(user));
    await AsyncStorage.setItem("@db_diaries", JSON.stringify(diaries));
  }, []);
  useEffect(() => {
    setDefaultData();
    return () => {};
  }, []);
  return (
    // our navigation container is here where we can navigate between screens
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={(headerLeft = null)}
        />
        <Stack.Screen name="Add New Diary" component={AddDiary} />
        <Stack.Screen name="ViewDiary" component={ViewDiary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
