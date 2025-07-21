import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../../theme/palette'
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/responsive'
import { FONTS } from '../../../theme/fonts'

const BluetoothDeviceList = ({ devices = [], onPress }) => {
  return (
    <View style={styles.containerDeviceList}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {devices.length > 0 ? (
          devices.map((device, index) => (
            <TouchableOpacity 
              key={device.id} 
              style={[
                styles.containerItem,
                index === devices.length - 1 && { borderBottomWidth: 0 } 
              ]}
              onPress={() => onPress && onPress(device)} // Appel de la fonction onPress avec l'appareil
              activeOpacity={0.7} // Optionnel : effet de transparence au clic
            >
              <Text style={styles.deviceName}>{device.name}</Text>
              <Text style={styles.deviceId}>{device.id}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun appareil trouvé</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  containerDeviceList: {
    height: verticalScale(148),
    width: horizontalScale(317),
    borderWidth: 0.5,
    borderColor: COLORS.primary.gray,
    borderRadius: 10,
    borderStyle: 'solid',
    overflow: 'hidden'
  },
  scrollContainer: {
    flexGrow: 1
  },
  containerItem: {
    flexDirection: 'row',
    width: '100%',
    minHeight: verticalScale(50),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(15),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.primary.gray,
    backgroundColor: COLORS.common.white
  },
  deviceName: {
    fontSize: moderateScale(11),
    color: '#323232',
    fontFamily: FONTS.Poppins.medium,
    fontWeight: '500',
    lineHeight: 16
  },
  deviceId: {
    fontSize: moderateScale(11),
    color: '#323232',
    fontFamily: FONTS.Poppins.medium,
    fontWeight: '500',
    lineHeight: 16,
    textAlign: 'right'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: moderateScale(14),
    color: COLORS.secondary.main,
    fontFamily: FONTS.Poppins.italic
  }
})

export default BluetoothDeviceList