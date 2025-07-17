import React from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../theme/palette';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/responsive';

export const TextInputPrimary = ({
  placeholder = '',
  placeholderColor = '#BCBCBC', // Couleur dynamique du placeholder
  LeftIconComponent,
  RightIconComponent,
  onLeftIconPress,
  onRightIconPress,
  iconColor = COLORS.secondary.dark,
  iconSize = 20,
  inputStyle = {},
  containerStyle = {},
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Icône gauche - toujours alignée au début */}
      {LeftIconComponent && (
        <View style={styles.leftIconContainer}>
          <TouchableOpacity 
            onPress={onLeftIconPress}
            disabled={!onLeftIconPress}
          >
            <LeftIconComponent
              width={iconSize}
              height={iconSize}
              fill={iconColor}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Champ de texte */}
      <TextInput
        style={[
          styles.inputStyle,
          { color: props.textColor || COLORS.primary.main }, // Couleur du texte dynamique
          inputStyle
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor} // Couleur dynamique
        {...props}
      />

      {/* Icône droite - optionnelle */}
      {RightIconComponent && (
        <TouchableOpacity 
          onPress={onRightIconPress}
          style={styles.rightIcon}
          disabled={!onRightIconPress}
        >
          <RightIconComponent
            width={iconSize}
            height={iconSize}
            fill={iconColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: horizontalScale(325),
    height: verticalScale(52),
    borderRadius: moderateScale(28),
    borderWidth: 1,
    borderColor: '#BCBCBC',
    backgroundColor: COLORS.common.white,
    paddingHorizontal: horizontalScale(15),
  },
  inputStyle: {
    flex: 1,
    height: '100%',
    fontSize: moderateScale(16),
    marginLeft: horizontalScale(10),
    marginRight: horizontalScale(10),
  },
  leftIconContainer: {
    marginRight: horizontalScale(10),
  },
  rightIcon: {
    marginLeft: horizontalScale(10),
  },
});