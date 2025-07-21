import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SCREENS } from '../constant';
import {Home, Login, StoreSelection} from './screens'
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';



const Stack = createNativeStackNavigator();


export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.LOGIN}>
          {() => (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )}
        </Stack.Screen>
        
        <Stack.Screen name='storeSelection' component={StoreSelection} />
        
        <Stack.Screen name='home'>
          {() => (
            <AuthGuard>
              <Home />
            </AuthGuard>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}