import React, { useState, useEffect } from "react";
import { StyleSheet, Pressable, Animated, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from "../../../theme/palette";

const defaultStyles = {
    bgGradientColors: ['#FFFFFF', '#FFFFFF'],
    headGradientColors: ['#0a0404ff', '#0a0404ff'], 
};

const activeStyles = {
    bgGradientColors: ['#FFFFFF', '#FFFFFF'], 
    headGradientColors: ['#0a0404ff', '#0a0404ff'], 
};

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

    const toggleSwitch = () => onValueChange(!value);
    const currentStyles = value ? activeStyles : defaultStyles;

    return (
        <Pressable onPress={toggleSwitch} style={styles.pressable}>
            <LinearGradient
                colors={currentStyles.bgGradientColors}
                style={styles.backgroundGradient}
                start={{ x: 0, y: 0.5 }}
            >
                <View style={styles.innerContainer}>
                    <Animated.View style={{ transform: [{ translateX }] }}>
                        <LinearGradient
                            colors={currentStyles.headGradientColors}
                            style={styles.headGradient}
                        />
                    </Animated.View>
                </View>
            </LinearGradient>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressable: {
        width: 55,
        height: 26,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.primary.gray, 
    },
    backgroundGradient: {
        borderRadius: 16,
        flex: 1,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
    },
    headGradient: {
        width: 24,
        height: 24,
        borderRadius: 100,
    },
});

export default PrimarySwitch;