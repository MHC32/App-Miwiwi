import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

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

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // SET STORE DATA
    setStoreData(state, action) {
      state.currentStore = action.payload.store;
      state.company = action.payload.company;
      state.isLoading = false;
    },

    // CLEAR STORE DATA
    clearStoreData(state) {
      state.currentStore = null;
      state.company = null;
    },

    // SET STORES LIST (optionnel si besoin d'accès global)
    setStoresList(state, action) {
      state.storesList = action.payload;
    }
  }
});

// Reducer
export default storeSlice.reducer;

// Actions
export const { setStoreData, clearStoreData, setStoresList } = storeSlice.actions;

// ----------------------------------------------------------------------

// Action pour mettre à jour les données du store après loginStep2
export function updateStoreData(storeData) {
  return (dispatch) => {
    try {
      const { store, company } = storeData;
      dispatch(setStoreData({
        store: {
          id: store.id,
          name: store.name,
          photo: store.photo
        },
        company: {
          id: company.id,
          name: company.name,
          currency: company.currency
        }
      }));
    } catch (error) {
      dispatch(storeSlice.actions.hasError(error.message));
    }
  };
}

// Selectors
export const selectCurrentStore = (state) => state.store.currentStore;
export const selectCurrentCompany = (state) => state.store.company;
export const selectStoreCurrency = (state) => state.store.company?.currency;
export const selectStoreLoading = (state) => state.store.isLoading;
export const selectStoreError = (state) => state.store.error;