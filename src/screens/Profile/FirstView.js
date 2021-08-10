import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { useManageCropContext } from "../../context/ManageCropsContext";

import {
  getUserFollowers,
  getUserFollowing,
  getUserGrowList,
  getUserPosts,
  getUserProfile,
} from "../../redux/actions/authActions";

import { GradientButton } from "../../components/Button";
import constants from "../../constants";
import ShareModal from "./ShareModal";
import { getUserJobs } from "../../redux/actions";

const { colors, monthsAbr } = constants;

const FirstView = () => {
  const dispatch = useDispatch();
  const { user, userData, posts, following, followers } = useSelector(
    (state) => state.auth
  );
  const { loading, refreshing, fetchingMore } = useSelector(
    (state) => state.loading
  );

  const { jobs, loadingJobs } = useSelector(
    (state) => ({
      jobs: state.jobs.usersJobs,
      loadingJobs: state.jobs.loadingJobs,
    }),
    shallowEqual
  );

  const { actions } = useManageCropContext();

  const [showShare, setShowShare] = useState(false);
  const [postToShare, setPostToShare] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserGrowList());
    dispatch(getUserPosts());
    dispatch(getUserJobs(user?.id));
    dispatch(getUserFollowers(false, true));
    dispatch(getUserFollowing(false, true));
  }, []);

  const toggleModal = (post) => {
    setShowShare((prevState) => !prevState);
    setPostToShare(post);
  };

  const handleNavigation = (path, params) => {
    navigation.navigate(path, params);
  };

  const handleCurrentGrowingNav = (job) => () => {
    actions?.updateCropToGrowDetails({
      cropName: job?.name,
      month: monthsAbr[new Date(job.job_date).getMonth()],
      variety: job?.variety,
      monthIndex: new Date(job.job_date).getMonth(),
      cropId: job?.crop_id,
      // action: job?.job_type,
      jobDate: job?.job_date,
      fromJobs: true,
      jobId: job.id,
    });

    handleNavigation("Grow-Crop");
  };

  return (
    <View style={{ backgroundColor: colors.white }}>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {user?.avatar ? (
          <Image source={{ uri: user?.avatar }} style={styles.profileImg} />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.grey100,
              ...styles.profileImg,
            }}
          >
            <Ionicons
              name="ios-person-outline"
              size={45}
              color={colors.white}
            />
          </View>
        )}
        {loading || fetchingMore || loadingJobs || refreshing ? (
          <View
            style={{
              paddingVertical: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator color={colors.green} animating size="small" />
          </View>
        ) : (
          <>
            <View style={[styles.detailsContainer, styles.detaileText]}>
              <Text style={[styles.title]}>{user?.fullname}</Text>
              <Text style={{ fontFamily: "Hero-New-Light", fontSize: 14 }}>
                {user?.biography}
              </Text>
              <Text style={{ fontFamily: "Hero-New-Light", fontSize: 14 }}>
                {user?.location}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Profile-Settings")}
              >
                <Text style={styles.edit}>Edit profile</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.detailsContainer, styles.follows]}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Following")}
              >
                <Text style={[styles.followsText]}>
                  {following?.length ?? userData?.following_count ?? 0}{" "}
                  Following
                </Text>
              </TouchableOpacity>
              <Text>{"|"}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Followers")}
              >
                <Text style={[styles.followsText]}>
                  {followers?.length ?? userData?.follower_count ?? 0} Followers
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.growList]}>
              {jobs?.jobs?.length > 0 ? (
                <>
                  <Text style={[styles.growTitle]}>Current Grow It List</Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {jobs?.jobs?.map((crop) => {
                      return crop.job_type !== "HARVEST" ? (
                        <CurrentGrowList
                          crop={crop}
                          onPress={handleCurrentGrowingNav(crop)}
                        />
                      ) : null;
                    })}
                  </ScrollView>
                </>
              ) : (
                <View>
                  <Text style={[styles.growTitle2]}>
                    You aren’t growing anything!
                  </Text>
                  <GradientButton
                    gradient={[colors.green, colors.greenDeep]}
                    onPress={() =>
                      navigation.navigate("Main-Profile", {
                        screen: "Main-Profile",
                        indexOfItemToShow: 5,
                      })
                    }
                  >
                    <View
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        width: "100%",
                        paddingHorizontal: 30,
                      }}
                    >
                      <Text style={[styles.btnText]}>Add to Grow Calendar</Text>
                      <Image
                        style={{ width: 25, height: 25 }}
                        source={require("../../assets/calendar-page.png")}
                      />
                    </View>
                  </GradientButton>
                </View>
              )}
            </View>

            {posts?.length > 0 ? (
              posts?.map((post) => {
                return (
                  <View style={[styles.postCard]}>
                    <View style={[styles.postAvatarContainer]}>
                      <Image
                        style={[styles.postAvatarImg]}
                        source={{ uri: user?.avatar }}
                      />
                      <Text style={[styles.postTitle]}>{user?.fullname}</Text>
                    </View>

                    <View>
                      <Image
                        style={[styles.postImg]}
                        source={{ uri: post.media_url }}
                      />
                    </View>

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
                        {/* {' '}
                        {post.content} */}
                      </Text>

                      {/* <Text style={{ fontFamily: 'Hero-New-Medium' }}>Tomatoes - ‘Sungold’</Text> */}
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={[styles.growMovement]}>
                <View style={[styles.growMovementImgContainer]}>
                  <Image
                    style={[styles.growMovementImg]}
                    source={require("../../assets/grow-movement.png")}
                    resizeMode="contain"
                  />
                  <LinearGradient
                    colors={[colors.purshBlue, colors.blue]}
                    style={[styles.growMoveTextContainer]}
                  >
                    <Text style={[styles.growMoveText]}>
                      You joined the Grow It movement!
                    </Text>
                    <Text style={{ color: "#fff", marginTop: 7 }}>
                      {
                        constants.monthsAbr[
                          new Date(user?.createdAt).getMonth()
                        ]
                      }{" "}
                      {new Date(user?.createdAt).getFullYear()}
                    </Text>
                  </LinearGradient>
                </View>
                <Text style={[styles.growMoveFooterText]}>
                  Click the ‘+’ in the side bar to create your first post!
                </Text>
              </View>
            )}
          </>
        )}
        <ShareModal
          showBottomSheet={showShare}
          setShowShare={toggleModal}
          post={postToShare}
          Toast={Toast}
        />
      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const CurrentGrowList = ({ crop, onPress }) => {
  return (
    <TouchableOpacity style={[styles.growCard]} onPress={onPress}>
      <Image
        source={{ uri: crop.thumbnail_url }}
        style={{ height: 60, width: 60, borderRadius: 30 }}
      />
      <Text style={[styles.growText]}>
        {crop.name} {crop.variety ? `“${crop?.variety}”` : ""}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default FirstView;
