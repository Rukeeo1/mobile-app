import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Modal,
  RefreshControl,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { getCrops } from "../../redux/actions/cropActions";
import { addAltPost, editPost } from "../../redux/actions/postsActions";

import { GradientButton as Button, Header, Input } from "../../components/";
import constants from "../../constants/";

const { colors } = constants;

const PostForm = ({
  navigation,
  route,
  defaultPostImage = "",
  currentIndex,
}) => {
  const postData = route?.params?.post;
  const PostSchema = Yup.object().shape({
    post: Yup.string()
      .required("Required")
      .min(2, "Too Short!")
      .max(1000, "Too Long!"),
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);
  const { crops, cropDetail } = useSelector((state) => state.crops);
  const { user } = useSelector((state) => state.auth);

  const prevCrop = "";

  const {
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    isValid,
    errors,
    postImageUri,
  } = useFormik({
    initialValues: {
      post: postData?.content ?? "",
      crop_name: postData?.name ?? "",
      plantVariety: postData?.variety ?? "",
      postImageUri: postData?.media_url ?? defaultPostImage ?? "",
      isPublic: true,
    },
    validationSchema: PostSchema,
    // enableReinitialize: true,
  });

  const [post, setPost] = useState({
    post: postData?.content ?? "",
    crop_name: "",
    plantVariety: "",
    postImageUri: postData?.media_url ?? defaultPostImage ?? "",
    isPublic: true,
  });
  const [crop, setCrop] = useState(null);
  const [selectModal, setSelectModal] = useState(false);
  const [selecting, setSelecting] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setPost((prevState) => ({
        ...prevState,
        postImageUri: result?.uri,
      }));
      // setFieldValue('postImageUri', result?.uri);
    }
  };

  const rbSheet = useRef();

  useEffect(() => {
    dispatch(getCrops());
  }, []);

    useEffect(() => {
        console.log({qwewewe: route?.params})
    }, []);
  useEffect(() => {
    if (defaultPostImage) {
      setFieldValue("postImageUri", defaultPostImage);
      setPost((prevState) => ({
        ...prevState,
        postImageUri: defaultPostImage,
      }));
    }
    // pickImage();
  }, [defaultPostImage, currentIndex]);

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

  const submit = () => {
    const data = new FormData();

    data.append("title", values.post);
    data.append("content", values.post);
    data.append("post_type", "PUBLIC");
    data.append("crop_name", values.crop_name);
    data.append("crop_type", values.crop_name);
    data.append("variety", values.plantVariety);
    data.append("user_id", user?.id);

    if (!postData) {
      if (post.isPublic && post.postImageUri === "") {
        Alert.alert("", "You've not added an image", [{ text: "Dismiss" }]);
      } else {
        if (post.postImageUri && post.postImageUri !== "") {
          data.append("thumbnail_url", {
            name: post.postImageUri?.split("/").pop(),
            uri: post.postImageUri,
            type: "image/*",
          });
          data.append("media_url", {
            name: post.postImageUri?.split("/").pop(),
            uri: post.postImageUri,
            type: "image/*",
          });
        }
      }

      dispatch(addAltPost(data));
      goBack();
    } else {
      if (post.postImageUri !== postData.media_url) {
        data.append("thumbnail_url", {
          name: post.postImageUri?.split("/").pop(),
          uri: post.postImageUri,
          type: "image/*",
        });
        data.append("media_url", {
          name: post.postImageUri?.split("/").pop(),
          uri: post.postImageUri,
          type: "image/*",
        });
      }

      dispatch(editPost(data, postData?.id, navigation));
    }

    // navigation.goBack()
    goBack();
  };

  const disableForm =
    !isValid ||
    !values.post ||
    (values.post && values?.post?.length < 4) ||
    !post.postImageUri;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="never">
        <Header
          title="Post"
          onIconPress={() => goBack()}
          containerStyle={styles.headerStyle}
        />
        <View style={styles.postInput}>
          <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
            {post.postImageUri ? (
              <Image
                source={{ uri: post.postImageUri }}
                style={{ height: "100%", width: "100%" }}
              />
            ) : (
              <Ionicons
                name="ios-camera-outline"
                size={45}
                color={constants.colors.white}
              />
            )}
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Input
              placeholder="Write a journal entry…"
              onChangeText={handleChange("post")}
              value={values.post}
              // numberOfLines={4}
              // inputStyle={{ flexWrap: 'wrap' }}
              containerStyle={{ flex: 1 }}
              multiline
            />
          </View>
        </View>
        <View style={styles.postDetails}>
          <Input
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelText}
            labelText="Plant Name"
            value={values.crop_name}
            onChangeText={handleChange("crop_name")}
            // onBlur={() => dispatch(getCropVarieties(values.plantName))}
            placeholder="Plant Name e.g. Tomatoes "
          />
          <Input
            containerStyle={{ marginTop: 20 }}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelText}
            labelText="Plant variety"
            value={values.plantVariety}
            onChangeText={handleChange("plantVariety")}
            placeholder="Plant variety e.g. Sungold"
          />
          {!post && (
            <View style={styles.switchContainer}>
              <Text>Add to public profile</Text>
              <Switch
                trackColor={{ false: "#767577", true: colors.pink }}
                value={post.isPublic}
                onValueChange={(value) => {
                  setPost((prevState) => ({
                    ...prevState,
                    isPublic: value,
                  }));
                }}
              />
            </View>
          )}
          <View style={styles.footer}>
            <Button
              title="Share"
              gradient={
                disableForm
                  ? [colors.grey, colors.grey]
                  : [colors.green, colors.greenDeep]
              }
              //the "settings title for this would be refactored to profile"
              // onPress={() => goBack()}
              onPress={disableForm ? "" : submit}
              loading={loading}
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
  postInput: {
    flexDirection: "row",
    padding: 22,
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  imageWrapper: {
    backgroundColor: colors.grey100,
    height: 131,
    width: 131,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  postDetails: {
    padding: 22,
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  labelText: {
    color: constants.colors.blueLigth,
  },
  inputStyle: {
    marginTop: 10,
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
});

export default PostForm;
