import React, { useState, useEffect } from "react";
import { StyleSheet, Pressable, Animated, View } from "react-native";
import { COLORS } from "../../../theme/palette";

const PrimarySwitch = ({ 
    value = false, 
    onValueChange = () => {}
}) => {
    const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: value ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [value, animatedValue]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [4, 28],
    });

    const toggleSwitch = (e) => onValueChange(!value);

    return (
        <Pressable 
            onPress={toggleSwitch} 
            style={[
                styles.container, 
                value ? styles.containerActive : styles.containerInactive
            ]}
        >
            <Animated.View 
                style={[
                    styles.thumb, 
                    { transform: [{ translateX }] },
                    value ? styles.thumbActive : styles.thumbInactive
                ]} 
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 55,
        height: 26,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.primary.gray,
        justifyContent: 'center',
        padding: 2,
    },
    containerActive: {
        backgroundColor: '#FFFFFF', 
    },
    containerInactive: {
        backgroundColor: '#FFFFFF', 
    },
    thumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    thumbActive: {
        backgroundColor: '#0a0404ff',
    },
    thumbInactive: {
        backgroundColor: '#0a0404ff', 
    },
});

export default PrimarySwitch;