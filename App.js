import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';

import RootNavigator from './src/navigation';

import store from './src/redux';

// import { initializeFirebase } from './src/config/';

// initializeFirebase();

const customFonts = {
  'Hero-New-Regular-Italic': require('./src/assets/fonts/Hero-New-Regular-Italic.otf'),
  'Hero-New-Regular': require('./src/assets/fonts/Hero-New-Regular.otf'),
  'Hero-New-Medium': require('./src/assets/fonts/Hero-New-Medium.otf'),
  'Hero-New-Light': require('./src/assets/fonts/Hero-New-Light.otf'),
  'Hero-New-Thin': require('./src/assets/fonts/Hero-New-Thin.otf'),
  'Hero-New-Light-Italic': require('./src/assets/fonts/Hero-New-Light-Italic.otf'),
  'Hero-New-Bold-Italic': require('./src/assets/fonts/Hero-New-Bold-Italic.otf'),
  'Hero-New-Bold': require('./src/assets/fonts/Hero-New-Bold.otf'),
  "Frame-Work-7": require('./src/assets/fonts/Framework-7-Icons-Regular.ttf')
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
