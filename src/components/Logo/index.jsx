import React from "react";
import { Image, Platform, StyleSheet } from "react-native";

const Logo = ({ source, logoStyles, ...props }) => {
  return (
    <Image source={source} style={[styles.image, logoStyles]} {...props} />
  );
};

const styles = StyleSheet.create({
  image: {
    marginBottom: "10%",
    height: Platform.OS === "android" ? 110 : 120,
    width: "80%",
  },
});

export default Logo;
