import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform, ToastAndroid, DeviceEventEmitter } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import { Loader } from '../../components/core/Feedback/Loader';
import { hp, wp } from '../../utils/dimensions';
import { COLORS } from '../../theme/palette';
import { FONTS } from '../../theme/fonts';
import BluetoothDeviceList from '../../components/app/bluetooth/BluetoothDeviceList';
import { SmallButton, PrimaryButton } from '../../components/core/Buttons/Button';
import { Storage } from '../../helpers';
import PrimarySwitch from '../../components/core/Switches/PrimarySwitch';
import { SCREENS } from '../../constant';
import { horizontalScale } from '../../utils/responsive';

const Connection = () => {
    const navigation = useNavigation();
    const [isBluetoothOn, setIsBluetoothOn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pairedDevices, setPairedDevices] = useState([]);
    const [foundDevices, setFoundDevices] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState(null);
    const listenersRef = useRef([]);
    const [scanTimeout, setScanTimeout] = useState(60);
    const scanIntervalRef = useRef(null);

    const setupBluetoothListeners = useCallback(() => {
        listenersRef.current.forEach(listener => listener.remove());
        listenersRef.current = [];

        const pairedListener = DeviceEventEmitter.addListener(
            'BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED',
            (rsp) => {
                const devices = JSON.parse(rsp.devices);
                setPairedDevices(devices);
            }
        );

        const foundListener = DeviceEventEmitter.addListener(
            'BluetoothManager.EVENT_DEVICE_FOUND',
            (rsp) => {
                const device = JSON.parse(rsp.devices);
                setFoundDevices(prev => [...prev, device]);
            }
        );

        listenersRef.current = [pairedListener, foundListener];
    }, []);

    const checkExistingPrinter = useCallback(async () => {
        const printerAddress = await Storage.get('printerAddress');
        if (printerAddress) {
            try {
                setLoading(true);
                
                if (!isBluetoothOn) {
                    await BluetoothManager.enableBluetooth();
                    setIsBluetoothOn(true);
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
                
                try {
                    await BluetoothManager.connect(printerAddress);
                    setConnectedDevice({ address: printerAddress });
                    await BluetoothEscposPrinter.printerInit();
                    await BluetoothEscposPrinter.printText('\n', {});
                    
                    ToastAndroid.show('Imprimante reconnectée avec succès', ToastAndroid.LONG);
                    navigation.navigate(SCREENS.HOME_SCREEN);
                    return;
                    
                } catch (connectError) {
                    console.error('Erreur de connexion:', connectError);
                    throw new Error('Échec de connexion');
                }
                
            } catch (error) {
                console.error('Erreur reconnexion imprimante:', error);
                ToastAndroid.show(
                    'Échec reconnexion imprimante. Veuillez reconfigurer.',
                    ToastAndroid.LONG
                );
                await Storage.remove('printerAddress');
            } finally {
                setLoading(false);
            }
        }
    }, [navigation, isBluetoothOn]);

    const checkBluetoothStatus = useCallback(() => {
        BluetoothManager.isBluetoothEnabled()
            .then((enabled) => {
                setIsBluetoothOn(enabled);
            })
            .catch((error) => {
                console.error("Bluetooth check error:", error);
                ToastAndroid.show("Erreur de vérification Bluetooth", ToastAndroid.SHORT);
            });
    }, []);

    useEffect(() => {
        checkExistingPrinter();
        checkBluetoothStatus();
        setupBluetoothListeners();

        return () => {
            listenersRef.current.forEach(listener => listener.remove());
        };
    }, [checkExistingPrinter, checkBluetoothStatus, setupBluetoothListeners]);

    const scanDevices = useCallback(async () => {
        if (!isBluetoothOn) return;
        
        setLoading(true);
        setFoundDevices([]);
        
        try {
            const result = await BluetoothManager.scanDevices();
            const { paired = [], found = [] } = JSON.parse(result);
            setPairedDevices(paired);
            setFoundDevices(found);
        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    }, [isBluetoothOn]);

    useEffect(() => {
        if (isBluetoothOn) {
            scanDevices();
        } else {
            setPairedDevices([]);
            setFoundDevices([]);
        }
    }, [isBluetoothOn, scanDevices]);

    const toggleBluetooth = useCallback(async (enable) => {
        setLoading(true);
        try {
            if (enable) {
                await BluetoothManager.enableBluetooth();
                setIsBluetoothOn(true);
            } else {
                await BluetoothManager.disableBluetooth();
                setIsBluetoothOn(false);
            }
        } catch (error) {
            console.error(`Bluetooth ${enable ? 'enable' : 'disable'} error:`, error);
            ToastAndroid.show(`Échec de ${enable ? 'l\'activation' : 'la désactivation'} Bluetooth`, ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    }, []);

    const connectToDevice = useCallback(async (device) => {
        setLoading(true);
        try {
            await BluetoothManager.connect(device.address);
            setConnectedDevice(device);
            ToastAndroid.show(`Connecté à ${device.name}`, ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show('Échec de connexion: ' + error.message, ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    }, []);

    const testPrint = useCallback(async () => {
        if (!connectedDevice) {
            ToastAndroid.show('Aucun appareil connecté', ToastAndroid.SHORT);
            return;
        }

        setLoading(true);
        try {
            await BluetoothEscposPrinter.printerInit();
            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
            
            await BluetoothEscposPrinter.printText('TEST D\'IMPRESSION\n', {
                encoding: 'GBK',
                widthtimes: 2,
                heigthtimes: 2,
                fonttype: 1,
            });
            
            await BluetoothEscposPrinter.printText("----------------\n", {});
            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
            await BluetoothEscposPrinter.printText(`Appareil: ${connectedDevice.name}\n`, {});
            await BluetoothEscposPrinter.printText(`Date: ${new Date().toLocaleString()}\n`, {});
            await BluetoothEscposPrinter.printText(`Test d'impression réussi`, {});
            await BluetoothEscposPrinter.printText("\n\n\n", {});
            
            ToastAndroid.show('Impression réussie!', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Erreur impression:', error);
            ToastAndroid.show('Échec de l\'impression: ' + error.message, ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    }, [connectedDevice]);

    const handleConfigure = useCallback(async () => {
        if (!connectedDevice) {
            ToastAndroid.show('Aucun appareil connecté', ToastAndroid.SHORT);
            return;
        }

        setLoading(true);
        try {
            await Storage.store('printerAddress', connectedDevice.address);
            ToastAndroid.show('Imprimante configurée avec succès', ToastAndroid.SHORT);
            navigation.navigate(SCREENS.HOME_SCREEN);
        } catch (error) {
            ToastAndroid.show('Erreur lors de la configuration: ' + error.message, ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    }, [connectedDevice, navigation]);

    const requestPermissions = useCallback(async () => {
        if (Platform.OS === 'android' && Platform.Version >= 31) {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ]);

                return (
                    granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED
                );
            } catch (err) {
                console.warn('Permission error:', err);
                return false;
            }
        }
        return true;
    }, []);

    if (loading) {
        return <Loader
            size="large"
            color={COLORS.common.black}
            overlay={true}
            overlayColor="rgba(255, 255, 255, 0.8)"
        />;
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft width={41} height={37} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Connexion</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.containerSwitch}>
                        <Text style={styles.textBluetooth}>Activer Bluetooth</Text>
                        <PrimarySwitch
                            value={isBluetoothOn}
                            onValueChange={toggleBluetooth}
                        />
                    </View>

                    <View style={styles.containerText}>
                        <Text style={styles.text1}>Appareils Disponibles </Text>
                        <Text>(Appuyer pour connecter)</Text>
                    </View>
                    <BluetoothDeviceList
                        devices={foundDevices}
                        onPress={connectToDevice}
                    />
                    <View style={styles.dividerTable} />
                    <View style={styles.containerText}>
                        <Text style={styles.text1}>Appareils Associés</Text>
                    </View>
                    <BluetoothDeviceList
                        devices={pairedDevices}
                        onPress={connectToDevice}
                    />

                    <View style={styles.containnerButton}>
                        <SmallButton
                            title="Test Print"
                            onPress={testPrint}
                            haveBackground={false}
                        />
                        <SmallButton
                            title="Configurer"
                            haveBackground={false}
                            onPress={handleConfigure}
                        />
                    </View>
                </View>

                <View style={styles.bottomButtonContainer}>
                    <PrimaryButton
                        title="Configurer sans printer"
                        onPress={() => {
                            Storage.remove('printerAddress');
                            navigation.navigate(SCREENS.HOME_SCREEN);
                        }}
                        haveBackground={true}
                        style={styles.bottomButton}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.common.white,
    },
    container: {
        flex: 1,
        paddingHorizontal: wp('5%'),
    },
    content: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: hp('5%'),
        marginTop: hp('3%'),
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: FONTS.Poppins.extraBold,
        fontWeight: '700',
        lineHeight: '100%',
        color: '#000',
        marginLeft: wp('24%')
    },
    containerSwitch: {
        marginTop: hp('5%'),
        width: '100%',
        height: hp('8%'),
        flexDirection: 'row',
        alignItems: 'center',
        gap: horizontalScale(30),
    },
    textBluetooth: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: FONTS.Poppins.semiBold,
        lineHeight: '100%',
    },
    containerText: {
        height: hp('4%'),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    text1: {
        fontFamily: FONTS.Poppins.semiBold,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: '100%',
        marginRight: wp('2%'),
    },
    text2: {
        fontFamily: FONTS.Poppins.medium,
        fontSize: 10,
        fontWeight: '500',
        lineHeight: '100%',
    },
    dividerTable: {
        width: '100%',
        height: hp('2%'),
    },
    containnerButton: {
        width: '100%',
        height: hp('10%'),
        flexDirection: 'row',
        marginTop: hp('5%'),
        justifyContent: 'space-around',
    },
    bottomButtonContainer: {
        width: '100%',
        paddingBottom: hp('2%'),
        alignItems: 'center',
    },
    bottomButton: {
        width: wp('90%'),
    }
});

export default Connection;