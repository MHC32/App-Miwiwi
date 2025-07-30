import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { wp, hp } from '../../utils/dimensions';
import { moderateScale } from '../../utils/responsive';
import { COLORS } from '../../theme/palette';
import { FONTS } from '../../theme/fonts';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import { useNavigation } from '@react-navigation/native';



const Profil = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.common.white }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: wp('4%') }}>
            <ArrowLeft width={41} height={37} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
        </View>
      </View>
    </View>
  )
}

export default Profil

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: wp('100%'),
    height: hp('5%'),
    marginTop: hp('3%'),
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: moderateScale(16),
    fontFamily: FONTS.Poppins.extraBold,
    fontWeight: 700,
    lineHeight: '100%',
    color: '#000',
    marginLeft: wp('24%')
  },
  divider: {
    width: wp('100%'),
    height: hp('10%'),
    backgroundColor: COLORS.common.white,
  },
})