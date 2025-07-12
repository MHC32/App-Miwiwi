import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/palette';

export const Loader = ({
  size = 'medium', 
  color = COLORS.primary.main,
  overlay = false,
  overlayColor = 'rgba(0,0,0,0.4)',
  customStyle = {}
}) => {
  const getSize = () => {
    if (typeof size === 'string') {
      switch (size) {
        case 'small': return 20;
        case 'large': return 40;
        default: return 30;
      }
    }
    return size;
  };

  return (
    <View style={[
      styles.container,
      overlay && styles.overlay,
      overlay && { backgroundColor: overlayColor },
      customStyle
    ]}>
      <ActivityIndicator 
        size={getSize()} 
        color={color} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});