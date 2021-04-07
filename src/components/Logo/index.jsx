import React from 'react';
import { Image, Platform, StyleSheet } from 'react-native';

const Logo = ({ source, logoStyles }) => {
  return <Image source={source} style={[styles.image, logoStyles]} />;
};

const styles = StyleSheet.create({
  image: {
    marginBottom: '10%',
    height: Platform.OS === 'android' ? 110 : 120,
    width: '80%',
  },
});

export default Logo;
