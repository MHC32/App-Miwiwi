import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import { wp, hp } from '../../utils/dimensions';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/responsive';
import { COLORS } from '../../theme/palette';
import { FONTS } from '../../theme/fonts';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/authSlice';
import { selectCurrentCompany } from '../../store/slices/storeSlice';
import EmployeeProfile from '../../components/app/profile/EmployeeProfile';
import { ButtonWithIcon } from '../../components/core/Buttons/Button';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { SCREENS } from '../../constant';
import Door from '../../assets/icons/logout.svg';

const Profil = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const currentCompany = useSelector(selectCurrentCompany);
  console.log('men current user', currentUser);
  console.log('men current company', currentCompany);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

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
    <View style={{ flex: 1, backgroundColor: COLORS.common.white }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: wp('4%') }}>
            <ArrowLeft width={41} height={37} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.content}>
          <EmployeeProfile employeeData={{
            employee: currentUser?.name || 'John Doe',
            adresse: currentUser?.address || '123 Rue Example',
            adresseStore: currentCompany?.address || '456 Store Address',
            statutEmployé: 'Actif',
            identifiant: currentUser?.id || '50933340014'
          }} />
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
            buttonStyle={styles.buttonStyle}
            disabled={isLoading}
          />
        </View>
      </View>
    </View>
  )
}

export default Profil

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
    height: hp('5%'),
    marginTop: hp('3%'),
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: moderateScale(16),
    fontFamily: FONTS.Poppins.extraBold,
    fontWeight: '700',
    lineHeight: '100%',
    color: '#000',
    marginLeft: wp('24%')
  },
  divider: {
    width: '100%',
    height: hp('10%'),
    backgroundColor: COLORS.common.white,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: wp('4%'),
  },
  logoutButtonContainer: {
    width: '100%',
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'), // 20px margin bottom
  },
  buttonStyle: {
    width: horizontalScale(325),
    height: verticalScale(58),
  },
  textButton: {
    fontSize: moderateScale(14),
    fontFamily: FONTS.Poppins.semiBold,
  }
})