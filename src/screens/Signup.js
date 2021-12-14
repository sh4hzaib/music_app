import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Signup = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [role, setRole] = useState("");
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@user", jsonValue);
      console.log(jsonValue);
      console.log("Data Stored");
      navigation.navigate("Signin");
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
          Signup to Daily Diary
        </Text>
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
      <Text style={{ color: "#00ccff", fontSize: 14, marginTop: 15 }}>
        Select Your Role
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "50%",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "space-between",
            width: "50%",

            // backgroundColor: "black",
          }}
        >
          <TouchableOpacity
            disabled={role === "user" ? true : false}
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              borderColor: "grey",
              borderWidth: 1,
              backgroundColor: role === "user" ? "#33ccff" : null,
            }}
            onPress={() => setRole("user")}
          ></TouchableOpacity>
          <Text style={{ color: "#00ccff", fontSize: 15 }}>User</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "space-between",
            width: "50%",
            // backgroundColor: "black",
          }}
        >
          <TouchableOpacity
            disabled={role === "admin" ? true : false}
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              borderColor: "grey",
              borderWidth: 1,
              backgroundColor: role === "admin" ? "#33ccff" : null,
            }}
            onPress={() => setRole("admin")}
          ></TouchableOpacity>
          <Text style={{ color: "#00ccff", fontSize: 15 }}>Admin</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => storeData({ username: username, pwd: pwd, role: role })}
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
        <Text style={{ color: "white" }}>Signup</Text>
      </TouchableOpacity>
      <View style={{ height: 40 }}></View>
      <View style={{ flexDirection: "row" }}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
          <Text style={{ color: "#00ccff", fontSize: 14 }}>Sign IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
