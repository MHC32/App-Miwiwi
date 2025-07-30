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
        // Clean up existing listeners
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
            
            // On ne peut pas lister directement les appareils appairés, donc on:
            // 1. Active le Bluetooth si nécessaire
            if (!isBluetoothOn) {
                await BluetoothManager.enableBluetooth();
                setIsBluetoothOn(true);
            }
            
            // 2. Lance une recherche pour déclencher EVENT_DEVICE_ALREADY_PAIRED
            await BluetoothManager.scanDevices();
            
            // 3. On attend un peu que les appareils appairés soient détectés
            // (ils seront reçus via l'event listener déjà configuré)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // 4. On vérifie si l'appareil sauvegardé est dans pairedDevices
            const existingPrinter = pairedDevices.find(device => device.address === printerAddress);
            
            if (existingPrinter) {
                // Tentative de connexion
                await BluetoothManager.connect(printerAddress);
                setConnectedDevice(existingPrinter);
                
                // Petite pause pour laisser la connexion s'établir
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Vérifier que la connexion est bien établie
                const isConnected = await BluetoothManager.isConnected();
                if (isConnected) {
                    ToastAndroid.show('Imprimante reconnectée avec succès', ToastAndroid.LONG);
                    navigation.navigate(SCREENS.HOME_SCREEN);
                    return;
                }
            }
            
            // Si on arrive ici, la connexion a échoué
            ToastAndroid.show(
                'Connexion à l\'imprimante configurée a échoué. Veuillez reconfigurer.',
                ToastAndroid.LONG
            );
            await Storage.remove('printerAddress');
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
}, [navigation, isBluetoothOn, pairedDevices]);

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
        <View style={{ flex: 1, backgroundColor: COLORS.common.white }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft width={41} height={37} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Connexion</Text>
                </View>

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

                <View style={styles.dividerTable} />
                <PrimaryButton
                    title="Configurer sans printer"
                    onPress={() => {
                        Storage.remove('printerAddress');
                        navigation.navigate(SCREENS.HOME_SCREEN);
                    }}
                    haveBackground={true}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: wp('5%'),
    },
    header: {
        width: wp('100%'),
        height: hp('5%'),
        marginTop: hp('3%'),
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: FONTS.Poppins.extraBold,
        fontWeight: 700,
        lineHeight: '100%',
        color: '#000',
        marginLeft: wp('24%')
    },
    containerSwitch: {
        marginTop: wp('10%'),
        width: wp('100%'),
        height: hp('8'),
        flexDirection: 'row'
    },
    textBluetooth: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: FONTS.Poppins.semiBold,
        lineHeight: '100%',
        marginRight: wp('8%')
    },
    containerText: {
        height: hp('4%'),
        width: wp('100%'),
        flexDirection: 'row',
        alignItems: 'center',
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
        width: wp('100%'),
        height: hp('5%'),
    },
    containnerButton: {
        width: wp('100%'),
        height: hp('10%'),
        flexDirection: 'row',
        marginTop: hp('5%'),
        gap: wp('20%'),
    }
});

export default Connection;