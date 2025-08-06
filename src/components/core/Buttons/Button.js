import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import { COLORS } from '../../../theme/palette';
import { SvgXml } from 'react-native-svg';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/responsive';
import { FONTS } from '../../../theme/fonts';
import { hp, wp } from '../../../utils/dimensions';


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
    textColor = COLORS.common.black,
    width = 130
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

export const ButtonWithIcon = ({
  onPress,
  title = "Button",
  loading = false,
  disabled = false,
  backgroundColor = COLORS.secondary.dark,
  textColor = COLORS.primary.contrastText,
  IconComponent,
  iconPosition = 'left',
  iconColor = undefined,
  strokeColor= undefined,
  iconSize = 20,
  buttonStyle = {},
  textStyle = {}
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        disabled && styles.disabled,
        buttonStyle
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {iconPosition === 'left' && IconComponent && (
            <View style={[styles.iconContainer, styles.iconLeft]}>
              <IconComponent
                width={iconSize}
                height={iconSize}
                fill={iconColor}
                stroke={strokeColor}
              />
            </View>
          )}
          
          <Text style={[
            styles.text, 
            { color: textColor },
            textStyle
          ]}>
            {title}
          </Text>

          {iconPosition === 'right' && IconComponent && (
            <View style={[styles.iconContainer, styles.iconRight]}>
              <IconComponent
                width={iconSize}
                height={iconSize}
                fill={iconColor}
                stroke={strokeColor}
              />
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};




const styles = StyleSheet.create({
  primaryButton: {
    height: verticalScale(43),
    minWidth: horizontalScale(317),
    borderRadius: moderateScale(28),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(20),
  },
  smallButton: {
    height: verticalScale(43),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(15),
    borderWidth: 1,
    borderColor: COLORS.primary.gray
  },
  
  smallText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    fontFamily: FONTS.Poppins.semiBold,
    lineHeight: '100%',
  },
 button: {
    height: hp('7.9%'),
    width: wp('79%'),
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.primary.gray,
    
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: 15,
  },
  iconRight: {
    marginLeft: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});