import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import storeReducer from './slices/storeSlice';
import { store } from './store';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  keyPrefix: 'redux-',
  whitelist: ['auth'], 
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  store: storeReducer,
});

export { rootPersistConfig, rootReducer };