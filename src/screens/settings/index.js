import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { wp, hp } from '../../utils/dimensions'
import { FONTS } from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import { moderateScale } from '../../utils/responsive';
import { COLORS } from '../../theme/palette';
import { useSelector } from 'react-redux';
import { selectCurrentStore } from '../../store/slices/storeSlice';

const TITLE = [
  { title: 'Store', label: 'Store' },
  { title: 'TextFiche', screen: 'Text Fiche' },
]

const Settings = () => {
  const navigation = useNavigation();
  const currentStore = useSelector(selectCurrentStore);
  
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.common.white }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: wp('4%') }}>
            <ArrowLeft width={41} height={37} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Configuration</Text>
        </View>

        <View style={styles.divider} />

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
    </View>
  )
}

export default Settings

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
  table: {
    width: wp('80%'),
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
  }
})