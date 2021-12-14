import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Signin = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [data, setData] = useState([
    {
      comment: [],
      date: "2021-12-23T10:12:54.224Z",
      desc: "Xg",
      end_pg: "1",
      start_pg: "1",
      title: "Xg",
    },
  ]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user");
      console.log("jsonValue", jsonValue);
      //   setData(JSON.parse(jsonValue));
      const Data = JSON.parse(jsonValue);
      console.log(typeof Data);
      console.log("username is ", Data.username);
      if (Data.username === username && Data.pwd === pwd) {
        navigation.navigate("Dashboard", { Data: data });
      } else {
        Alert.alert("Opps", "Username or Password is inocrrrect", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("AsyncStorage error", e);
    }
  };

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
          marginTop: 5,
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
          marginTop: 5,
        }}
      >
        <TextInput
          placeholder="Enter Password"
          onChangeText={setPwd}
          value={pwd}
        />
      </View>
      <TouchableOpacity
        onPress={getData}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          width: 80,
          marginTop: 10,
          borderRadius: 10,
          backgroundColor: "#0099ff",
        }}
      >
        <Text style={{ color: "white" }}>Sign In</Text>
      </TouchableOpacity>
      <View style={{ height: 40 }}></View>
      <View style={{ flexDirection: "row" }}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={{ color: "#00ccff", fontSize: 14 }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signin;
