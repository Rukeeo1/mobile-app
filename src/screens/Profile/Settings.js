import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { updateProfile, updateAvatar } from "../../redux/actions/authActions";

import {
  GradientButton,
  Header,
  Input,
  SafeArea,
  KeyboardAvoiding,
} from "../../components";
import constants, { GOOGLE_API_KEY } from "../../constants";

const { colors } = constants;

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);
  const { user } = useSelector((state) => state.auth);

  const ProfileSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .min(2, "Too Short!")
      .max(1000, "Too Long!"),
    bio: Yup.string()
      .required("Required")
      .min(3, "Too Short!")
      .max(100, "Too Long!"),
    location: Yup.string()
      .required("Required")
      .min(3, "Too Short!")
      .max(10000, "Too Long!"),
    profileImageUri: Yup.string().required(),
  });

  const [location, setLocation] = useState(null);

  const {
    handleChange,
    handleBlur,
    values,
    isValid,
    errors,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: user?.fullname ?? "",
      bio: user?.biography ?? "",
      location: user?.location ?? "",
      profileImageUri: user?.avatar,
    },
    validationSchema: ProfileSchema,
    onSubmit: (values) => {
      if (values.profileImageUri !== user.avatar)
        dispatch(updateAvatar({ ...values, location }, navigation));
      else dispatch(updateProfile({ ...values, location }, navigation));
    },
    validateOnChange: true,
  });

  const submitForm = () => {
    if (values.profileImageUri !== user.avatar)
      dispatch(updateAvatar({ ...values, location }, navigation));
    else dispatch(updateProfile({ ...values, location }, navigation));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      // base64: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setFieldValue("profileImageUri", result.uri);
      // handleBlur('profileImageUri');
    }
  };

  const address = useRef();

  useEffect(() => {
    setLocation(user?.location ?? "");
    address.current?.setAddressText(user?.location ?? "");
  }, [user]);

  return (
    <KeyboardAvoiding>
      <SafeArea>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Header
            title="Profile Settings"
            onIconPress={() => navigation.goBack()}
          />
          <View style={styles.profileImageContainer}>
            {values.profileImageUri ? (
              <Image
                source={{ uri: values.profileImageUri }}
                style={styles.image}
              />
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  height: "100%",
                  backgroundColor: colors.grey100,
                }}
              >
                <Ionicons
                  name="ios-person-outline"
                  size={45}
                  color={colors.white}
                />
              </View>
            )}
            <TouchableOpacity
              style={styles.cameraContainer}
              onPress={pickImage}
            >
              <Ionicons
                name="ios-camera-outline"
                size={30}
                color={constants.colors.green}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingLeft: "25%" }}>
            <Text style={{ color: colors.red }}>{errors.profileImageUri}</Text>
          </View>

          <View style={styles.profileDetails}>
            <Input
              value={values.name}
              placeholder="Enter your name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              labelText="Name"
              labelStyle={styles.labelText}
              errorMessage={errors.name}
            />
            <Input
              value={values.bio}
              placeholder="Enter your bio"
              onChangeText={handleChange("bio")}
              onBlur={handleBlur("bio")}
              labelText="Bio"
              labelStyle={styles.labelText}
              containerStyle={styles.input}
              errorMessage={errors.bio}
            />
            {/* <Input
            value={values.location}
            placeholder='Enter your Location'
            onChangeText={handleChange('location')}
            onBlur={handleBlur('location')}
            labelText='Location'
            labelStyle={styles.labelText}
            containerStyle={styles.input}
            errorMessage={errors.location}
          /> */}
            <View style={styles.input}>
              <Text
                style={{ ...styles.labelText, fontSize: 16, fontWeight: "600" }}
              >
                Location
              </Text>
              <GooglePlacesAutocomplete
                placeholder="Enter your location"
                onPress={(data) => {
                  setLocation(data.description);
                }}
                query={{
                  key: GOOGLE_API_KEY,
                  language: "en",
                }}
                ref={address}
                currentLocation
                currentLocationLabel="Current location"
                styles={{
                  textInput: {
                    fontSize: 18,
                    color: constants.colors.black,
                    fontWeight: "300",
                    // paddingHorizontal: 8,
                    paddingBottom: 3,
                    flex: 1,
                    paddingHorizontal: 0,
                  },
                }}
              />
            </View>
            <GradientButton
              title="Save"
              onPress={submitForm}
              gradient={[constants.colors.green, "#83B403"]}
              coverStyle={styles.button}
              loading={loading}
            />
          </View>
        </ScrollView>
      </SafeArea>
    </KeyboardAvoiding>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: constants.colors.white,
  },
  profileImageContainer: {
    height: Dimensions.get("screen").height * 0.4,
    backgroundColor: colors.grey100,
  },
  image: { height: "100%", width: "100%" },
  cameraContainer: {
    alignItems: "center",
    backgroundColor: constants.colors.white,
    borderRadius: 30,
    bottom: -10,
    elevation: 3,
    height: 60,
    justifyContent: "center",
    left: 20,
    position: "absolute",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    width: 60,
  },
  profileDetails: {
    marginTop: "6%",
    paddingHorizontal: "5%",
  },
  labelText: {
    color: constants.colors.blueLigth,
    fontFamily: "Hero-New-Regular",
  },
  input: {
    marginTop: "8%",
    marginLeft: 0,
    paddingLeft: 0,
  },
  button: {
    marginTop: "10%",
  },
});

export default Settings;
