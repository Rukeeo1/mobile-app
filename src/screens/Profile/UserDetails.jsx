import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { SafeArea } from "../../components";
import { GradientButton, SmallGradientButton } from "../../components/Button";
import constants from "../../constants";
import {
  followUser,
  getUserFollowers,
  getUserFollowing,
  getUserGrowList,
  getUserGrowList2,
  getUserPosts,
  getUserProfile,
} from "../../redux/actions/authActions";
import { getPosts, getPostUser } from "../../redux/actions/postsActions";
import { getUserJobs } from "../../redux/actions";

const { colors } = constants;
const UserDetails = ({ navigation }) => {
  const { jobs, loadingJobs } = useSelector(
    (state) => ({
      jobs: state.jobs.usersJobs,
      loadingJobs: state.jobs.loadingJobs,
    }),
    shallowEqual
  );
  const [showShare, setShowShare] = useState(false);
  const [follow, setFollow] = useState(false);
  const [grow, setGrow] = useState(false);
  const toggleModal = () => setShowShare((prevState) => !prevState);

  const dispatch = useDispatch();
  const {
    selectedUser: { data, posts, growitList, userData, followers },
  } = useSelector((state) => state.posts);
  const { following = [] } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.loading);
  let isFollowing = !!following?.find((user) => user?.id === data?.id) ?? false;

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserGrowList2(data?.id));
    dispatch(getUserPosts());
    dispatch(getUserJobs(data?.id));
    dispatch(getUserFollowers(false, true));
    dispatch(getUserFollowing(false, true));
  }, []);

  return (
    <>
      <SafeArea>
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
          {/* </View> */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => dispatch(getPostUser(data?.id))}
                tintColor={colors.purshBlue}
                colors={[colors.purshBlue]}
              />
            }
          >
            <View>
              <View>
                <View>
                  <Image
                    source={{ uri: data?.avatar }}
                    // source={require('../../assets/details.png')}
                    style={[styles.profileImg]}
                  />
                </View>
                <View style={[styles.detailsContainer, styles.detaileText]}>
                  <Text style={[styles.title]}>{data?.fullname}</Text>
                  <Text>{data?.biography}</Text>
                  <Text>{data?.location}</Text>
                </View>

                {!follow && (
                  <View style={{ paddingHorizontal: "6%" }}>
                    <SmallGradientButton
                      gradient={
                        isFollowing
                          ? [colors.purshBlue, colors.blue]
                          : [colors.red, colors.redDeep]
                      }
                      onPress={() => {
                        if (isFollowing) {
                          // TODO: undollow
                        } else {
                          setFollow(true);
                          dispatch(followUser(data?.id, false));
                        }
                      }}
                    >
                      <Text style={[styles.btnText]}>
                        {isFollowing ? "Following" : "Follow"}
                      </Text>
                    </SmallGradientButton>
                  </View>
                )}

                {follow && (
                  <View
                    activeOpacity={0.7}
                    style={[
                      styles.detailsContainer,
                      styles.follows,
                      { marginTop: 30 },
                    ]}
                    // onPress={() => setFollow(!follow)}
                  >
                    <View activeOpacity={0.7}>
                      <Text style={[styles.followsText]}>
                        {data?.following_count} Following
                      </Text>
                    </View>
                    <Text>{"|"}</Text>
                    <View activeOpacity={0.7}>
                      <Text style={[styles.followsText]}>
                        {data?.follower_count} Followers
                      </Text>
                    </View>
                  </View>
                )}

                {growitList?.length < 1 ? (
                  <View
                    style={{
                      paddingHorizontal: "6%",
                      backgroundColor: "#F7F7F7",
                      paddingVertical: 20,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {data?.fullname} isn't growing anything!
                    </Text>
                  </View>
                ) : (
                  <View style={[styles.growListWrapper]}>
                    <Text style={[styles.growTitle]}>Current Grow It List</Text>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {growitList?.map((item, i) => {
                        // return (
                        return (
                          item?.job_type !== "KILLED" && (
                            <View style={[styles.growCard]} key={item?.id ?? i}>
                              <Image
                                style={{
                                  height: 70,
                                  width: 70,
                                  borderRadius: 70 / 2,
                                }}
                                source={
                                  item?.thumbnail_url
                                    ? { uri: item?.thumbnail_url }
                                    : require("../../assets/growavatar.png")
                                }
                              />
                              <Text style={[styles.growText]}>
                                {item?.name}{" "}
                                {item?.variety ? `“${item?.variety}”` : ""}
                              </Text>
                            </View>
                          )
                        );
                      })}
                    </ScrollView>
                  </View>
                )}
                {posts?.map((post) => {
                  return (
                    <View style={[styles.postCard]}>
                      <View style={[styles.postAvatarContainer]}>
                        <Image
                          style={[styles.postAvatarImg]}
                          source={{ uri: data?.avatar }}
                        />
                        <Text style={[styles.postTitle]}>{data?.fullname}</Text>
                      </View>

                      <View>
                        <Image
                          style={[styles.postImg]}
                          source={{ uri: post?.media_url }}
                        />
                      </View>

                      <View style={[styles.postDateTime]}>
                        <Text>{new Date(post.created_at).toDateString()}</Text>
                        {/* <TouchableOpacity onPress={toggleModal}>
                          <Text>...</Text>
                        </TouchableOpacity> */}
                      </View>

                      <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontFamily: "Hero-New-Light" }}>
                          <Text style={{ fontFamily: "Hero-New-Medium" }}>
                            {post?.title}
                          </Text>
                          {/* {' '}
                          {post.content} */}
                          {post.name !== null &&
                            post.name !== "" &&
                            post.name !== "null" &&
                            post.name !== "undefined" &&
                            post.name !== "noCropName" &&
                            post.name}{" "}
                          {post.variety !== null &&
                            post.variety !== "" &&
                            post.variety !== "null" &&
                            post.variety !== "noVariety" &&
                            post.variety !== "undefined" && (
                              <Text
                                style={{
                                  fontFamily: "Hero-New-Light-Italic",
                                }}
                              >{`- ‘${post.variety}’`}</Text>
                            )}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={{ height: 50, backgroundColor: colors.white }} />
          </ScrollView>
        </LinearGradient>
      </SafeArea>
    </>
  );
};

const CurrentGrowList = ({ crop, onPress }) => {
  return (
    <TouchableOpacity style={[styles.growCard]} onPress={onPress}>
      <Image
        source={{ uri: crop?.alternate_thumbnail ?? crop.thumbnail_url }}
        style={{ height: 60, width: 60, borderRadius: 30 }}
      />
      <Text style={[styles.growText]}>
        {crop.name}
        {"\n"}
        {crop.crop_type && crop.crop_type !== "N/A"
          ? `“${crop?.crop_type}”`
          : ""}
      </Text>
    </TouchableOpacity>
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
    width: Dimensions.get("screen").width,
    paddingBottom: 50,
    overflow: "visible",
  },
  profileImg: {
    width: "100%",
    height: Dimensions.get("window").height / 3,
  },
  detailsContainer: {
    alignItems: "center",
    textAlign: "center",
    marginTop: 5,
  },
  detaileText: {
    fontSize: 14,
  },
  title: {
    fontSize: 32,
    lineHeight: 45,
    marginVertical: 10,
    fontWeight: "100",
    fontFamily: "Hero-New-Light",
  },
  edit: {
    marginVertical: 15,
    fontWeight: "bold",
  },
  follows: {
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  followsText: {
    fontWeight: "bold",
  },
  growList: {
    backgroundColor: colors.nearWhite,
    padding: 20,
    paddingRight: 5,
    alignItems: "center",
  },
  growCard: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  growListWrapper: {
    backgroundColor: colors.nearWhite,
    marginTop: 15,
    marginBottom: 15,
    paddingBottom: 25,
  },
  growTitle: {
    textAlign: "center",
    marginTop: 25,
    marginBottom: 15,
    fontFamily: "Hero-New-Medium",
  },
  growText: {
    maxWidth: 120,
    textAlign: "center",
  },
  btnText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 18,
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
  },
  postCard: {
    marginVertical: 40,
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
  },
  bold: {
    fontWeight: "bold",
  },
});

export default UserDetails;
