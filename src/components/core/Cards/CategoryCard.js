import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/responsive'
import { FONTS } from '../../../theme/fonts'
import { COLORS } from '../../../theme/palette'

const CategoryCard = ({ 
  title = "Category", 
  isActive = false, 
  onPress = () => {} 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isActive && styles.activeContainer
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.textStyle,
        isActive && styles.activeText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CategoryCard

const styles = StyleSheet.create({
    container: {
        height: verticalScale(31),
        borderWidth: 1,
        borderColor: COLORS.primary.gray,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: horizontalScale(10),
        backgroundColor: COLORS.common.white, 
    },
    activeContainer: {
        backgroundColor: COLORS.common.black,
        borderColor: COLORS.common.black, 
    },
    textStyle: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Poppins.medium,
        fontWeight: '500',
        lineHeight: '100%',
        color: COLORS.common.black,
        paddingHorizontal: horizontalScale(2), 
    },
    activeText: {
        color: COLORS.common.white, 
    }
})