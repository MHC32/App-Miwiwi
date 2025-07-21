import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { SCREENS } from '../constant';

const AuthGuard = ({ children }) => {
  const { authToken } = useSelector(state => state.auth);
  const navigation = useNavigation();

  useEffect(() => {
    if (!authToken) {
      navigation.navigate(SCREENS.LOGIN);
    }
  }, [authToken,navigation]);

  return authToken ? children : null;
};

export default AuthGuard;