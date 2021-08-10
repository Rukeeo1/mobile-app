import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globe from "../../assets/globe.png";
import { SafeArea } from "../../components";
import constants from "../../constants";
import ModalSheet from "./ModalSheet";
import DeleteModal from "./DeleteModal";

import { getUserJobs } from "../../redux/actions";
import ShareModal from "../Profile/ShareModal";
import Toast from "react-native-toast-message";
import ManageCropContext, {
  useManageCropContext,
} from "../../context/ManageCropsContext";
import {
  getUserFollowers,
  getUserFollowing,
  getUserGrowList,
  getUserPosts,
  getUserProfile,
} from "../../redux/actions/authActions";
import { getPosts, selectPost } from "../../redux/actions/postsActions";

const { colors } = constants;

const CropJournalLists = ({ navigation }) => {
  const dispatch = useDispatch();
  const [spinner, setSpinnner] = useState(true);
  const [refreshing2, setRefreshing2] = React.useState(false);
  const { loading, refreshing } = useSelector((state) => state.loading);
  const [text, setText] = useState(false);
  const [search, setSearch] = useState("");

  let spinValue = new Animated.Value(0);
  const onRefresh = React.useCallback(() => {
    setRefreshing2(true);
    wait(2000).then(() => setRefreshing2(false));
  }, []);
  // First set up animation
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  }).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  setTimeout(() => {
    setSpinnner(false);
  }, 1000);

  const { actions } = useManageCropContext();

  const manageCropContext = useContext(ManageCropContext);
  const { cropToGrowDetails } = manageCropContext?.data;

  const [showShare, setShowShare] = useState(false);
  const [postToShare, setPostToShare] = useState(null);
  const { user, userData, posts, following, followers } = useSelector(
    (state) => state.auth
  );
  const { journal } = useSelector((state) => ({
    user: state?.auth.user,
    journal: state,
  }));
  const toggleModal = (post) => {
    setShowShare((prevState) => !prevState);
    setPostToShare(post);
  };

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserGrowList());
    dispatch(getUserPosts());
    dispatch(getUserJobs(user?.id));
    dispatch(getUserFollowers(false, true));
    dispatch(getUserFollowing(false, true));
    dispatch(getPosts(true));
    console.log({ timxxt: posts });
  }, []);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      dispatch(getPosts());
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let cleanedUp = false;

      dispatch(getPosts());

      return () => {
        cleanedUp = true;
      };
    }, [])
  );

  return (
    <SafeArea>
      <TouchableOpacity style={styles.plusButtonContainer}>
        <AntDesign
          name="plus"
          size={24}
          color={colors.blue}
          onPress={() => navigation.navigate("Create-Journal")}
        />
      </TouchableOpacity>
      <View
        style={{
          transform: [{ rotate: "-90deg" }],
          position: "absolute",
          zIndex: 343,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          bottom: 200,
          left: -35,
        }}
      >
        <Text
          style={{
            color: colors.white,
            overflow: "visible",
          }}
        >
          Add to Crop Journal
        </Text>
      </View>
      <LinearGradient
        style={styles.container}
        colors={[colors.purshBlue, colors.blue]}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexGrow: 1,
            width: Dimensions.get("screen").width * 0.1,
            overflow: "visible",
          }}
        >
          <AntDesign
            name="left"
            size={24}
            color={colors.white}
            style={{ marginTop: 30, marginLeft: 0 }}
            onPress={() => navigation.goBack()}
          />
        </View>

        <ScrollView
          nestedScrollEnabled
          style={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || loading}
              onRefresh={() => dispatch(getPosts(true))}
              tintColor={colors.blue}
              colors={[colors.blue]}
            />
          }
        >
          {posts?.length > 0 &&
            posts
              ?.filter((post) => post?.crop_id === cropToGrowDetails.cropId)
              .filter((post) => post?.post_type === "private")
              .map((post) => {
                return (
                  <View style={[styles.postCard]}>
                    <View style={[styles.postAvatarContainer]}>
                      <Image
                        style={[styles.postAvatarImg]}
                        source={{ uri: user?.avatar }}
                      />
                      <Text style={[styles.postTitle]}>{user?.fullname}</Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={1}
                      // onPress={() => navigation.navigate('User-details')}
                      onPress={() => {
                        dispatch(selectPost(post));
                        navigation.navigate("Single-Post2");
                      }}
                    >
                      {post?.media_url ? (
                        <Image
                          style={[styles.postImg]}
                          source={{ uri: post.media_url }}
                        />
                      ) : (
                        <></>
                      )}
                    </TouchableOpacity>

                    <View style={[styles.postDateTime]}>
                      <Text
                        style={{
                          fontFamily: "Hero-New-Light-Italic",
                          color: "#9B9B9B",
                        }}
                      >
                        {new Date(post.created_at).toDateString()}
                      </Text>
                      <TouchableOpacity onPress={() => toggleModal(post)}>
                        <Text>...</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginLeft: 15 }}>
                      <Text style={{ fontFamily: "Hero-New-Light" }}>
                        <Text style={{ fontFamily: "Hero-New-Medium" }}>
                          {post?.title}
                        </Text>
                      </Text>

                      <Text style={{ fontFamily: "Hero-New-Medium" }}>
                        {cropToGrowDetails.cropName}{" "}
                        {cropToGrowDetails.variety !== null && (
                          <>{`- ‘${cropToGrowDetails.variety}’`}</>
                        )}
                      </Text>
                    </View>
                  </View>
                );
              })}
          <ShareModal
            showBottomSheet={showShare}
            setShowShare={toggleModal}
            post={postToShare}
            Toast={Toast}
          />
        </ScrollView>

        <Toast ref={(ref) => Toast.setRef(ref)} />
      </LinearGradient>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    overflow: "visible",
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    width: Dimensions.get("screen").width * 0.8,
    paddingBottom: 50,
  },
  plusButtonContainer: {
    backgroundColor: colors.white,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    bottom: 85,
    left: 20,
    position: "absolute",
    zIndex: 423,
  },
  profileImg: {
    width: "100%",
    height: Dimensions.get("window").height / 3,
  },
  detailsContainer: {
    alignItems: "center",
    textAlign: "center",
  },
  detaileText: {
    fontSize: 14,
  },
  title: {
    fontSize: 32,
    lineHeight: 45,
    marginVertical: 10,
    fontFamily: "Hero-New-Thin",
    textAlign: "center",
  },
  edit: {
    marginVertical: 15,
    fontWeight: "bold",
    fontFamily: "Hero-New-Medium",
  },
  follows: {
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    fontFamily: "Hero-New-Medium",
  },
  followsText: {
    fontWeight: "bold",
  },
  growList: {
    backgroundColor: colors.nearWhite,
    paddingVertical: 20,
    // paddingRight: 5,
    alignItems: "center",
    fontFamily: "Hero-New-Light",
  },
  growCard: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  growTitle: {
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "Hero-New-Medium",
  },
  growTitle2: {
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "Hero-New-Light",
  },
  growText: {
    textAlign: "center",
    fontFamily: "Hero-New-Light",
    fontSize: 11,
    maxWidth: 100,
  },
  btnText: {
    color: colors.white,
    fontWeight: "bold",
  },
  growMovement: {
    height: 350,
  },
  growMovementImgContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  growMovementImg: {
    width: 255,
    height: 255,
    position: "absolute",
  },
  growMoveTextContainer: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue,
  },
  growMoveText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 5,
    maxWidth: 90,
  },
  growMoveFooterText: {
    textAlign: "center",
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 16,
    marginBottom: 40,
  },
  postCard: {
    marginBottom: 40,
  },
  postAvatarImg: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  postAvatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 15,
  },
  postTitle: {
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 14,
    fontFamily: "Hero-New-Medium",
  },
  postImg: {
    width: "100%",
    height: 353,
  },
  postDateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    marginLeft: 15,
    fontFamily: "Hero-New-Light-Italic",
  },
  bold: {
    fontWeight: "bold",
  },
});

export default CropJournalLists;
