import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import { wp, hp } from '../../utils/dimensions';
import { FONTS } from '../../theme/fonts';
import { COLORS } from '../../theme/palette';
import { useSelector } from 'react-redux';
import { selectCurrentStore } from '../../store/slices/storeSlice';
import Ticket from '../../assets/icons/receipt-add-black.svg';
import TicketList from '../../assets/icons/receipt-text.svg'
import { ButtonWithIcon } from '../../components/core/Buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, horizontalScale, verticalScale } from '../../utils/responsive';

const Home = () => {
  const currentStore = useSelector(selectCurrentStore);
  const navigation = useNavigation()
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  console.log('men height', height);
  console.log('neb width', width);

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.textWelcome}>Bienvenue,</Text>
        <Text style={styles.textName}>{currentStore?.name || 'Sélectionnez un magasin'}</Text>
      </View>

      <View style={styles.containerImage}>
        <Image
          source={{ uri: currentStore?.photo }}
          style={{ width: '100%', height: '100%', borderRadius: moderateScale(15) }}
          resizeMode="cover"
        />
      </View>

      <ButtonWithIcon
        title="créer un ticket"
        IconComponent={Ticket}
        textColor={COLORS.common.black}
        iconSize={moderateScale(24)}
        iconPosition='left'
        buttonStyle={styles.buttonStyle1}
        textStyle={styles.textButton}
        onPress={() => navigation.navigate('TICKET_CREATION')}
        iconColor={COLORS.common.white}
      />

      <ButtonWithIcon
        title="liste ticket"
        IconComponent={TicketList}
        textColor={COLORS.common.black}
        iconSize={moderateScale(24)}
        iconPosition='left'
        buttonStyle={styles.buttonStyle2}
        textStyle={styles.textButton}
        onPress={() => null}
        iconColor={COLORS.common.white}
        
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.common.white,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },

  containerText: {
    marginVertical: verticalScale(48),
    width: '100%',
    height: '10%',
    paddingLeft: horizontalScale(25),
  },

  textWelcome: {
    fontFamily: FONTS.Poppins.bold,
    fontSize: moderateScale(22),
    fontWeight: '700',
    lineHeight: moderateScale(35),
    color: COLORS.common.black,
  },

  textName: {
    fontFamily: FONTS.Poppins.semiBold,
    fontWeight: '600',
    fontSize: moderateScale(18),
    lineHeight: moderateScale(30),
    color: COLORS.common.black,
  },

  containerImage: {
    width: wp('80%'),
    height: hp('30%'),
    marginTop: verticalScale(20),
    borderWidth: moderateScale(1),
    borderColor: COLORS.primary.gray,
    borderRadius: moderateScale(15)
  },

  buttonStyle1: {
    backgroundColor: COLORS.primary.white,
    marginTop: verticalScale(76),

  },

   buttonStyle2: {
    backgroundColor: COLORS.primary.white,
    marginTop: verticalScale(15),

  }


})

export default Home