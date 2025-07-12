import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Loader } from './src/components/core/Feedback/Loader';
import { COLORS } from './src/theme/palette';

const App = () => {
    const [quantity, setQuantity] = React.useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
                <Loader
                    customStyle={{
                        marginTop: 20,
                        padding: 15,
                        backgroundColor: COLORS.common.white,
                        borderRadius: 10
                    }}
                />
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
        alignItems: 'center', // Pour bien centrer le NumericInput
    },
});

export default App;