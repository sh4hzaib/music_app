import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Tracks = ({ route }) => {
  const { tracks } = route.params;
  useEffect(() => {
    console.log(tracks);
    return () => {};
  }, []);
  return (
    <View>
      <Text>TRACKS</Text>

      {tracks.map(track => {
        return (
          <TouchableOpacity
            key={track.id}
            onPress={() => {
              //   navigation.navigate("Tracks", { tracks: track.tracks });
            }}
          >
            <Text>
              {track.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Tracks;
