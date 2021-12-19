import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
// Initializing our ViewDiary screen and passing navigation and route in it to navigate to other screens and also dispay a specific item in the screen
const ViewDiary = ({ navigation, route }) => {
  //Getting specific item index and data /setdata so that if the user is admin then the data can be editable and can be updated on other screens
  const { item, index, DATA, setDATA, USER } = route.params;
  console.log(item);
  //Defin states and firstly passing item data into it to display item that was passed in the route
  const [edit, setEdit] = React.useState(false);
  const [text, onChangeText] = React.useState(item.title);
  const [pageStart, onPageStart] = React.useState(item.start_pg);
  const [pageEnd, onPageEnd] = React.useState(item.end_pg);
  const [desc, setDesc] = React.useState(item.desc);
  const [role, setRole] = React.useState(USER.role);
  const [date, setDate] = React.useState(new Date(item.date));
  const [show, setShow] = React.useState(Platform.OS === "ios");
  //getting userrole from async-storage to check if user is admin or user
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@user");
        console.log("jsonValue", jsonValue);
        //   setData(JSON.parse(jsonValue));
        const Data = JSON.parse(jsonValue);
        console.log(typeof Data);
        console.log("username is ", Data.username);
        //Setting role state after checking userrole from async-storage
        setRole(Data.role);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log("AsyncStorage error", e);
      }
    };
    //calling getData function
    // getData();
    return () => {};
  }, []);
  //making a Callback function to setDate state
  const onChange = React.useCallback((event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  });
  //rendering our screen
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#ccffff" }}>
      {/* now if user is admin then the data can be editable other wise it will not editable so after checking role we are Making this logic */}
      {role === "admin"
        ? <TouchableOpacity
            onPress={() => setEdit(true)}
            style={{
              position: "absolute",
              right: 10,
              marginTop: 10,
              height: 50,
              width: 50,
              backgroundColor: "#00ccff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5
            }}
          >
            <AntDesign name="edit" size={24} color="white" />
          </TouchableOpacity>
        : null}

      <View style={styles.view}>
        <Text style={{ color: "white" }}>Book Title</Text>
      </View>
      <View style={styles.input}>
        <TextInput
          editable={edit}
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter Book Title"
        />
      </View>
      <View style={styles.view}>
        <Text style={{ color: "white" }}>Description</Text>
      </View>
      <View style={styles.input}>
        <TextInput
          editable={edit}
          onChangeText={setDesc}
          value={desc}
          placeholder="Book Title"
        />
      </View>
      <View style={styles.view}>
        <Text style={{ color: "white" }}>Page Read</Text>
      </View>
      <View style={styles.input}>
        <View
          style={{
            flexDirection: "row",
            width: "70%",
            justifyContent: "space-between"
            // backgroundColor: "pink",
          }}
        >
          <TextInput
            editable={edit}
            placeholder="starting page"
            keyboardType="number-pad"
            onChangeText={onPageStart}
            maxLength={3}
            value={pageStart}
          />
          <Text>- </Text>
          <TextInput
            editable={edit}
            keyboardType="number-pad"
            maxLength={3}
            onChangeText={onPageEnd}
            value={pageEnd}
            placeholder="end page"
          />
        </View>
      </View>
      <TouchableOpacity
        //Disabling dateTimePicker if the edit button is not pressed
        disabled={!edit}
        style={styles.view}
        onPress={() => {
          setShow(true);
        }}
      >
        {Platform.OS === "android"
          ? <Text style={{ color: "white" }}>
              {date.toDateString()}
            </Text>
          : null}
        {show
          ? <DateTimePicker
              testID="dateTimePicker"
              value={date}
              // mode={mode}
              is24Hour={true}
              // display="default"
              onChange={onChange}
            />
          : null}
      </TouchableOpacity>
      {/* if role is admnin then data can be updated other wise it will be just dispalyed */}
      {role === "admin"
        ? <TouchableOpacity
            disabled={!edit}
            onPress={async () => {
              // setIndex(index);
              await DATA.splice(index, 1, {
                comment: item.comment,
                title: text,
                date: date,
                start_pg: pageStart,
                end_pg: pageEnd,
                desc: desc
              });
              //updatnig data and passing updated data tp the dasboard so that it can be dispalyed on dashboard and then navigating to dashboard
              setDATA(DATA);
              console.log("DATA AFTER UPDATE", DATA);
              navigation.navigate("Dashboard", { DATA });
            }}
            style={{
              marginTop: 30,
              backgroundColor: edit ? "#0099ff" : "#aba19d",
              height: 50,
              width: "50%",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white" }}>Update</Text>
          </TouchableOpacity>
        : null}
      {/* checking number of comments on a diary and displaying on screen */}
      {item.comment.length > 0
        ? <View>
            <Text>Cmments on this Diary</Text>
            {item.comment.map(element =>
              <Text style={{ alignSelf: "center" }}>
                {element.username} : {element.comment}
              </Text>
            )}
          </View>
        : null}
    </View>
  );
};
//defining styles
const styles = StyleSheet.create({
  view: {
    height: 50,
    width: 120,
    backgroundColor: "#00ccff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#00ccff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    width: 200,
    height: 50
  }
});
export default ViewDiary;
