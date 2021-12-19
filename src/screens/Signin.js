import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Initializing our Signin screen and passing navigation in it to navigate to other screens
const Signin = ({ navigation }) => {
  //Initializing our states used in signin scree
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [found, setfound] = useState(false);
  const [data, setData] = useState([
    {
      comment: [],
      date: "2021-12-23T10:12:54.224Z",
      desc: "Xg",
      end_pg: "1",
      start_pg: "1",
      title: "Xg"
    }
  ]);
  //getting user data from async storage and verifying if user is registered or not
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@db_user");
      const Data = JSON.parse(jsonValue);
      // checking either user exists or not
      const user = Data.find(
        user => user.username === `${username}` && user.pwd === `${pwd}`
      );
      //  if user found, navigate to dashboard, otherwise show alert
      user
        ? navigation.navigate("Dashboard", { user: user })
        : Alert.alert("Opps", "Username or Password is inocrrrect", [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]);

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("AsyncStorage error", e);
    }
  };
  //All of our design and components in the screen will go here
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#ccffff" }}>
      <View
        style={{ height: 50, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "#00ccff", fontSize: 18 }}>
          Welcome to Daily Diary
        </Text>
      </View>
      <View
        style={{ height: 50, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "#00ccff", fontSize: 16 }}>Sign In</Text>
      </View>
      <Text style={{ color: "#00ccff", fontSize: 14 }}>
        Enter Your Username Here
      </Text>
      <View
        style={{
          height: 50,
          borderRadius: 12,
          borderColor: "#00ccff",
          borderWidth: 1,
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5
        }}
      >
        <TextInput
          placeholder="Enter Username"
          onChangeText={setUsername}
          value={username}
        />
      </View>
      <Text style={{ color: "#00ccff", fontSize: 14, marginTop: 5 }}>
        Enter Your Password here
      </Text>

      <View
        style={{
          height: 50,
          borderRadius: 12,
          borderColor: "#00ccff",
          borderWidth: 1,
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5
        }}
      >
        <TextInput
          placeholder="Enter Password"
          onChangeText={setPwd}
          value={pwd}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        //calling getData function to fetch users data
        onPress={getData}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          width: 80,
          marginTop: 10,
          borderRadius: 10,
          backgroundColor: "#0099ff"
        }}
      >
        <Text style={{ color: "white" }}>Sign In</Text>
      </TouchableOpacity>
      <View style={{ height: 40 }} />
      <View style={{ flexDirection: "row" }}>
        <Text>Don't have an account?</Text>
        {/* navigating to signup screen */}
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={{ color: "#00ccff", fontSize: 14 }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
//exporting screen
export default Signin;
