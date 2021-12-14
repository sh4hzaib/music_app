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
} from "react-native";
import { useNavigationState } from "@react-navigation/native";
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);
const Dashboard = ({ navigation, route }) => {
  const [DATA, setDATA] = useState([
    {
      comment: [],
      date: "2021-12-23T10:12:54.224Z",
      desc: "Xg",
      end_pg: "1",
      start_pg: "1",
      title: "Xg",
    },
  ]);
  const { Data } = route.params;
  console.log("DATA at dashboard", DATA);
  // setDATA(Data);
  // const Datas = useNavigationState((state) => state.DATA);
  // console.log("DATAS in Dashboard is ", Datas);
  const [index, setIndex] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const getFromApi = useCallback(async () => {}, []);
  const [comment, setComment] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item, index }) => {
    console.log("Flatlist Item", item);
    console.log("Datein item", item.date);
    let newdate = new Date(item.date);
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          width: "100%",
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
                  await DATA[index].comment.push(comment);
                  await setComment("");
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
            backgroundColor: "#99ccff",
            borderRadius: 10,
          }}
        >
          <Text>{newdate.toDateString()}</Text>
        </View>
        <View
          style={{
            width: "70%",
            // height: "15%",
            // padding: 20,
            backgroundColor: "#99ccff",
            borderRadius: 10,
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
                // setIndex,
              });
            }}
            style={{
              flex: 1,
              padding: 20,
            }}
          >
            <Text>{item.title}</Text>
            <Text>{item.desc}</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text>Comment Now</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Comment Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{
          // position: "absolute"
          // bottom: "10%",
          // right: 10
          marginTop: 10,
          borderRadius: 10,
          height: 50,
          width: 120,
          backgroundColor: "#66ccff",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("Add New Diary", { DATA: DATA });
          // console.log("hello");
        }}
      >
        <Text>Add New Diary</Text>
      </TouchableOpacity>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    height: 140,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  titleView: {
    backgroundColor: "blue",
    padding: 8,
    borderBottomEndRadius: 10,
    position: "absolute",
    top: -10,
    left: -10,
    shadowOpacity: 1,
  },
  image: {
    flex: 1,
    shadowOpacity: 0.5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default Dashboard;
