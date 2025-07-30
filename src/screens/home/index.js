import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { wp, hp } from '../../utils/dimensions';
import { FONTS } from '../../theme/fonts';
import { COLORS } from '../../theme/palette';
import { useSelector } from 'react-redux';
import { selectCurrentStore } from '../../store/slices/storeSlice';
import Ticket from '../../assets/icons/receipt-add.svg';
import { ButtonWithIcon } from '../../components/core/Buttons/Button';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  const currentStore = useSelector(selectCurrentStore);
  const navigation = useNavigation()

  console.log('Current Store:', currentStore);



  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <Text style={styles.title}>Bienvenue,</Text>
      <Text style={styles.storeName}>{currentStore?.name || 'Sélectionnez un magasin'}</Text>
      <View style={styles.divider} />
      <View style={styles.containerImage}>
        <Image
          source={{ uri: currentStore?.photo }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.divider} />

      <ButtonWithIcon
        title="créer un ticket"
        IconComponent={Ticket}
        textColor={COLORS.common.black}
        iconSize={24}
        iconPosition='left'
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textButton}
        />

      <ButtonWithIcon
        title="liste ticket"
        IconComponent={Ticket}
        textColor={COLORS.common.black}
        iconSize={24}
        iconPosition='left'
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textButton}
        onPress={()=> navigation.navigate('CONNECTION')}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.common.white,
    padding: wp('5%'),
  },
  divider: {
    height: wp('15%'),
    width: wp('100%'),
  },
  title: {
    fontFamily: FONTS.Poppins.extraBold,
    fontSize: 25,
    fontWeight: '700',
    lineHeight: '160%',
    color: COLORS.common.black,
    marginLeft: wp('5%'),
  },
  storeName: {
    fontFamily: FONTS.Poppins.semiBold,
    fontSize: 20,
    color: COLORS.primary.main,
    marginLeft: wp('5%'),
    marginTop: hp('1%'),
  },
  containerImage: {
    width: wp('80%'),
    height: hp('30%'),
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: hp('2%'),
    borderWidth: 0.5,
    borderColor: COLORS.common.gray,
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: COLORS.common.white,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary.gray,
    width: 250,
    height: 58,
    alignSelf: 'center',
    marginBottom: hp('2%'),
  },
})

export default Home