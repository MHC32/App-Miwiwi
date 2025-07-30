import { createSlice } from '@reduxjs/toolkit';
import { Storage } from '../../helpers';
import axiosInstance from '../../utils/axios';
import { updateStoreData, setStoreData } from '../slices/storeSlice';
import {clearStoreData} from './storeSlice';


const initialState = {
  isLoading: true,
  error: null,
  tempToken: null,
  user: null,
  stores: [],
  authToken: null
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginStep1Success(state, action) {
      return {
        ...state,
        tempToken: action.payload.tempAuthToken,
        user: action.payload.user,
        stores: action.payload.stores.map(store => ({
          id: store.id,
          name: store.name,
          photo: store.photo
        })), // ← Copie sérialisable
        isLoading: false
      };
    },
    loginStep2Success(state, action) {
      state.authToken = action.payload.authToken;
      state.user = action.payload.user;
      state.isLoading = false;
    },
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
    logoutSuccess() {
      return { ...initialState, isLoading: false };
    },
    clearError(state) {
      state.error = null;
    }
  },
});

export default slice.reducer;
export const { logoutSuccess, clearError, setAuthToken, stopLoading } = slice.actions;

// Actions asynchrones
// Modifiez loginStep1 avec plus de logs
export function loginStep1(phone, password) {
  return async (dispatch) => {
    console.log('[loginStep1] Début de la connexion étape 1');
    dispatch(slice.actions.startLoading());
    try {
      console.log('[loginStep1] Envoi de la requête au serveur...');
      const response = await axiosInstance.post('/api/user/cashier/login-step1', {
        phone,
        password
      });

      console.log('[loginStep1] Réponse du serveur:', response.data);
      const data = response.data;

      if (!data.stores || data.stores.length === 0) {
        console.error('[loginStep1] Aucun magasin disponible');
        throw new Error('Aucun magasin disponible pour cet utilisateur');
      }

      console.log('[loginStep1] Stockage du tempToken et des données utilisateur');
      await Promise.all([
        Storage.store('tempToken', data.tempAuthToken),
        Storage.store('user', JSON.stringify(data.user))
      ]);

      dispatch(slice.actions.loginStep1Success(data));
      console.log('[loginStep1] Connexion étape 1 réussie');
      return data;
    } catch (error) {
      console.error('[loginStep1] Erreur:', error.response?.data || error.message);
      dispatch(slice.actions.hasError(error.response?.data?.message || error.message || 'Échec de la connexion'));
      throw error;
    }
  };
}

// Modifiez loginStep2 avec plus de logs
export function loginStep2(storeId) {
  return async (dispatch, getState) => {
    console.log('[loginStep2] Début de la sélection de magasin');
    dispatch(slice.actions.startLoading());
    
    try {
      const { auth } = getState();
      console.log('[loginStep2] Token temporaire:', auth.tempToken);

      if (!auth.tempToken) {
        console.error('[loginStep2] Token temporaire manquant');
        throw new Error('Token temporaire manquant');
      }

      console.log('[loginStep2] Envoi de la requête au serveur...');
      const response = await axiosInstance.post('/api/user/cashier/login-step2', {
        tempAuthToken: auth.tempToken,
        storeId
      });

      console.log('[loginStep2] Réponse du serveur:', response.data);
      const { authToken, user } = response.data;

      if (!authToken || !user?.store) {
        console.error('[loginStep2] Données incomplètes:', { authToken, store: user?.store });
        throw new Error('Données de connexion incomplètes');
      }

      // Création de la structure de données complète avec valeurs par défaut
      const completeStoreData = {
        store: {
          id: user.store.id,
          name: user.store.name,
          photo: user.store.photo || null
        },
        company: user.company || {
          id: `comp-${user.store.id}`,
          name: `${user.store.name} Company`,
          currency: 'USD'
        }
      };

      console.log('[loginStep2] Structure complète créée:', completeStoreData);

      // Persistance des données
      await Promise.all([
        Storage.store('authToken', authToken),
        Storage.store('user', JSON.stringify(user)),
        Storage.store('storeData', JSON.stringify(completeStoreData)),
        Storage.remove('tempToken')
      ]);

      // Mise à jour du state
      dispatch(slice.actions.loginStep2Success({ 
        authToken, 
        user: {
          ...user,
          store: completeStoreData.store,
          company: completeStoreData.company
        }
      }));
      
      dispatch(updateStoreData(completeStoreData));
      
      console.log('[loginStep2] Connexion étape 2 réussie');
      return { 
        ...response.data,
        storeData: completeStoreData // Inclure les données formatées dans la réponse
      };
      
    } catch (error) {
      console.error('[loginStep2] Erreur:', error.response?.data || error.message);
      dispatch(slice.actions.hasError(
        error.response?.data?.message || 
        error.message || 
        'Échec de la sélection du magasin'
      ));
      throw error;
    }
  };
}
// Modifiez checkAuthState avec plus de logs
export function checkAuthState() {
  return async (dispatch) => {
    console.log('[checkAuthState] Vérification de l\'état d\'authentification');
    try {
      const [authToken, user, storeData] = await Promise.all([
        Storage.get('authToken'),
        Storage.get('user', true),
        Storage.get('storeData', true)
      ]);

      console.log('[checkAuthState] Données récupérées:', {
        authToken: !!authToken,
        user: !!user,
        storeData: !!storeData
      });

      if (authToken && user && storeData) {
        console.log('[checkAuthState] Session valide trouvée, restauration...');
        dispatch(slice.actions.setAuthToken(authToken));
        dispatch(slice.actions.loginStep2Success({ authToken, user }));
        dispatch(setStoreData(storeData));
      } else {
        console.log('[checkAuthState] Aucune session valide trouvée');
      }
    } catch (error) {
      console.error('[checkAuthState] Erreur:', error);
    } finally {
      dispatch(slice.actions.stopLoading());
      console.log('[checkAuthState] Vérification terminée');
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
     
      const response = await axiosInstance.post('/api/user/cashier/logout');
 
      if (response.data.success) {
        await Promise.all([
          Storage.remove('authToken'),
          Storage.remove('user'),
          Storage.remove('tempToken'),
          Storage.remove('storeData'),
        ]);

        // Reset du store Redux
        dispatch(slice.actions.logoutSuccess());
        dispatch(clearStoreData()); 
        
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Échec de la déconnexion');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      
      await Promise.all([
        Storage.remove('authToken'),
        Storage.remove('user'),
        Storage.remove('tempToken'),
        Storage.remove('storeData'),
      ]);
      
      dispatch(slice.actions.logoutSuccess());
      
      return { 
        success: false,
        error: error.message 
      };
    }
  };
}

// Selectors
export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAvailableStores = (state) => state.auth.stores;
export const selectTempToken = (state) => state.auth.tempToken;
export const selectAuthToken = (state) => state.auth.authToken;
export const selectIsAuthenticated = (state) => !!state.auth.authToken;
export const selectAuthError = (state) => state.auth.error;