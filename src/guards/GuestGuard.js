// src/guards/GuestGuard.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectAuthToken } from '../store/slices/authSlice';

const GuestGuard = ({ children }) => {
  const navigation = useNavigation();
  const authToken = useSelector(selectAuthToken);

  useEffect(() => {
    if (authToken) {
      navigation.navigate('home');
    }
  }, [navigation,authToken]);

  return !authToken ? children : null;
};

export default GuestGuard;