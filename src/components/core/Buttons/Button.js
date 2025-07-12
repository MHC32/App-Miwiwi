import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import { COLORS } from '../../theme/palette';
import { SvgXml } from 'react-native-svg';

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

export const ButtonWithIcon = ({
  onPress,
  title = "Button",
  loading = false,
  disabled = false,
  backgroundColor = COLORS.secondary.dark,
  textColor = COLORS.primary.contrastText,
  IconComponent, // Composant SVG importé directement
  iconPosition = 'left',
  iconColor = COLORS.primary.contrastText,
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
        height: 44,
        minWidth: 332,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },

    smallButton: {
        height: 41,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    smallText: {
        fontSize: 11,
        fontWeight: '600'
    },

    button: {
        height: 44,
        minWidth: 332,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconLeft: {
        marginRight: 15,
    },
    iconRight: {
        marginLeft: 15,
    },

    noBackground: {
        borderWidth: 1,
        borderColor: COLORS.secondary.dark
    },
    disabled: {
        opacity: 0.5
    },
    text: {
        fontSize: 16,
        fontWeight: '600'
    },
    textOutline: {
        color: COLORS.secondary.dark
    }
});