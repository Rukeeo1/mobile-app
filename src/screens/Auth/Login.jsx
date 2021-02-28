import React from "react";
import { View, StyleSheet, Image } from "react-native";
import growthLogo from "../../assets/growth_logo.png";
import { Button } from "../../components";

export const Login = ({navigation}) => {
  const authButtons = [
    {
      title: "Sign in with Apple",
      coverStyle: styles.appleButton,
      onPress: () => alert("Apple sign in was clicked"),
    },
    {
      title: "Sign in with Facebook",
      coverStyle: styles.faceBookButton,
      onPress: () => alert("Facebook sign in was clicked"),
    },
    {
      title: "Sign in with Google",
      coverStyle: styles.googleButton,
      onPress: () => alert("Google sign in was clicked"),
    },
    {
      title: "Sign in with Email",
      coverStyle: styles.email,
      onPress: () => navigation.navigate('Settings'),
    },
  ];
  return (
    <View style={styles.container}>
      <Image source={growthLogo} style={styles.image} />
      <View style={styles.buttonsContainer}>
        {authButtons.map((button, index) => (
          <Button
            key={index}
            title={button.title}
            coverStyle={{ ...styles.genericBtnStyles, ...button.coverStyle }}
            onPress={button.onPress}
            color={"white"}
          />
        ))}
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
    marginTop: "40%",
  },
  buttonsContainer: {
    width: "80%",
    alignItems: "center",
  },
  genericBtnStyles: {
    height: 40,
    borderRadius: 20,
  },
  appleButton: {
    color: "#ffffff",
    backgroundColor: "black",
  },
  faceBookButton: {
    backgroundColor: "#3C5998",
  },
  googleButton: {
    backgroundColor: "#4285F5",
  },
  email: {
    backgroundColor: "#9B9B9B",
  },
});

export default Login;
