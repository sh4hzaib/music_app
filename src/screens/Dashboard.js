import axios from "axios";
import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Image
} from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    start_pg: 20,
    end_pg: 30
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    start_pg: 20,
    end_pg: 30
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    start_pg: 20,
    end_pg: 30
  }
];
const Item = ({ item, onPress, backgroundColor, textColor }) =>
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>
      {item.title}
    </Text>
  </TouchableOpacity>;
const Dashboard = ({ navigation }) => {
  const [programs, setPrograms] = useState([]);

  const getFromApi = useCallback(async () => {}, []);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getFromApi();
    return () => {};
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 10

          // flex: 1
        }}
      >
        <View
          style={{
            width: "20%",

            padding: 20,
            backgroundColor: "blue"
            // borderRadius: 10
          }}
        />
        <View
          style={{
            width: "70%",
            // height: "15%",
            // padding: 20,
            backgroundColor: "blue",
            borderRadius: 10
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 20
            }}
          >
            <Text>
              {item.title}
            </Text>
            <Text>Description of Text</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <TouchableOpacity>
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
        }}
        onPress={() => {
          navigation.navigate("Add New Diary");
          // console.log("hello");
        }}
      >
        <Text>Add New Diary</Text>
      </TouchableOpacity>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  }
});
export default Dashboard;
