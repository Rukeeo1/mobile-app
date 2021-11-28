import React, { useContext, useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Switch,
  Modal,
  RefreshControl,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button, GradientButton, Header, Input } from "../../components/";
import constants from "../../constants";
import { useFormik } from "formik";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  addCrop,
  getCropCycleDetails,
  getCropSteps,
  getCurrentJob,
  getUserJobs,
  growCrop,
} from "../../redux/actions";

import ManageCropContext from "../../context/ManageCropsContext";
import { addPost, editPost, getPosts } from "../../redux/actions/postsActions";
import { FilterItemDropDown } from "./FilterItemDropDown";
import { getUserPosts } from "../../redux/actions/authActions";
const { colors } = constants;

const CropForm = ({
  navigation,
  route,
  defaultCropImage = "",
  currentIndex,
}) => {
  const cropData = route?.params?.crop;
  const CropSchema = Yup.object().shape({
    crop: Yup.string()
      .required("Required")
      .min(2, "Too Short!")
      .max(1000, "Too Long!"),
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);
  const { crops, cropDetail } = useSelector((state) => state.crops);
  const { user } = useSelector((state) => state.auth);
  const [addingJournal, setAddingJournal] = useState(false);

  const prevCrop = "";

  const {
    handleChange,
    handleBlur,
    values,
    setFieldValue,

    handleSubmit,
    isValid,
    errors,
    cropImageUri,
  } = useFormik({
    initialValues: {
      grow_level: null,
      crop: cropData?.content ?? "",
      name: cropData?.name ?? "",
      variety: cropData?.variety ?? "",
      cropImageUri: cropData?.media_url ?? defaultCropImage ?? "",
      isPublic: true,
    },
    validationSchema: CropSchema,
    // enableReinitialize: true,
  });

  const [crop, setCrop] = useState({
    crop: cropData?.content ?? "",
    name: "",
    variety: "",
    cropImageUri: cropData?.media_url ?? defaultCropImage ?? "",
    isPublic: true,
  });
  const [selectModal, setSelectModal] = useState(false);
  const [selecting, setSelecting] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setCrop((prevState) => ({
        ...prevState,
        cropImageUri: result?.uri,
      }));
      // setFieldValue('cropImageUri', result?.uri);
    }
  };

  const rbSheet = useRef();

  useEffect(() => {
    if (defaultCropImage) {
      setFieldValue("cropImageUri", defaultCropImage);
      setCrop((prevState) => ({
        ...prevState,
        cropImageUri: defaultCropImage,
      }));
    }
    // pickImage();
  }, [defaultCropImage, currentIndex]);

  const manageCropContext = useContext(ManageCropContext);
  const { cropToGrowDetails, endHarvest } = manageCropContext?.data;
  const getCurrentDate = () => {
    const date = new Date().getDate();
    const month = `0${new Date().getMonth() + 1}`;
    const year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    // return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
    return year + "-" + month + "-" + date; //format: yyyy-mm-dd;
  };
  const cropDate = getCurrentDate();

  const goBack = () => {
    // navigation.navigate("Explore", {
    //   screen: "Explore",
    //   params: {
    //     indexOfItemToShow: 1,
    //   },
    // });
    navigation.navigate("Settings", {
      screen: "Main-Profile",
      params: {
        indexOfItemToShow: 3,
      },
    });
  };
  let jobInfo7 = {};
  const submit = async () => {
    const data = new FormData();
    // clean up controller
    let isSubscribed = true;

    const jobInfo3 = {
      name: values.name,
      life_cycle: "",
      variety: values.variety,
      grow_level: selectedLevel,
      user_id: user?.id,
      job_date: cropDate,
    };
    data.append("grow_level", selectedLevel);
    data.append("name", values.name);
    data.append("life_cycle", "");
    data.append("name", values.name);
    data.append("variety", values.variety);
    // data.append("user_id", user?.id);
    // data.append("job_date", cropDate);
    manageCropContext?.actions?.updateCropToGrowDetails({
      user_id: user?.id,
      title: "PENDING",
      cropName: values.name,
      variety: values.variety,
      action: "PENDING",
      job_type: "PENDING",
      job_date: cropDate,
      addedNewCrop: true,
    });
    const addedCrop = await dispatch(addCrop(jobInfo3));
    let jobInfo5 = {};
    if (addedCrop) {
      manageCropContext?.actions?.updateCropToGrowDetails({
        title: "PENDING",
        cropName: values.name,
        variety: values.variety,
        action: "PENDING",
        job_type: "PENDING",
        jobDate: cropDate,
        cropId: addedCrop,
        addedNewCrop: true,
      });
      jobInfo5 = {
        cropName: values.name,
        crop_id: addedCrop,
        user_id: user?.id,
        job_date: cropDate,
        title: "PENDING",
        status: "PENDING",
        job_type: "PENDING",
        variety: values.variety,
        crop_type: "",
      };
      dispatch(getCropCycleDetails(addedCrop));
      dispatch(getCropSteps(addedCrop));
      const myCropGrown = await dispatch(growCrop(jobInfo5, false));
      if (myCropGrown) {
        manageCropContext?.actions?.updateCropToGrowDetails({
          cropName: values.name,
          cropId: addedCrop,
          user_id: user?.id,
          job_date: cropDate,
          title: "PENDING",
          status: "PENDING",
          job_type: "PENDING",
          variety: values.variety,
          crop_type: "",
          jobId: myCropGrown,
          addedNewCrop: true,
        });

        navigation.navigate("Success", {
          cropName: values.name,
          growLevel: values.grow_level,
          variety: values.variety,
          addedNewCrop: true,
        });
      }
    }

    navigation.navigate("Success", {
      cropName: values.name,
      growLevel: values.grow_level,
      variety: values.variety,
      addedNewCrop: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="never">
        <LinearGradient
          style={[styles.topSection]}
          colors={[colors.green, colors.greenDeep]}
        >
          <View>
            <AntDesign
              name="left"
              size={24}
              color={colors.white}
              style={{ top: 10, left: 0, position: "absolute" }}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View
            style={{
              marginTop: 50,
            }}
          >
            <Text style={[styles.title]}>New Crop</Text>
          </View>
        </LinearGradient>

        <View style={{ padding: 22, flexDirection: "column" }}>
          <View style={[styles.inputContainer]}>
            <Input
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelText}
              labelText="Name"
              placeholder="Enter your own plant name"
              value={values.name}
              onChangeText={handleChange("name")}
            />
          </View>
          <View style={[styles.inputContainer]}>
            <Text style={styles.labelText}>Enter the variety name</Text>
            <Text>You can find this on your seed pack</Text>
            <Input
              inputStyle={styles.inputStyle}
              placeholder="Enter your own variety"
              labelStyle={styles.labelText}
              value={values.variety}
              onChangeText={handleChange("variety")}
            />
          </View>
          <View style={[styles.inputContainer]}>
            <FilterItemDropDown
              items={["Beginner", "Intermediate", "Advanced"]}
              activeItem={selectedLevel ?? "Select level"}
              onSelect={setSelectedLevel}
              placeholder="Grow level"
              showRed={!!selectedLevel}
            />
            {/*<GradientButton*/}
            {/*    title="Grow It"*/}
            {/*    gradient={[colors.green, colors.greenDeep]}*/}
            {/*    coverStyle={styles.button}*/}
            {/*    // onPress={() => navigation.navigate('Success')}*/}
            {/*    loading={loading}*/}
            {/*    onPress={createNewCrop}*/}
            {/*/>*/}
          </View>

          <View style={styles.footer}>
            <GradientButton
              title="Grow It"
              gradient={[colors.green, colors.greenDeep]}
              //the "settings title for this would be refactored to profile"
              // onPress={() => goBack()}
              coverStyle={styles.button}
              // onPress={() => navigation.navigate('Success')}
              loading={addingJournal}
              // onPress={() => handleSubmit()}
              onPress={submit}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  cropInput: {
    flexDirection: "row",
    padding: 22,
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  cropDetails: {
    padding: 22,
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  inputStyle: {
    marginTop: 10,
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 22,
    marginTop: 10,
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  footer: {
    padding: 22,
    justifyContent: "flex-end",
    marginTop: "auto",
  },
  topSection: {
    height: 143,
    paddingLeft: 10,
    paddingRight: 10,
    alignContent: "space-between",
    justifyContent: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "100",
    color: colors.white,
    textAlign: "center",
  },
  labelText: {
    color: colors.green,
    fontWeight: "normal",
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 30,
  },
  button: {
    marginTop: 30,
  },
  imageWrapper: {
    backgroundColor: colors.grey100,
    height: 131,
    width: 131,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
});

export default CropForm;
