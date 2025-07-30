import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { ButtonWithIcon } from '../../components/core/Buttons/Button';
import Door from '../../assets/icons/logout.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { COLORS } from '../../theme/palette';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../constant';
import { hp, wp } from '../../utils/dimensions';
import User from '../../assets/icons/user.svg';
import ReceiptAdd from '../../assets/icons/receipt-add.svg';
import Printer from '../../assets/icons/Vector.svg';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/responsive';

const Configuration = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const result = await dispatch(logout());

      if (result?.success) {
        navigation.reset({
          index: 0,
          routes: [{ name: SCREENS.LOGIN }],
        });
      } else {
        Alert.alert('Erreur', result?.error || 'Échec de la déconnexion');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur inattendue est survenue');
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.containerButton}>
          <ButtonWithIcon
            onPress={() => { navigation.navigate(SCREENS.PROFIL) }}
            title="Profil"
            IconComponent={User}
            backgroundColor={COLORS.common.white}
            textColor={COLORS.common.black}
            iconSize={24}
            iconPosition="left"
            textStyle={styles.textButton}
            style={styles.buttonStyle}
            disabled={isLoading}
            buttonStyle={styles.buttonWithoutBG}
          />

          <ButtonWithIcon
            onPress={() => { navigation.navigate('CONNECTION') }}
            title="Conexion"
            IconComponent={Printer}
            backgroundColor={COLORS.common.white}
            textColor={COLORS.common.black}
            iconSize={24}
            iconPosition="left"
            textStyle={styles.textButton}
            style={styles.buttonStyle}
            disabled={isLoading}
            buttonStyle={styles.buttonWithoutBG}
          />

          <ButtonWithIcon
            onPress={() => { navigation.navigate('SETTINGS') }}
            title="Configuration"
            IconComponent={ReceiptAdd}
            backgroundColor={COLORS.common.white}
            textColor={COLORS.common.black}
            iconSize={24}
            iconPosition="left"
            textStyle={styles.textButton}
            style={styles.buttonStyle}
            disabled={isLoading}
            buttonStyle={styles.buttonWithoutBG}
          />
        </View>
      </View>

      <View style={styles.logoutButtonContainer}>
        <ButtonWithIcon
          onPress={handleLogout}
          title="Se déconnecter"
          IconComponent={Door}
          textColor={COLORS.common.white}
          iconSize={24}
          iconPosition="right"
          textStyle={styles.textButton}
          style={styles.buttonStyle}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButton: {
    width: wp('100%'),
    height: hp('20%'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonWithoutBG: {
    width: horizontalScale(317),
    height: verticalScale(43),
    borderRadius: moderateScale(28),
    borderWidth: 1,
    borderColor: COLORS.primary.gray,
  },
  buttonStyle: {
    backgroundColor: COLORS.common.black,
    paddingVertical: 15,
    borderRadius: 8,
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButtonContainer: {
    marginBottom: 20, // Marge de 20px en bas
    width: '100%',
  },
});

export default Configuration;