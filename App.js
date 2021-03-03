import React from 'react';
import { StyleSheet, View } from 'react-native';

import RootNavigator from './src/navigation';

import { initializeFirebase } from './src/config/';

initializeFirebase();

import {} from './';
export default function App() {
  return (
    <View style={styles.container}>
      <RootNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
