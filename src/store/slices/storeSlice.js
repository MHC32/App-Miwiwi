import { createSlice } from '@reduxjs/toolkit';
import { Storage } from '../../helpers';

const initialState = {
  currentStore: null,
  company: null,
  isLoading: false,
  error: null
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },

    // STOP LOADING
    stopLoading(state) {
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // SET STORE DATA
    setStoreData(state, action) {
      // Ajoutez une validation supplémentaire
      const payload = action.payload || {};
      state.currentStore = payload.store || null;
      state.company = payload.company || {
        id: 'default-company',
        name: 'Default Company',
        currency: 'USD'
      };
      state.isLoading = false;
    },
    // CLEAR STORE DATA
    clearStoreData(state) {
      state.currentStore = null;
      state.company = null;
    }
  }
});

// Reducer
export default storeSlice.reducer;

// Actions
export const {
  setStoreData,
  clearStoreData,
  stopLoading
} = storeSlice.actions;

// ----------------------------------------------------------------------

// Action pour mettre à jour les données du store après loginStep2
export function updateStoreData(storeData) {
  return async (dispatch) => {
    try {
      // Accepte maintenant soit la structure complète, soit juste l'objet store
      const normalizedData = storeData.store ? storeData : { store: storeData };

      const payload = {
        store: {
          id: normalizedData.store.id,
          name: normalizedData.store.name,
          photo: normalizedData.store.photo || null
        },
        company: normalizedData.company || {
          id: 'comp-' + normalizedData.store.id,
          name: normalizedData.store.name + ' Company',
          currency: 'USD'
        }
      };

      dispatch(setStoreData(payload));
      await Storage.store('storeData', JSON.stringify(payload));
    } catch (error) {
      console.error('Erreur updateStoreData:', error);
      dispatch(storeSlice.actions.hasError(error.message));
    }
  };
}

export function restoreStoreData() {
  return async (dispatch) => {
    try {
      // Récupérer les données du store depuis le stockage
      const storeData = await Storage.get('storeData', true);

      if (storeData) {
        dispatch(setStoreData(storeData));
      }

    } catch (error) {
      console.error('Failed to restore store data:', error);
    }
  };
}

// Selectors
export const selectCurrentStore = (state) => state.store.currentStore;
export const selectCurrentCompany = (state) => state.store.company;
export const selectStoreCurrency = (state) => state.store.company?.currency;
export const selectStoreLoading = (state) => state.store.isLoading;
export const selectStoreError = (state) => state.store.error;