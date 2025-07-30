import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { 
  loginStep2, 
  selectAvailableStores, 
  selectAuthLoading,
  selectAuthError,
  clearError
} from '../../store/slices/authSlice';
import { updateStoreData } from '../../store/slices/storeSlice';
import { Loader } from '../../components/core/Feedback/Loader';
import { AlertBanner } from '../../components/core/Feedback/AlertBanner';

const StoreSelection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const stores = useSelector(selectAvailableStores);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

 const handleSelectStore = async (storeId) => {
  console.log('[StoreSelection] Sélection du magasin:', storeId);
  try {
    const action = await dispatch(loginStep2(storeId));
    console.log('[StoreSelection] Résultat de loginStep2:', action);
    
    if (stores) {
      console.log('[StoreSelection] Magasin sélectionné avec succès, navigation vers HOME');
      navigation.replace('HOME_SCREEN'); 
    } else {
      console.warn('[StoreSelection] Données de magasin manquantes après sélection');
    }
  } catch (error) {
    console.error('[StoreSelection] Erreur lors de la sélection du magasin:', error);
  }
};

  return (
    <>
      {isLoading && <Loader overlay />}
      <View style={styles.container}>
        <Text style={styles.title}>Sélectionnez un magasin</Text>
        
        {error && (
          <AlertBanner 
            message={error} 
            backgroundColor="#FFEBEE" 
            textColor="#D32F2F"
            style={styles.alert}
          />
        )}

        <FlatList
          data={stores}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.storeItem}
              onPress={() => handleSelectStore(item.id)}
              disabled={isLoading}
            >
              {item.photo ? (
                <Image source={{ uri: item.photo }} style={styles.storeImage} />
              ) : (
                <View style={styles.storeIconPlaceholder}>
                  <Text style={styles.storeIconText}>{item.name.charAt(0)}</Text>
                </View>
              )}
              <Text style={styles.storeName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Aucun magasin disponible</Text>
          }
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
  alert: {
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  storeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  storeIconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  storeIconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495057',
  },
  storeName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#6c757d',
  },
});

export default StoreSelection;