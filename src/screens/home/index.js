import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { wp, hp } from '../../utils/dimensions';
import { FONTS } from '../../theme/fonts';
import { COLORS } from '../../theme/palette';
import { useSelector } from 'react-redux';
import { selectCurrentStore } from '../../store/slices/storeSlice';
import BluetoothDeviceList from '../../components/app/bluetooth/BluetoothDeviceList';

const Home = () => {
  const mockDevices = [
    { id: '00:11:22:33:AA:BB', name: 'Printer A' },
    { id: '00:11:22:33:CC:DD', name: 'Scanner B' },
    { id: '00:11:22:33:EE:FF', name: 'Speaker C' },
    { id: '00:11:22:33:GG:HH', name: 'Keyboard D' },
  ];
  const currentStore = useSelector(selectCurrentStore);
  console.log('Current Store:', currentStore);

  return (
    <View style={styles.container}>
      <BluetoothDeviceList 
      devices={mockDevices} 
      onPress={() => {
    console.log("Appareil sélectionné:");
  }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.common.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: wp('15%'),
    width: wp('100%'),
  },
  title: {
    fontFamily: FONTS.Poppins.extraBold,
    fontSize: 25,
    fontWeight: '700',
    lineHeight: '160%',
    color: COLORS.common.black,
    marginLeft: wp('5%'),
  },
  storeName: {
    fontFamily: FONTS.Poppins.semiBold,
    fontSize: 20,
    color: COLORS.primary.main,
    marginLeft: wp('5%'),
    marginTop: hp('1%'),
  }
})

export default Home