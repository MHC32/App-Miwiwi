import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SCREENS } from '../constant';
import { Login, StoreSelection, Home, Configuration, Report,  Connection, Profil, Settings, TicketCreation } from './screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ConfigurationIcon from '../assets/icons/configuration.svg';
import ReportIcon from '../assets/icons/statistics.svg';
import HomeIcon from '../assets/icons/home.svg';
import { COLORS } from '../theme/palette';
import { useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthState, selectAuthLoading, selectAuthToken } from '../store/slices/authSlice';
import { selectCurrentStore } from '../store/slices/storeSlice';
import { useEffect, useState } from 'react';
import SplashScreen from './splashscreen/index';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const { width } = useWindowDimensions();
  const tabBarWidth = Math.min(325, width * 0.9);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary.main,
        tabBarInactiveTintColor: COLORS.primary.gray,
        tabBarStyle: {
          backgroundColor: COLORS.common.black,
          height: 60,
          bottom: 15,
          width: tabBarWidth,
          alignSelf: 'center',
          borderRadius: 28,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          paddingTop: 10,
          paddingBottom: 5,
          // Masquer la tab bar pour Report et Configuration
          display: (route.name === SCREENS.REPORT || route.name === SCREENS.CONFIGURATION) 
            ? 'none' 
            : 'flex',
        },
      })}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon  width={34} height={34} />,
        }}
      />
      <Tab.Screen
        name={SCREENS.REPORT}
        component={Report}
        options={{
          tabBarIcon: ({ color }) => <ReportIcon width={34} height={34} />,
        }}
      />
      <Tab.Screen
        name={SCREENS.CONFIGURATION}
        component={Configuration}
        options={{
          tabBarIcon: ({ color }) => <ConfigurationIcon  width={34} height={34} />,
        }}
      />
    </Tab.Navigator>
  )
}

const AppNavigator = () => {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const authToken = useSelector(selectAuthToken);
  const currentStore = useSelector(selectCurrentStore);

  console.log('currentStore:', currentStore);
  console.log('authToken:', authToken);


  useEffect(() => {
    const initAuth = async () => {
      await dispatch(checkAuthState());
      setIsReady(true);
    };
    initAuth();
  }, [dispatch]);

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={
          !authToken ? SCREENS.LOGIN :
            authToken && !currentStore ? SCREENS.STORE_SELECTION :
              SCREENS.HOME_SCREEN
        }
      >
        <Stack.Screen name={SCREENS.LOGIN} component={Login} />
        <Stack.Screen name={SCREENS.STORE_SELECTION} component={StoreSelection} />
        <Stack.Screen name={SCREENS.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen name={SCREENS.CONNECTION} component={Connection}/>
         <Stack.Screen name={SCREENS. PROFIL} component={Profil}/>
        <Stack.Screen name={SCREENS.SETTINGS} component={Settings}/>
        <Stack.Screen name={SCREENS.TICKET_CREATION} component={TicketCreation}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;