import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { COLORS } from '../../theme/palette';
import { FONTS } from '../../theme/fonts';
import { hp, wp } from '../../utils/dimensions';
import { TextInputPrimary } from '../../components/core/Inputs/TextInput';
import Call from '../../assets/icons/call.svg';
import Lock from '../../assets/icons/lock.svg';
import Door from '../../assets/icons/login.svg';
import { ButtonWithIcon } from '../../components/core/Buttons/Button';

const Login = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? hp('2%') : 0}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <View style={styles.textContainer}>
                        <Text style={styles.welcomeText}>Bienvenue,</Text>
                        <Text style={styles.subText}>connectez-vous à votre compte</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.containerInputs}>
                        <View style={styles.groupeInputs}>
                            <Text style={styles.labelInputs}>Telephone</Text>
                            <TextInputPrimary
                                value={phone}
                                onChangeText={setPhone}
                                placeholder="33340014"
                                placeholderTextColor={COLORS.primary.gray}
                                LeftIconComponent={Call}
                                iconColor={COLORS.common.white}
                                textColor={COLORS.secondary.dark}
                                style={styles.textInputStyle}
                            />
                        </View>
                        <View style={styles.groupeInputs}>
                            <Text style={styles.labelInputs}>Password</Text>
                            <TextInputPrimary
                                value={password}
                                onChangeText={setPassword}
                                placeholder="*******"
                                placeholderTextColor={COLORS.primary.gray}
                                LeftIconComponent={Lock}
                                iconColor={COLORS.common.white}
                                textColor={COLORS.secondary.dark}
                                style={styles.textInputStyle}
                                secureTextEntry
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <ButtonWithIcon
                        onPress={() => console.log('Action')}
                        title="Se connecter"
                        IconComponent={Door}
                        textColor={COLORS.common.white}
                        iconSize={24}
                        iconPosition='right'
                        textStyle={styles.textButton}
                        style={styles.buttonStyle}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.common.white,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: wp('5%'),
        paddingBottom: hp('2%'),
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
      welcomeText: {
        fontFamily: FONTS.Poppins.extraBold,
        fontSize: Platform.select({
            ios: 25,
            android: 25,
            web: '25px',
        }),
        lineHeight: '160%',
        color: COLORS.common.black,
        fontWeight: 700
    },
    subText: {
        fontFamily: FONTS.Poppins.medium,
        fontSize: Platform.select({
            ios: 18,
            android: 18,
            web: '20px',
        }),
        fontWeight: 600,
        lineHeight: '160%',
        // marginTop: 1, 
        textAlign: 'center',
        color: COLORS.common.black,

    },
    divider: {
        height: hp('10%'),
    },
    containerInputs: {
        width: '100%',
    },
    groupeInputs: {
        marginBottom: hp('4%'),
    },
    labelInputs: {
        alignSelf: 'flex-start',
        marginLeft: wp('5%'),
        marginBottom: hp('1%'),
        fontFamily: FONTS.Poppins.medium,
        fontWeight: '500',
        lineHeight: 20,
        fontSize: 13,
        color: COLORS.common.black,
    },
    textInputStyle: {
        width: '90%',
        alignSelf: 'center',
    },
    buttonContainer: {
        marginBottom: hp('5%'),
        width: '100%',
        alignItems: 'center',
    },
    buttonStyle: {
        width: '90%',
    },
    textButton: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20,
        fontFamily: FONTS.Poppins
    },
});

export default Login;