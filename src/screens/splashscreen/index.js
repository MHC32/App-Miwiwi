import { View, Text } from 'react-native'
import React from 'react'
import { Loader } from '../../components/core/Feedback/Loader'
import { COLORS } from '../../theme/palette';

const SplashScreen = () => {
  return (
    <Loader
        size="large"
        color={COLORS.common.black}
        overlay={true}
        overlayColor="rgba(255, 255, 255, 0.8)"
        customStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}           
    />
  )
}

export default SplashScreen