import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/palette';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/responsive';

export const AlertBanner = ({
  message = "Le montant ......",
  backgroundColor = COLORS.alert.negative, 
  textColor = COLORS.alert.negativeDark,
  fontSize = 8, 
  borderRadius = 11, 
  height = 18, 
  width = 110, 
  style = {}, 
  textStyle = {},
  ...props 
}) => {
  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor,
          borderRadius,
          height,
          width 
        },
        style
      ]}
      {...props}
    >
      <Text style={[
        styles.textAlert, 
        { 
          color: textColor,
          fontSize 
        },
        textStyle
      ]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(110),
    height: verticalScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(11),
    paddingHorizontal: horizontalScale(8),
  },
  textAlert: {
    fontSize: moderateScale(8),
    fontWeight: '500',
    textAlign: 'center',
  },
});