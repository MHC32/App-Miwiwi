// bluetoothManager.js
import { bluetoothStorage } from '../helpers/index';
import { BluetoothManager } from 'react-native-bluetooth-escpos-printer';

export const connectAndSaveDevice = async (device) => {
  try {
    await BluetoothManager.connect(device.address);
    
    await bluetoothStorage.saveConnectedDevice(device);
    
    return true;
  } catch (error) {
    console.error('Connection failed:', error);
    await bluetoothStorage.clearBluetoothData();
    return false;
  }
};

export const initializeBluetooth = async () => {
  try {

    const isEnabled = await BluetoothManager.isBluetoothEnabled();
    if (!isEnabled) return null;

    const lastDevice = await bluetoothStorage.getConnectedDevice();
    if (!lastDevice) return null;

    const connected = await connectAndSaveDevice(lastDevice);
    return connected ? lastDevice : null;
  } catch (error) {
    console.error('Initialization error:', error);
    return null;
  }
};