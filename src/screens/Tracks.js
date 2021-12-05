import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image
} from "react-native";

import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/Entypo";
import { symbolicateLogNow } from "react-native/Libraries/LogBox/Data/LogBoxData";

const Tracks = ({ route }) => {
  const [sound, setSound] = useState(new Audio.Sound());
  const [playing, setplaying] = useState(false);
  const [c_url, setc_url] = useState();

  const handleSetTrack = useCallback(
    async mp3_link => {
      playing ? handleExit() : null;
      sound._loaded ? sound.replayAsync() : console.log(mp3_link);
      await sound.loadAsync({
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
      {tracks.map(item => {
        return (
          <TouchableOpacity
            onPress={() => {
              handleSetTrack(item.media.mp3.url);
            }}
            style={[styles.item]}
          >
            <View style={styles.titleView}>
              <Icon name="music" size={20} color="white" />
              <Text style={[styles.title]}>
                {item.title}
              </Text>
            </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    // // height: 140,
    // marginVertical: 10,
    // marginHorizontal: 10
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
    shadowOpacity: 1,
    flexDirection: "row"
  },
  image: {
    flex: 1,
    shadowOpacity: 0.5
  }
});

export default Tracks;
