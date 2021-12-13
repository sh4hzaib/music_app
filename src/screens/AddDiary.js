import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddDiary = () => {
  const [text, onChangeText] = React.useState();
  const [pageStart, onPageStart] = React.useState();
  const [pageEnd, onPageEnd] = React.useState();

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
    <View>
      <Text>Book Title</Text>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="Book Title"
      />
      <Text>Page Read</Text>
      <View
        style={{
          flexDirection: "row"
        }}
      >
        <TextInput
          placeholder="starting page"
          keyboardType="number-pad"
          onChangeText={onPageStart}
          maxLength={3}
          value={pageStart}
        />
        <Text> - </Text>
        <TextInput
          keyboardType="number-pad"
          maxLength={3}
          onChangeText={onPageEnd}
          value={pageEnd}
          placeholder="end page"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          setShow(true);
        }}
      >
        {Platform.OS === "android"
          ? <Text>
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
      <TouchableOpacity>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddDiary;
