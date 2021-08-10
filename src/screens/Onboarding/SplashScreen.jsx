import { CommonActions } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
import constants from "../../constants";

const { colors } = constants;
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('Settings');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          key: null,
          routes: [
            {
              name: "Settings",
            },
          ],
        })
      );
    }, 1500);
  }, [navigation]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ flex: 1, backgroundColor: colors.green }}
      onPress={() => navigation.navigate("Settings")}
    >
      <Image
        source={require("../../assets/splash.gif")}
        style={{ flex: 1, resizeMode: "cover", width: "100%" }}
      />
    </TouchableOpacity>
  );
};

export default SplashScreen;
