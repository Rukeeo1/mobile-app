import { FontDisplay } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Form } from "formik";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import growthLogo from "../../assets/growth_logo.png";
import { GradientButton, Input, Logo } from "../../components";
import constants from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { validateOTP } from "../../redux/actions/authActions";

export const ValidateOTP = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);

  const [authDetails, setAuthDetails] = useState({
    otpToken: "",
  });

  const handleAuthDetails = (name, value) => {
    setAuthDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { colors } = constants;

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* <SafeAreaView> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center" }}>
          <Logo
            source={growthLogo}
            logoStyles={{
              height: 0.35 * Dimensions.get("window").height,
              marginBottom: 0,
            }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.container}>
          <LinearGradient
            style={{
              width: "100%",
              paddingLeft: "5%",
              paddingRight: "5%",
              flex: 1,
              paddingBottom: 30,
              paddingTop: 50,
              height:
                Dimensions.get("window").height -
                0.35 * Dimensions.get("window").height,
            }}
            colors={[colors.blueLigth, colors.blue]}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <Input
                inputStyle={styles.input}
                containerStyle={{ height: 70 }}
                labelStyle={styles.label}
                labelText="OTP token"
                value={authDetails.otpToken}
                onChangeText={(text) => handleAuthDetails("otpToken", text)}
                placeholder="Enter the OTP token sent to your email"
                placeholderTextColor="#fff"
                autoCapitalize="none"
                keyboardType="numeric"
              />

              <GradientButton
                gradient={[colors.green, colors.greenDeep]}
                coverStyle={{ marginBottom: 20, marginTop: 50 }}
                title={"Submit"}
                onPress={() =>
                  dispatch(validateOTP(authDetails.otpToken, navigation))
                }
                loading={loading}
                // onPress={() => navigation.navigate('Onboarding')}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontFamily: "Hero-New-Medium",
                }}
                onPress={() => navigation.navigate("ManualAuthentication")}
              >
                Already have an Account? Log in
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                  bottom: 42,
                  left: 0,
                  right: 0,
                  position: "absolute",
                  fontFamily: "Hero-New-Medium",
                  fontSize: 16,
                }}
                onPress={() => navigation.navigate("Login")}
              >
                Cancel
              </Text>
            </SafeAreaView>
          </LinearGradient>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {},
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: constants.colors.white,
  },
  scrollView: {
    width: "100%",
    alignSelf: "center",
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // overflow: 'hidden',
  },
  image: {
    marginTop: "25%",
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginTop: 10,
    borderBottomColor: constants.colors.greyLight,
    paddingBottom: "2%",
    color: constants.colors.white,
    paddingLeft: 0,
    fontFamily: "Hero-New-Light",
    fontSize: 16,
    letterSpacing: 0,
    height: 50,
  },
  label: {
    color: constants.colors.white,
    fontFamily: "Hero-New-Medium",
  },
  alignItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "5%",
  },
});

export default ValidateOTP;
