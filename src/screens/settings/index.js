import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import { wp, hp } from '../../utils/dimensions'
import { FONTS } from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import { COLORS } from '../../theme/palette';
import { useSelector } from 'react-redux';
import { selectCurrentStore } from '../../store/slices/storeSlice';
import { ButtonWithIcon } from '../../components/core/Buttons/Button';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { SCREENS } from '../../constant';
import Door from '../../assets/icons/logout.svg';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/responsive';

const TITLE = [
  { title: 'Store', label: 'Store' },
  { title: 'TextFiche', screen: 'Text Fiche' },
]

const Settings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentStore = useSelector(selectCurrentStore);
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
  
  const getContent = (title) => {
    switch(title) {
      case 'Store':
        return currentStore.name;
      case 'TextFiche':
        return 'Merci de nous avoir choisi\nPassez une bonne journée';
      default:
        return '';
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.common.white }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: wp('4%') }}>
            <ArrowLeft width={41} height={37} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Configuration</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.content}>
          <View style={styles.table}>
            {TITLE.map((item, index) => (
              <View 
                key={item.title}
                style={[
                  styles.containerText, 
                  index !== TITLE.length - 1 && { borderBottomColor: COLORS.primary.gray, borderBottomWidth: 0.5 }
                ]}
              >
                <Text style={styles.TextTitle}>{item.label || item.screen}</Text>
                <Text 
                  style={[
                    styles.textValue,
                    item.title === 'TextFiche' && styles.textMultiLine
                  ]}
                  numberOfLines={item.title === 'TextFiche' ? 2 : 1}
                  ellipsizeMode="tail"
                >
                  {getContent(item.title)}
                </Text>
              </View>
            ))}
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
            buttonStyle={styles.buttonStyle}
            disabled={isLoading}
          />
        </View>
      </View>
    </View>
  )
}

export default Settings

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
    paddingHorizontal: wp('10%'),
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.primary.gray,
    borderRadius: moderateScale(9),
  },
  containerText: {
    flexDirection: 'row',
    minHeight: hp('10%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
  },
  TextTitle: {
    fontFamily: FONTS.Poppins.bold,
    fontSize: moderateScale(11),
    fontWeight: '700',
    lineHeight: '100%',
  },
  textValue: {
    fontFamily: FONTS.Poppins.medium,
    fontSize: moderateScale(11),
    fontWeight: '500',
    lineHeight: '100%',
    color: '#595959',
    flexShrink: 1,
    maxWidth: '60%',
  },
  textMultiLine: {
    textAlign: 'right',
    flexShrink: 1,
    maxWidth: '70%',
  },
  logoutButtonContainer: {
    width: '100%',
    paddingHorizontal: wp('10%'),
    marginBottom: hp('2%'),
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