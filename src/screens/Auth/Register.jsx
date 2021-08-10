import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  GradientButton,
  Input,
  Logo,
  KeyboardAvoiding,
  SafeArea,
} from "../../components";
import { register } from "../../redux/actions/authActions";
import constants, { GOOGLE_API_KEY } from "../../constants";
import growthLogo from "../../assets/growth_logo.png";

export const Register = ({ navigation }) => {
  const [authDetails, setAuthDetails] = useState({
    email: "",
    name: "",
    username: "",
    bio: "",
    location: "",
    password: "",
    repassword: "",
  });

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Required")
      .min(2, "Too Short!")
      .max(1000, "Too Long!"),
    name: Yup.string()
      .required("Required")
      .min(2, "Too Short!")
      .max(1000, "Too Long!"),
    username: Yup.string()
      .required("Required")
      .min(2, "Too Short!")
      .max(1000, "Too Long!"),
    bio: Yup.string()
      .required("Required")
      .min(2, "Too Short!")
      .max(1000, "Too Long!"),
    location: Yup.string()
      .required("Required")
      .min(2, "Too Short!")
      .max(1000, "Too Long!"),
    password: Yup.string()
      .required("Required")
      .min(2, "Too Short!")
      .max(1000, "Too Long!"),
    repassword: Yup.string()
      .required("Required")
      .min(2, "Too Short!")
      .max(1000, "Too Long!")
      .oneOf([Yup.ref("password"), null], "Passwords don't match"),
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);

  const { handleChange, values, errors, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      name: "",
      username: "",
      bio: "",
      location: "",
      password: "",
      repassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      dispatch(register(values, navigation));
    },
  });

  const submit = () => {
    // if (authDetails.password === authDetails.repassword) dispatch(register(authDetails, navigation))
    // else {
    //   Alert.alert('', 'Passwords don\'t match', [{ text: 'Dismiss' }])
    // }
    dispatch(register(values, navigation));
  };

  const { colors } = constants;

  return (
    <KeyboardAvoiding>
      <SafeArea>
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ backgroundColor: colors.white }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ alignItems: "center" }}>
              <Logo
                source={growthLogo}
                logoStyles={{
                  marginTop: "20%",
                  marginBottom: "10%",
                  display: "flex",
                  justifyContent: "center",
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
                }}
                colors={[colors.blueLigth, colors.blue]}
              >
                <Input
                  inputStyle={styles.input}
                  labelStyle={styles.label}
                  labelText="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.white}
                  autoCapitalize="none"
                  errorMessage={errors.email}
                />
                <Input
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  labelStyle={styles.label}
                  labelText="Name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  placeholder="Enter your name"
                  placeholderTextColor={colors.white}
                  autoCapitalize="words"
                  errorMessage={errors.name}
                />
                <Input
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  labelStyle={styles.label}
                  labelText="Username"
                  value={values.username}
                  onChangeText={handleChange("username")}
                  placeholder="Enter your username"
                  autoCapitalize="none"
                  placeholderTextColor={colors.white}
                  errorMessage={errors.username}
                />
                {/* <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                labelStyle={styles.label}
                labelText="Location"
                value={authDetails.location}
                onChangeText={(text) => handleAuthDetails('location', text)}
                placeholder="Enter your location"
                placeholderTextColor={colors.white}
              /> */}
                <View style={styles.inputContainer}>
                  <Text
                    style={{ ...styles.label, fontSize: 16, fontWeight: "600" }}
                  >
                    Location
                  </Text>
                  <GooglePlacesAutocomplete
                    placeholder="Enter your location"
                    onPress={(data) => {
                      // console.warn('location', data)
                      // handleChange(data.description, 'location')
                    }}
                    query={{
                      key: GOOGLE_API_KEY,
                      language: "en",
                    }}
                    currentLocation
                    currentLocationLabel="Current location"
                    // placeholderTextColor="#fff"
                    textInputProps={{
                      placeholderTextColor: "#fff",
                      onChangeText: handleChange("location"),
                    }}
                    styles={{
                      textInput: {
                        fontSize: 18,
                        color: constants.colors.black,
                        fontWeight: "300",
                        // paddingHorizontal: 8,
                        paddingBottom: 3,
                        flex: 1,
                        paddingHorizontal: 0,
                        backgroundColor: "transparent",
                        color: "#fff",
                        ...styles.input,
                      },
                      listView: {
                        position: "absolute",
                        zIndex: 999,
                        elevation: 1,
                        top: "100%",
                      },
                      container: {
                        elevation: 3,
                        zIndex: 999,
                      },
                    }}
                  />
                  {errors.location && (
                    <Text style={{ color: colors.red }}>{errors.location}</Text>
                  )}
                  <Input
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    labelStyle={styles.label}
                    labelText="Password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    placeholderTextColor={colors.white}
                    errorMessage={errors.password}
                    textContentType="oneTimeCode"
                  />

                  <Input
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    labelStyle={styles.label}
                    labelText="Confirm Password"
                    value={values.repassword}
                    onChangeText={handleChange("repassword")}
                    placeholder="Confirm your password"
                    secureTextEntry={true}
                    placeholderTextColor={colors.white}
                    errorMessage={errors.repassword}
                    textContentType="oneTimeCode"
                  />
                  {/* {(authDetails.repassword !== '' && authDetails.password !== authDetails.repassword) && (
                    <Text style={{ color: 'red' }}>Passwords must match</Text>
                  )} */}
                  <GradientButton
                    gradient={[colors.green, colors.greenDeep]}
                    coverStyle={{ marginBottom: 20, marginTop: 50 }}
                    title={"Register"}
                    // onPress={() => navigation.navigate('Onboarding')}
                    onPress={submit}
                    loading={loading}
                    // disabled={!isValid}
                    // disabled={authDetails.repassword === '' || authDetails.password !== authDetails.repassword}
                  />
                </View>

                <Text
                  style={{ textAlign: "center", color: "white" }}
                  onPress={() => navigation.navigate("ManualAuthentication")}
                >
                  Already have an Account? Log in
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                    marginTop: "30%",
                    fontSize: 16,
                  }}
                  // onPress={() => navigation.navigate('Login')}
                >
                  Cancel
                </Text>
              </LinearGradient>
            </View>
          </ScrollView>
        </View>
      </SafeArea>
    </KeyboardAvoiding>
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
    flex: 1,
  },
  image: {
    marginTop: "25%",
  },
  inputContainer: {
    marginTop: "5%",
  },
  input: {
    borderBottomWidth: 1,
    marginTop: "3%",
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

export default Register;
