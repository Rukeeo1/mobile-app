import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';

import RootNavigator from './src/navigation';

import store from './src/redux';

// import { initializeFirebase } from './src/config/';

// initializeFirebase();

const customFonts = {
  'Hero-New-Regular': require('./src/assets/fonts/Hero-New-Regular-Italic.otf'),
  'Hero-New-Regular-Italic': require('./src/assets/fonts/Hero-New-Regular.otf'),
};

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);
  return (
    fontsLoaded && (
      <Provider store={store}>
        <View style={styles.container}>
          <RootNavigator />
        </View>
      </Provider>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
