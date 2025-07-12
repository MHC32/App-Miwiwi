import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInputPrimary } from './src/components/core/Inputs/TextInput';
import { COLORS } from './src/theme/palette';
import phoneIcon from './src/assets/icons/call.svg'; // Import direct du SVG

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
                <TextInputPrimary
                    placeholder="Numéro de téléphone"
                    placeholderColor={COLORS.primary.light} // Placeholder bleu clair
                    LeftIconComponent={phoneIcon} // SVG importé
                    iconColor={COLORS.alert.negative} // Icône en rouge
                    textColor={COLORS.secondary.dark}
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
    },

});

export default App;