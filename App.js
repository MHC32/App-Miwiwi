import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { COLORS } from './src/theme/palette';


const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
               
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.common.white,
        justifyContent: "center",
        padding: 20,
    },
    section: {
        marginBottom: 20,
    },

});

export default App;