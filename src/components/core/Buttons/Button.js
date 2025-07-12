import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import { COLORS } from '../../../theme/palette';
import { SvgXml } from 'react-native-svg';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/responsive';

export const PrimaryButton = ({
    onPress,
    haveBackground = true,
    title = "Button",
    loading = false,
    disabled = false,
    backgroundColor = COLORS.secondary.dark,
    textColor = COLORS.primary.contrastText
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.primaryButton,
                { backgroundColor: haveBackground ? backgroundColor : 'transparent' },
                !haveBackground && styles.noBackground,
                disabled && styles.disabled
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <Text style={[
                    styles.text,
                    { color: textColor },
                    !haveBackground && styles.textOutline
                ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export const SmallButton = ({
    onPress,
    haveBackground = true,
    title = "Button",
    loading = false,
    disabled = false,
    backgroundColor = COLORS.secondary.dark,
    textColor = COLORS.primary.contrastText,
    width = 108
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.smallButton,
                {
                    backgroundColor: haveBackground ? backgroundColor : 'transparent',
                    width: width
                },
                !haveBackground && styles.noBackground,
                disabled && styles.disabled
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={textColor} size="small" />
            ) : (
                <Text style={[
                    styles.smallText,
                    { color: textColor },
                    !haveBackground && styles.textOutline
                ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  primaryButton: {
    height: verticalScale(44),
    minWidth: horizontalScale(332),
    borderRadius: moderateScale(28),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(20),
  },
  smallButton: {
    height: verticalScale(41),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(15),
  },
  button: {
    height: verticalScale(44),
    minWidth: horizontalScale(332),
    borderRadius: moderateScale(28),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(20),
    flexDirection: 'row',
  },
  text: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  smallText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
  iconLeft: {
    marginRight: horizontalScale(15),
  },
  iconRight: {
    marginLeft: horizontalScale(15),
  },
});