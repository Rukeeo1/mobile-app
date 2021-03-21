import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';

const Logo = ({ source, logoStyles }) => {
  return <Image source={source} style={[styles.image, logoStyles]} />;
};

const styles = StyleSheet.create({
  image: {
    marginTop: '40%',
    marginBottom: '25%',
    height: Platform.OS === 'android' ? 110 : 120,
    width: '80%',
  },
});

export default Logo;
