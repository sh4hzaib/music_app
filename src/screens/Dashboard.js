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
    title: "First Item"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item"
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

  const getFromApi = useCallback(async () => {
    const response = await axios.get(
      "https://api.iawaketechnologies.com/api/v2/media-library/free?resetCache=false"
    );
    setPrograms(response.data.programs);
    // console.log(response.data.programs);
  }, []);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getFromApi();
    return () => {};
  }, []);

  const renderItem = ({ item }) => {
    const image = { uri: item.banner ? item.banner.url : item.cover.url };

    return (
      <View style={styles.item}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Tracks", { tracks: item.tracks });
            }}
            style={[styles.item]}
          >
            <View style={styles.titleView}>
              <Text style={[styles.title]}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={programs}
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
