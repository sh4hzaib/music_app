import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ViewDiary = ({ navigation, route }) => {
  const { item, index, DATA, setDATA } = route.params;
  console.log(item);
  const [edit, setEdit] = React.useState(false);
  const [text, onChangeText] = React.useState(item.title);
  const [pageStart, onPageStart] = React.useState(item.start_pg);
  const [pageEnd, onPageEnd] = React.useState(item.end_pg);
  const [desc, setDesc] = React.useState(item.desc);
  const [role, setRole] = React.useState("");
  const [date, setDate] = React.useState(new Date(item.date));
  const [show, setShow] = React.useState(Platform.OS === "ios");
  // const [text, onChangeText] = React.useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@user");
        console.log("jsonValue", jsonValue);
        //   setData(JSON.parse(jsonValue));
        const Data = JSON.parse(jsonValue);
        console.log(typeof Data);
        console.log("username is ", Data.username);
        setRole(Data.role);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log("AsyncStorage error", e);
      }
    };
    getData();
    return () => {};
  }, []);
  const onChange = React.useCallback((event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  });

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {role === "admin" ? (
        <TouchableOpacity
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
          }}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.view}>
        <Text>Book Title</Text>
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
        <Text>Description</Text>
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
        <Text>Page Read</Text>
      </View>
      <View style={styles.input}>
        <View
          style={{
            flexDirection: "row",
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
          <Text> - </Text>
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
        disabled={!edit}
        style={styles.view}
        onPress={() => {
          setShow(true);
        }}
      >
        {Platform.OS === "android" ? <Text>{date.toDateString()}</Text> : null}
        {show ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            // mode={mode}
            is24Hour={true}
            // display="default"
            onChange={onChange}
          />
        ) : null}
      </TouchableOpacity>
      {role === "admin" ? (
        <TouchableOpacity
          disabled={!edit}
          onPress={async () => {
            // setIndex(index);
            await DATA.splice(index, 1, {
              comment: item.comment,
              title: text,
              date: date,
              start_pg: pageStart,
              end_pg: pageEnd,
              desc: desc,
            });
            setDATA(DATA);
            console.log("DATA AFTER UPDATE", DATA);
            navigation.navigate("Dashboard", { DATA });
          }}
          style={{
            marginTop: 30,
            backgroundColor: edit ? "cyan" : "grey",
            height: 50,
            width: 80,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Update</Text>
        </TouchableOpacity>
      ) : null}
      {item.comment.length > 0 ? (
        <View>
          <Text>Cmments on this Diary</Text>
          {item.comment.map((element) => (
            <Text style={{ alignSelf: "center" }}>{element}</Text>
          ))}
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    height: 50,
    width: 120,
    backgroundColor: "#99ccff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    width: 200,
    height: 50,
  },
});
export default ViewDiary;
