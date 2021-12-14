import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddDiary = ({ navigation, route }) => {
  const { DATA } = route.params;
  const [text, onChangeText] = React.useState();
  const [pageStart, onPageStart] = React.useState();
  const [pageEnd, onPageEnd] = React.useState();
  const [desc, setDesc] = React.useState();
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(Platform.OS === "ios");

  // const [text, onChangeText] = React.useState();

  const onChange = React.useCallback((event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  });

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#ccffff" }}>
      <View style={styles.view}>
        <Text style={{ color: "white" }}>Book Title</Text>
      </View>
      <View style={styles.input}>
        <TextInput
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
          onChangeText={setDesc}
          value={desc}
          placeholder="Book Description"
        />
      </View>
      <View style={styles.view}>
        <Text style={{ color: "white" }}>Page Read</Text>
      </View>
      <View style={styles.input}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TextInput
            placeholder="starting page"
            keyboardType="number-pad"
            onChangeText={onPageStart}
            maxLength={3}
            value={pageStart}
          />
          <Text style={{ color: "black" }}> - </Text>
          <TextInput
            keyboardType="number-pad"
            maxLength={3}
            onChangeText={onPageEnd}
            value={pageEnd}
            placeholder="end page"
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.view}
        onPress={() => {
          setShow(true);
        }}
      >
        {Platform.OS === "android" ? (
          <Text style={{ color: "white" }}>{date.toDateString()}</Text>
        ) : null}
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
      <TouchableOpacity
        onPress={async () => {
          await DATA.push({
            comment: [],
            title: text,
            date: date,
            start_pg: pageStart,
            end_pg: pageStart,
            desc: desc,
          });
          console.log("DATA AFTER PUSH", DATA);
          navigation.navigate("Dashboard", { DATA });
        }}
        style={{
          marginTop: 30,
          backgroundColor: "#0099ff",
          height: 50,
          width: "50%",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    height: 50,
    width: 120,
    backgroundColor: "#00ccff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#00ccff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    width: 200,
    height: 50,
  },
});
export default AddDiary;
