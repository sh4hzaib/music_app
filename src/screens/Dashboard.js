import axios from "axios";
import React, { useEffect, useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
const Dashboard = ({ navigation }) => {
  const [programs, setPrograms] = useState([]);
  const getFromApi = useCallback(async () => {
    const response = await axios.get(
      "https://api.iawaketechnologies.com/api/v2/media-library/free?resetCache=false"
    );
    setPrograms(response.data.programs);
    // console.log(response.data.programs);
  }, []);
  useEffect(() => {
    getFromApi();
    return () => {};
  }, []);
  return (
    <View>
      <Text>Dashboard</Text>
      {programs.map(program => {
        return (
          <TouchableOpacity
            key={program.id}
            onPress={() => {
              navigation.navigate("Tracks", { tracks: program.tracks });
            }}
          >
            <Text>
              {program.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Dashboard;
