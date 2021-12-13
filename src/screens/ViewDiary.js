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
import { useSelector, useDispatch } from "react-redux";
import { pushUserData, updateItem } from "../../dataSlice";
const ViewDiary = ({ navigation, route }) => {
  const { item } = route.params;
  console.log(item);
  const dispatch = useDispatch();
  const [edit, setEdit] = React.useState(false);
  const [text, onChangeText] = React.useState(item.title);
  const [pageStart, onPageStart] = React.useState(item.start_pg);
  const [pageEnd, onPageEnd] = React.useState(item.end_pg);
  const [desc, setDesc] = React.useState(item.desc);
  const Comments = useSelector((state) => state.data.comments);
  console.log(Comments);
  const [date, setDate] = React.useState(new Date(item.date));
  const [show, setShow] = React.useState(Platform.OS === "ios");
  // const [text, onChangeText] = React.useState();

  const onChange = React.useCallback((event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  });

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
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
      <Text>Cmments on this Diary</Text>
      {item.comment.map((element) => (
        <Text>{element}</Text>
      ))}
      <TouchableOpacity
        disabled={!edit}
        onPress={() => {
          dispatch(
            updateItem({
              title: text,
              date: date,
              start_pg: pageStart,
              end_pg: pageStart,
              desc: desc,
            })
          );
          navigation.navigate("Dashboard");
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
