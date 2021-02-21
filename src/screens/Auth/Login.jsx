import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import growthLogo from "../../assets/growth_logo.png";

export const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={growthLogo} style={styles.image} />
      <View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  image: {
    margin: "25%",
  },
});

export default Login;
