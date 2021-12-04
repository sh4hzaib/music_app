import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Audio } from "expo-av";

const Tracks = ({ route }) => {
  const [sound, setSound] = useState();

  const handleSetTrack = useCallback(async mp3_link => {
    console.log(mp3_link);
    const { sound } = await Audio.Sound.createAsync({
      uri: mp3_link
    });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }, []);
  const { tracks } = route.params;
  useEffect(
    () => {
      //   console.log(tracks);
      return sound
        ? () => {
            console.log("Unloading Sound");
            sound.unloadAsync();
          }
        : undefined;
    },
    [sound]
  );
  return (
    <View>
      <Text>TRACKS</Text>

      {tracks.map(track => {
        return (
          <TouchableOpacity
            key={track.id}
            onPress={() => {
              handleSetTrack(track.media.mp3.url);
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
