import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import AppNavigator from './src/screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <AppNavigator />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;