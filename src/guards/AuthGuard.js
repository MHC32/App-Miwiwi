// src/guards/AuthGuard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectAuthToken, selectCurrentStore } from '../store/slices/authSlice';
import { SCREENS } from '../constant/screens';

const AuthGuard = ({ children }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);
  const currentStore = useSelector(selectCurrentStore);

  useEffect(() => {
    const checkAuth = async () => {
      if (!authToken) {
        navigation.navigate(SCREENS.LOGIN);
        return;
      }
      
      if (authToken && !currentStore) {
        navigation.navigate('storeSelection');
      }
    };

    checkAuth();
  }, [navigation,authToken, currentStore]);

  return authToken && currentStore ? children : null;
};

export default AuthGuard;