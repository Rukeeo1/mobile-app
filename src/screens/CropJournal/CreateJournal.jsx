import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import {
    Header,
    Input,
    GradientButton as Button,
    SafeArea, KeyboardAvoiding,
} from "../../components/";

import ManageCropContext from "../../context/ManageCropsContext";

import { addJournal } from "../../redux/actions";

import constants from "../../constants/";
import { addPost, editPost, getPosts } from "../../redux/actions/postsActions";
import { getUserPosts } from "../../redux/actions/authActions";

const { colors } = constants;

const CreateJournal = ({
  navigation,
  route,
  defaultPostImage = "",
  currentIndex,
}) => {
  const dispatch = useDispatch();
  const postData = route?.params?.params?.post;

  const manageCropContext = useContext(ManageCropContext);
  const { cropToGrowDetails } = manageCropContext?.data;
  const { user, journal } = useSelector((state) => ({
    user: state?.auth.user,
    journal: state?.journal?.journals,
  }));

  const [post, setPost] = useState({
    content: postData?.content ?? "",
    user_id: user?.id,
    crop_id: cropToGrowDetails?.cropId,
    type: cropToGrowDetails?.cropVariety,
    title: cropToGrowDetails?.cropName,
    variety: cropToGrowDetails?.variety,
    postId: postData?.id ?? "",

    post_type: "private", //public
    isPublic: postData?.post_type === "public" ?? false,
    journalImageUri: postData?.media_url ?? defaultPostImage ?? "",
    media_url: postData?.media_url ?? defaultPostImage ?? "",
    thumbnail_url: postData?.media_url ?? defaultPostImage ?? "",

    isCoverImage: postData?.use_thumbnail ?? false,
  });
  const [addingJournal, setAddingJournal] = useState(false);

  const createJournalSchema = Yup.object().shape({
    content: Yup.string()
      .required("Required")
      .min(2, "Too Short!")
      .max(1000, "Too Long!"),
  });

  useEffect(() => {
    if (defaultPostImage) {
      setFieldValue("postImageUri", defaultPostImage);
      setPost((prevState) => ({
        ...prevState,
        postImageUri: defaultPostImage,
      }));
    }
    console.log({ bugzy: cropToGrowDetails });
    console.log({ bugzy2: postData });
    // pickImage();
  }, [defaultPostImage, currentIndex]);

  const goBack = () => {
    // navigation.navigate('Settings', {
    //   screen: 'Main-Profile',
    //   params: {
    //     indexOfItemToShow: 3,
    //   },
    // });
    //   navigation?.goBack()
    dispatch(getPosts());
    navigation.navigate("Crop-Journal", {
      screen: "Crop-Journal",
    });
  };

  const {
    handleChange,
    handleBlur,
    values,
    isValid,
    errors,
    setFieldValue,
    handleSubmit,
    dirty,
    touched,
  } = useFormik({
    initialValues: {
      content: postData?.content ?? "",
      user_id: user?.id,
      crop_id: cropToGrowDetails?.cropId,

      cropVariety: cropToGrowDetails.cropVariety,
      cropName: cropToGrowDetails.cropName,
      type: cropToGrowDetails?.cropVariety,
      title: cropToGrowDetails?.cropName,
      variety: cropToGrowDetails?.variety,
      postId: postData?.id ?? "",

      post_type: "private", //public
      isPublic: postData?.post_type === "public" ?? false,

      journalImageUri: postData?.media_url ?? defaultPostImage ?? "",
      media_url: postData?.media_url ?? defaultPostImage ?? "",
      thumbnail_url: postData?.media_url ?? defaultPostImage ?? "",

      isCoverImage: postData?.use_thumbnail ?? false,
    },

    validationSchema: createJournalSchema,
    onSubmit: async (data) => {
      const journalFormData = new FormData();

      const {
        user_id,
        crop_id,
        isPublic,
        content,
        variety,
        title,
        type,
        postId,
        journalImageUri = "",
        isCoverImage,
      } = data;

      journalFormData.append("user_id", user_id);
      journalFormData.append("title", title);
      journalFormData.append("crop_id", crop_id);
      journalFormData.append("variety", variety);
      journalFormData.append("type", type);
      journalFormData.append("postId", postId);
      journalFormData.append("post_type", isPublic ? "public" : "private");
      journalFormData.append("use_thumbnail", !!isCoverImage);
      journalFormData.append("content", content);
      if (!postData) {
        if (isPublic && journalImageUri === "") {
          Alert.alert("", "You've not added an image", [{ text: "Dismiss" }]);
        } else {
          if (journalImageUri && journalImageUri !== "") {
            journalFormData.append("thumbnail_url", {
              name: journalImageUri?.split("/").pop(),
              uri: journalImageUri,
              type: "image/*",
            });
            journalFormData.append("media_url", {
              name: journalImageUri?.split("/").pop(),
              uri: journalImageUri,
              type: "image/*",
            });
          }
        }
        setAddingJournal(true);
        await dispatch(addPost(journalFormData));
        dispatch(getUserPosts());
        dispatch(getPosts(true));
        setAddingJournal(false);
        navigation.navigate("Crop-Journal", {
          screen: "Crop-Journal",
        });
      } else {
        if (post.postImageUri !== postData.media_url) {
          journalFormData.append("thumbnail_url", {
            name: post.postImageUri?.split("/").pop(),
            uri: post.postImageUri,
            type: "image/*",
          });
          journalFormData.append("media_url", {
            name: post.postImageUri?.split("/").pop(),
            uri: post.postImageUri,
            type: "image/*",
          });
        }
        setAddingJournal(true);
        // await dispatch(editPost(journalFormData));

        dispatch(editPost(journalFormData, postId, false));
        setAddingJournal(false);
        dispatch(getUserPosts());
        dispatch(getPosts(true));
        navigation.navigate("Crop-Journal", {
          screen: "Crop-Journal",
        });
      }

      dispatch(getPosts(true));
    },

    enableReinitialize: true,
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      await setFieldValue("journalImageUri", result?.uri);
    }
  };
  const disableForm =
    !isValid ||
    !values.content ||
    (values.isPublic && !values.journalImageUri && true) ||
    (values.isCoverImage && !values.journalImageUri && true); //|| !values.journalImageUri;
  //
  useEffect(() => {
    return navigation.addListener("focus", () => {
      dispatch(getPosts());
    });
  }, [navigation]);
  useEffect(() => {
    // console.log({jghghghg: postData})
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
  return (
          <KeyboardAvoiding>
              <SafeArea>
                  <View style={{ flex: 1 }}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ justifyContent: "space-between" }}
      >
        <Header
          title="Journal entry"
          onIconPress={() =>
            navigation.navigate("Crop-Journal", {
              screen: "Crop-Journal",
            })
          }
          containerStyle={styles.headerStyle}
        />
        <View style={styles.postInput}>
          <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
            {values.journalImageUri ? (
              <Image
                source={{ uri: values.journalImageUri }}
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
          <View style={{ flex: 1, height: 150 }}>
            <Input
              placeholder="Write a journal entry…"
              onChangeText={handleChange("content")}
              value={values.content}
              // numberOfLines={4}
              inputStyle={{ flex: 1 }}
              containerStyle={{ flex: 1 }}
              multiline
            />
          </View>
        </View>
        <View style={styles.switchContainer}>
          <Text style={{ fontSize: 16 }}>Add to public profile</Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.pink }}
            value={values.isPublic}
            onValueChange={(value) => setFieldValue("isPublic", value)}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={{ fontSize: 16 }}>Make crop cover image</Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.pink }}
            value={values.isCoverImage}
            onValueChange={(value) => setFieldValue("isCoverImage", value)}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="Share"
          gradient={
            disableForm
              ? [colors.grey, colors.grey]
              : [colors.green, colors.greenDeep]
          }
          loading={addingJournal}
          // onPress={handleSubmit}
          onPress={disableForm ? () => {} : handleSubmit}
        />
      </View>
    </View>
    </SafeArea>
          </KeyboardAvoiding>
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
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 22,
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  footer: {
    padding: 22,
    justifyContent: "flex-end",
    marginBottom: "15%",

      // padding: 22,
      // justifyContent: "flex-end",
      // marginTop: "auto",
  },
});

export default CreateJournal;
