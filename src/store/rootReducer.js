// src/store/rootReducer.js
import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import storeReducer from './slices/storeSlice';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  keyPrefix: 'redux-',
  whitelist: ['auth', 'store'],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  store: storeReducer,
});

export { rootPersistConfig, rootReducer };