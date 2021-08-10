import { LinearGradient } from "expo-linear-gradient";
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
import { resetPassword } from "../../redux/actions/authActions";

export const ResetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);

  const [authDetails, setAuthDetails] = useState({
    password: "",
    confirmPassword: "",
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
            <Input
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              labelStyle={styles.label}
              labelText="New Password"
              value={authDetails.password}
              onChangeText={(text) => handleAuthDetails("password", text)}
              placeholder="Enter your new password"
              secureTextEntry={true}
            />
            <Input
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              labelStyle={styles.label}
              labelText="Confirm new Password"
              value={authDetails.confirmPassword}
              onChangeText={(text) =>
                handleAuthDetails("confirmPassword", text)
              }
              placeholder="Confirm your password"
              secureTextEntry={true}
            />
            {authDetails.confirmPassword !== "" &&
              authDetails.confirmPassword !== authDetails.password && (
                <Text
                  style={{
                    color: colors.red,
                  }}
                >
                  Passwords don't match
                </Text>
              )}

            <GradientButton
              gradient={[colors.green, colors.greenDeep]}
              coverStyle={{ marginBottom: 20, marginTop: 50 }}
              title={"Reset now"}
              // onPress={() => navigation.navigate('Onboarding')}
              onPress={() => {
                if (authDetails.confirmPassword === authDetails.password) {
                  dispatch(resetPassword(authDetails.password, navigation));
                }
              }}
              loading={loading}
            />
            <Text
              style={{ textAlign: "center", color: "white" }}
              onPress={() => navigation.navigate("ManualAuthentication")}
            >
              Already have an Account? Log in
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                position: "relative",
                color: "white",
                textAlign: "center",
                marginBottom: "30%",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Cancel
            </Text>
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
    overflow: "hidden",
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
  },
  label: {
    color: constants.colors.white,
  },
  alignItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "5%",
  },
});

export default ResetPassword;
