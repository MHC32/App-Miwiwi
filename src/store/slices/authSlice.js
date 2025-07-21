import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';
import { dispatch } from '../store';
import { updateStoreData } from './storeSlice';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  tempToken: null,
  user: null,
  stores: [],
  selectedStore: null,
  authToken: null
};

const slice = createSlice({
  name: 'auth',
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

    // LOGIN STEP 1 SUCCESS
    loginStep1Success(state, action) {
      state.isLoading = false;
      state.tempToken = action.payload.tempAuthToken;
      state.user = action.payload.user;
      state.stores = action.payload.stores;
      state.selectedStore = action.payload.stores.length === 1 ? action.payload.stores[0].id : null;
    },

    // LOGIN STEP 2 SUCCESS
    loginStep2Success(state, action) {
      state.isLoading = false;
      state.authToken = action.payload.authToken;
      state.user = { ...state.user, id: action.payload.user.id };
    },

    // LOGOUT SUCCESS
    logoutSuccess() {
      return initialState;
    },

    // SELECT STORE
    selectStore(state, action) {
      if (state.stores.some(store => store.id === action.payload)) {
        state.selectedStore = action.payload;
      }
    },

    // CLEAR ERROR
    clearError(state) {
      state.error = null;
    }
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { logoutSuccess, selectStore, clearError } = slice.actions;

// ----------------------------------------------------------------------

// Actions asynchrones
export function loginStep1(phone, password) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.post('/api/user/cashier/login-step1', {
        phone,
        password
      });
      dispatch(slice.actions.loginStep1Success(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message || 'Échec de la connexion'));
    }
  };
}

export function loginStep2(tempToken, storeId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.post('/api/user/cashier/login-step2', { 
        tempAuthToken: tempToken, 
        storeId 
      });
      
      dispatch(slice.actions.loginStep2Success({
        authToken: response.data.authToken,
        user: { id: response.data.user.id } 
      }));
      
      dispatch(updateStoreData(response.data.user));
      
    } catch (error) {
      dispatch(slice.actions.hasError(error.message || 'Échec de la sélection du magasin'));
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