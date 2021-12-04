import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";

import { Audio } from "expo-av";

const Tracks = ({ route }) => {
  const [sound, setSound] = useState(new Audio.Sound());
  const [playing, setplaying] = useState(false);

  const handleSetTrack = useCallback(
    async mp3_link => {
      sound._loaded
        ? sound.replayAsync()
        : await sound.loadAsync({
            uri: mp3_link
          });
      console.log("3Playing Sound");
      setplaying(true);
      await sound.playAsync();
    },
    [sound]
  );

  const handleExit = useCallback(
    async () => {
      sound.unloadAsync();
      setplaying(false);
    },
    [sound]
  );

  const { tracks } = route.params;
  useEffect(
    () => {
      //   console.log(tracks);
      return () => {
        handleExit();
      };
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

      <Button
        disabled={sound._loaded ? false : true}
        title={playing ? "pause" : "play"}
        onPress={() => {
          playing
            ? sound.pauseAsync() && setplaying(false)
            : sound.playAsync() && setplaying(true);
        }}
      />
    </View>
  );
};

export default Tracks;
