import React, {useEffect} from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  loginStep1,
  selectAuthLoading,
  selectAvailableStores,
  clearError,
  selectAuthError
} from '../../store/slices/authSlice';
import { COLORS } from '../../theme/palette';
import { FONTS } from '../../theme/fonts';
import { hp, wp } from '../../utils/dimensions';
import { TextInputPrimary } from '../../components/core/Inputs/TextInput';
import { ButtonWithIcon } from '../../components/core/Buttons/Button';
import { Loader } from '../../components/core/Feedback/Loader';
import { AlertBanner } from '../../components/core/Feedback/AlertBanner';
import { SCREENS }  from '../../constant';
import Call from '../../assets/icons/call.svg';
import Lock from '../../assets/icons/lock.svg';
import Door from '../../assets/icons/login.svg';
import { horizontalScale, verticalScale } from '../../utils/responsive';

// Schéma de validation avec Yup
const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .required('Le téléphone est obligatoire')
    .matches(/^[0-9]{8,}$/, 'Format de téléphone invalide'),
  password: Yup.string()
    .required('Le mot de passe est obligatoire')
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(selectAuthLoading);
  const stores = useSelector(selectAvailableStores);
  const error = useSelector(selectAuthError);
  console.log('[Login] Stores disponibles:', stores);

  React.useEffect(() => {
    if (stores?.length > 0) {
      console.log('Navigation vers STORE_SELECTION déclenchée');
      navigation.replace(SCREENS.STORE_SELECTION);
    }
  }, [navigation,stores]); // ← Déclenché à chaque changement de stores

  const handleLogin = async (values) => {
    try {
      await dispatch(loginStep1(values.phone, values.password));
      // Supprimez la vérification ici, elle est maintenant dans useEffect
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  // ⚠️ Supprimez tout useEffect surveillant `stores`

  return (
    <>
      {isLoading && <Loader overlay />}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hp('2%') : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            initialValues={{ phone: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <View style={styles.content}>
                  {error && (
                    <AlertBanner
                      message={error}
                      backgroundColor={COLORS.alert.negative}
                      textColor={COLORS.alert.negativeDark}
                      style={styles.globalError}
                    />
                  )}

                  <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>Bienvenue,</Text>
                    <Text style={styles.subText}>connectez-vous à votre compte</Text>
                  </View>
                  <View style={styles.divider} />

                  <View style={styles.containerInputs}>
                    <View style={styles.groupeInputs}>
                      <Text style={styles.labelInputs}>Téléphone</Text>
                      <TextInputPrimary
                        value={values.phone}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        placeholder="33340014"
                        placeholderTextColor={COLORS.primary.gray}
                        LeftIconComponent={Call}
                        iconColor={COLORS.common.white}
                        textColor={COLORS.secondary.dark}
                        style={styles.textInputStyle}
                        keyboardType="phone-pad"
                      />
                      {touched.phone && errors.phone && (
                        <AlertBanner
                          message={errors.phone}
                          backgroundColor={COLORS.alert.negative}
                          textColor={COLORS.alert.negativeDark}
                          style={styles.fieldError}
                        />
                      )}
                    </View>
                    <View style={styles.groupeInputs}>
                      <Text style={styles.labelInputs}>Mot de passe</Text>
                      <TextInputPrimary
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        placeholder="*******"
                        placeholderTextColor={COLORS.primary.gray}
                        LeftIconComponent={Lock}
                        iconColor={COLORS.common.white}
                        textColor={COLORS.secondary.dark}
                        style={styles.textInputStyle}
                        secureTextEntry
                      />
                      {touched.password && errors.password && (
                        <AlertBanner
                          message={errors.password}
                          backgroundColor={COLORS.alert.negative}
                          textColor={COLORS.alert.negativeDark}
                          style={styles.fieldError}
                        />
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <ButtonWithIcon
                    onPress={handleSubmit}
                    title="Se connecter"
                    IconComponent={Door}
                    textColor={COLORS.common.white}
                    iconSize={24}
                    iconPosition='right'
                    textStyle={styles.textButton}
                    buttonStyle={styles.buttonStyle}
                    disabled={isLoading}
                  />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
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
    fontSize: 25,
    lineHeight: '160%',
    color: COLORS.common.black,
    fontWeight: 700
  },
  subText: {
    fontFamily: FONTS.Poppins.medium,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '160%',
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
    marginBottom: hp('1%'),
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
    width: horizontalScale(325),
    height: verticalScale(58),
  },
  textButton: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FONTS.Poppins
  },
  globalError: {
    width: 'auto',
    alignSelf: 'center',
    marginBottom: hp('2%'),
  },
  fieldError: {
    width: 'auto',

    marginTop: hp('0.5%'),
    marginBottom: hp('1%'),
  },
});

export default Login;