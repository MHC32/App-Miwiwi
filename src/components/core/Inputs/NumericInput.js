import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../theme/palette';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/responsive';

export const NumericInput = ({
  value,
  onChangeText,
  placeholder = '',
  placeholderColor = COLORS.secondary.light,
  borderColor = COLORS.alert.negative,
  backgroundColor = COLORS.common.white,
  textColor = COLORS.primary.main,
  maxLength = 2,
  keyboardType = 'numeric',
  inputStyle = {},
  containerStyle = {},
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle, { borderColor, backgroundColor }]}>
      <TextInput
        style={[styles.numericInput, { color: textColor }, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        maxLength={maxLength}
        keyboardType={keyboardType}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(49),
    height: verticalScale(32),
    borderRadius: moderateScale(6),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numericInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: moderateScale(16),
  },
});