import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const SafeArea = ({ children, containerStyle }) => {
  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0 },
});

export default SafeArea;
