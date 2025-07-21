import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { SCREENS } from '../constant';

const GuestGuard = ({ children }) => {
  const authToken = useSelector(state => state.auth?.authToken);
  const navigation = useNavigation();

  useEffect(() => {
    if (authToken) {
      navigation.navigate(SCREENS.HOME);
    }
  }, [authToken, navigation]);

  return !authToken ? children : null;
};

export default GuestGuard;