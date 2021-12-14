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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Sign Up</Text>
      <Text>Enter Your Username Here</Text>
      <TextInput
        placeholder="Enter Username"
        onChangeText={setUsername}
        value={username}
      />
      <Text>Enter Your Password here</Text>
      <TextInput
        placeholder="Enter Password"
        onChangeText={setPwd}
        value={pwd}
      />
      <Text>Select Your Role</Text>
      <View
        style={{
          flexDirection: "row",
          width: "50%",
          justifyContent: "space-around",
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
              backgroundColor: role === "user" ? "blue" : null,
            }}
            onPress={() => setRole("user")}
          ></TouchableOpacity>
          <Text>User</Text>
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
              backgroundColor: role === "admin" ? "blue" : null,
            }}
            onPress={() => setRole("admin")}
          ></TouchableOpacity>
          <Text>Admin</Text>
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
          backgroundColor: "pink",
        }}
      >
        <Text>Signup</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={{ color: "blue" }}>Sign IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
