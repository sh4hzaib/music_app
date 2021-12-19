import axios from "axios";
import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Modal,
  TextInput,
  ImageBackground,
  Image,
  Alert
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initializing our DAshboard screen and passing navigation,route in it to navigate to other screens and also get updated data from different screens
const Dashboard = ({ navigation, route }) => {
  const { user } = route.params;
  //Initializing our States
  const [DATA, setDATA] = useState();
  const [USER, setUSER] = useState(user);
  //  getting data from async storage
  const getDataFromAsyncStorage = useCallback(
    async () => {
      var diaries = await AsyncStorage.getItem("@db_diaries");
      diaries = JSON.parse(diaries);
      setDATA(diaries);
    },
    [DATA]
  );

  //  set data to async storage
  const setDataAsyncStorage = useCallback(
    async () => {
      console.log("hello");
      console.log("DATA", DATA);
      try {
        await AsyncStorage.setItem("@db_diaries", JSON.stringify(DATA));
      } catch (error) {
        console.log("AsyncStorage error", e); // if any error occured with async storage, show error
      }
    },
    [DATA]
  );

  useEffect(() => {
    getDataFromAsyncStorage();
    return () => {};
  }, []);
  console.log("DATA at dashboard", DATA);
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  //Making RenderItem function for Flatlist and passing an item from DATA array into it for rendering and also passing index to it
  const renderItem = ({ item, index }) => {
    console.log("Flatlist Item", item);
    console.log("Datein item", item.date);
    let newdate = new Date(item.date);
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          width: "100%"
          // justifyContent: "space-between",
          // flex: 1
        }}
      >
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Place Your Comment Here"
                // keyboardType="number-pad"
                onChangeText={setComment}
                // maxLength={3}
                value={comment}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={async () => {
                  // await setIndex(index);
                  let data = DATA;
                  let comnt = {
                    username: USER.username,
                    comment: comment
                  };
                  data[index].comment.push(comnt);
                  setDATA(data);
                  setComment("");
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Add Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View
          style={{
            width: "25%",
            height: 130,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: "#a3e6e4",
            borderRadius: 30
          }}
        >
          <Text>
            {newdate.toDateString()}
          </Text>
        </View>
        <View
          style={{
            width: "70%",
            // height: "15%",
            // padding: 20,
            backgroundColor: "#a3e6e4",
            borderRadius: 10
          }}
        >
          <TouchableOpacity
            onPress={() => {
              // setIndex(index),
              navigation.navigate("ViewDiary", {
                item,
                index,
                DATA,
                setDATA,
                USER
                // setIndex,
              });
            }}
            style={{
              flex: 1,
              padding: 20
            }}
          >
            <Text style={{ color: "black" }}>
              {item.title}
            </Text>
            <Text style={{ color: "black" }}>
              {item.desc}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              // flexDirection: "row",
              // justifyContent: "space-around",
              alignSelf: "center"
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                width: 40,
                justifyContent: "space-between"
              }}
              onPress={() => setModalVisible(true)}
            >
              <FontAwesome5 name="comment-alt" size={24} color="black" />
              <Text>
                {item.comment.length}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <Text>Comment Now</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  };
  //actuall export componentes from the screen goes here
  return (
    <SafeAreaView style={styles.container}>
      {DATA
        ? <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                width: "90%"
              }}
            >
              <TouchableOpacity
                style={{
                  // position: "absolute"
                  // bottom: "10%",
                  // right: 10
                  marginTop: 10,
                  borderRadius: 10,
                  height: 50,
                  width: 120,
                  backgroundColor: "#0099ff",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                //Navigating to Add new diary and passing its data to diary to push new data into array
                onPress={() => {
                  navigation.navigate("Add New Diary", { DATA: DATA });
                }}
              >
                <Text style={{ color: "white" }}>Add New Diary</Text>
              </TouchableOpacity>
              {/* Showing an alert message to the user that he wants to logout or not */}
              <TouchableOpacity
                onPress={() => {
                  setDataAsyncStorage();

                  Alert.alert("Alert", "Do you Want to Logout?", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        navigation.navigate("Signin");
                      }
                    }
                  ]);
                }}
              >
                {/* Adding icon of logout */}
                <SimpleLineIcons name="logout" size={24} color="#0099ff" />
              </TouchableOpacity>
            </View>
            {/* Flatlist to show all data and calling renderItem function defined earlier to render all of our data */}
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.title}
              extraData={selectedId}
            />
          </View>
        : null}
    </SafeAreaView>
  );
};
//defining stylessheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccffff"
  },
  item: {
    height: 140,
    marginVertical: 10,
    marginHorizontal: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "white"
  },
  titleView: {
    backgroundColor: "blue",
    padding: 8,
    borderBottomEndRadius: 10,
    position: "absolute",
    top: -10,
    left: -10,
    shadowOpacity: 1
  },
  image: {
    flex: 1,
    shadowOpacity: 0.5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF"
  },
  buttonClose: {
    backgroundColor: "#2196F3"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
export default Dashboard;
