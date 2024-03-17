import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, StatusBar } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import ClrPicker from "./components/ClrPicker";
const COLORS = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "purple",
  "black",
  "white",
];

const BACKGROUND_COLOR = "rgba(200,200,200,1)";
const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.9;
const PICKER_WIDTH = width * 0.9;

export default function App() {
  const pickedColor = useSharedValue(COLORS[0]);

  useEffect(() => {
    console.log("pickedColoe", pickedColor);
  }, []);
  const onColorChanged = useCallback((color) => {
    "worklet";
    pickedColor.value = color;
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });

  const tStyle = useAnimatedStyle(() => {
    return {
      color: pickedColor.value,
    };
  });

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.topContainer}>
        <Animated.Text style={[tStyle, styles.header]}>
          COLOR PICKER
        </Animated.Text>
        <Animated.View style={[styles.circle, rStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <ClrPicker
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linearGradient}
          maxWidth={PICKER_WIDTH}
          onColorChanged={onColorChanged}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    height: 30,
    width: PICKER_WIDTH,
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
  },
});
