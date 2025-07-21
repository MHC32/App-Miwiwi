import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginStep2, selectAvailableStores, selectTempToken, selectAuthLoading } from '../../store/slices/authSlice';
import { Loader } from '../../components/core/Feedback/Loader';
import { SCREENS } from '../../constant/screens';

const StoreSelection = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const stores = useSelector(selectAvailableStores);
    const tempToken = useSelector(selectTempToken); 
    const isLoading = useSelector(selectAuthLoading);


    const handleSelectStore = async (storeId) => {
        console.log('Stores:', stores);
        console.log('TempToken in StoreSelection:', tempToken);
        try {
            await dispatch(loginStep2(tempToken, storeId));
            navigation.navigate('home');
        } catch (error) {
            console.error('Store selection failed:', error);
        }
    };

    return (
        <>
            {isLoading && <Loader overlay />}
            <View style={styles.container}>
                <Text style={styles.title}>Sélectionnez un magasin</Text>

                <FlatList
                    data={stores}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.storeItem}
                            onPress={() => handleSelectStore(item.id)}
                            disabled={isLoading}
                        >
                            <Text style={styles.storeName}>{item.name}</Text>
                            {item.photo && (
                                <Image
                                    source={{ uri: item.photo }}
                                    style={styles.storeImage}
                                />
                            )}
                        </TouchableOpacity>
                    )}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },

    containerStore: {
        width: 317,
        heigh: 148,
        borderRadius: 9,
        border: 1
    },
    storeItem: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    storeName: {
        fontSize: 16,
        flex: 1,
    },
    storeImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});

export default StoreSelection;