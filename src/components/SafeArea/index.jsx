import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

const SafeArea = ({ children, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* <SafeAreaView style={[styles.container, containerStyle]}> */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  // container: { flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0 },
});

export default SafeArea;
