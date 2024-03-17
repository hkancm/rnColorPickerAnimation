import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
    GestureHandlerRootView,
    PanGestureHandler,
    TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
    interpolateColor,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";


const ClrPicker=({ colors, end, start, style, maxWidth, onColorChanged })=>{
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    const adjustedTranslateX = useDerivedValue(() => {
        return Math.min(
            Math.max(translateX.value, 0),
            maxWidth - CIRCLE_PICKER_SIZE,
        );
    });

    const onEnd = useCallback(() => {
        "worklet";
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
    }, []);

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.x = adjustedTranslateX.value;
            translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
            scale.value = withSpring(1.05);
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.x;
        },
        onEnd,
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: adjustedTranslateX.value },
                { scale: scale.value },
                { translateY: translateY.value },
            ],
        };
    });

    const rInternalPickerStyle = useAnimatedStyle(() => {
        const inputRange = colors.map(
            (_, index) => (index / colors.length) * maxWidth,
        );

        const backgroundColor = interpolateColor(
            translateX.value,
            inputRange,
            colors,
        );
        onColorChanged?.(backgroundColor);
        return {
            backgroundColor,
        };
    });

    return (
        <GestureHandlerRootView>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={styles.container}>
                    <LinearGradient colors={colors} start={start} end={end} style={style} />
                    <Animated.View style={[styles.picker, rStyle]}>
                        <Animated.View
                            style={[styles.internalPicker, rInternalPickerStyle]}
                        />
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
}
const CIRCLE_PICKER_SIZE = 35;
const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
    },
    picker: {
        position: "absolute",
        backgroundColor: "white",
        width: CIRCLE_PICKER_SIZE,
        height: CIRCLE_PICKER_SIZE,
        borderRadius: CIRCLE_PICKER_SIZE / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    internalPicker: {
        width: INTERNAL_PICKER_SIZE,
        height: INTERNAL_PICKER_SIZE,
        borderRadius: INTERNAL_PICKER_SIZE / 2,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
    },
});

export default ClrPicker
