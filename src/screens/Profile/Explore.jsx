import { EvilIcons } from "@expo/vector-icons";
import React, { useState, useCallback, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  RefreshControl,
} from "react-native";
import { Input } from "../../components";
import constants from "../../constants/";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import {
  getPosts,
  getPostUser,
  selectPost,
} from "../../redux/actions/postsActions";
import {
  followUser,
  getUserFollowers,
  getUserFollowing,
  getUserGrowList,
  getUserPosts,
  getUserProfile,
  signOut,
} from "../../redux/actions/authActions";
import { BottomSheet } from "react-native-btr";
import ShareModal from "./ShareModal";
import Toast from "react-native-toast-message";
import { getUserJobs } from "../../redux/actions";

const { colors } = constants;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Explore = () => {
  const navigation = useNavigation();
  const [showShare, setShowShare] = useState(false);
  const [spinner, setSpinnner] = useState(true);
  const [refreshing2, setRefreshing2] = React.useState(false);
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

  const dispatch = useDispatch();
  const { loading, refreshing } = useSelector((state) => state.loading);
  const { all: posts = [] } = useSelector((state) => state.posts);
  const {
    following = [],
    user,
    followers,
  } = useSelector((state) => state.auth);

  const [postToShare, setPostToShare] = useState(null);
  useEffect(() => {
    dispatch(getUserFollowers());
    //   if(posts && typeof posts !== 'undefined'){
    //       dispatch(getPosts());
    //   }
    //   if(followers && typeof followers !== 'undefined'){
    //       dispatch(getUserFollowers());
    //   }
    dispatch(getPosts());
  }, []);

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

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={{
            flexGrow: 1,
          }}
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
          <View style={[styles.container]}>
            <>
              <View style={styles.searchBarWrapper}>
                <Input
                  placeholder="Search"
                  containerStyle={styles.searchInputContainer}
                  inputStyle={{ marginTop: -10, paddingRight: 10 }}
                  onChangeText={(val) => setSearch(val)}
                  value={search}
                >
                  <EvilIcons
                    name="search"
                    size={24}
                    color={colors.blue}
                    style={{
                      right: 10,
                      top: "30%",
                      position: "absolute",
                    }}
                  />
                </Input>
                {search !== "" && (
                  <TouchableOpacity
                    style={styles.cancelContainer}
                    onPress={() => setSearch("")}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>

            {
              <View style={[styles.flowercircle]}>
                {spinner && (
                  <Animated.Image
                    style={{ transform: [{ rotate: spin }] }}
                    source={require("../../assets/flowercircle.png")}
                  />
                )}
              </View>
            }
            {search === "" ? (
              <View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: "#002B55",
                    height: 88,
                    alignItems: "center",
                    paddingLeft: 19,
                    flexDirection: "row",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onPress={() => navigation.navigate("Article-guide")}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={require("../../assets/book-w.png")} />
                    <Text
                      style={{
                        fontSize: 16,
                        color: "white",
                        marginRight: 20,
                        width: 210,
                        paddingLeft: 25,
                      }}
                    >
                      Explore the latest Grow It guides and articles
                    </Text>
                  </View>
                  <View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
                {posts
                  ?.filter(
                    (post) =>
                      post?.fullname
                        ?.toLowerCase()
                        ?.includes(search.toLowerCase()) ||
                      post?.title
                        ?.toLowerCase()
                        ?.includes(search.toLowerCase()) ||
                      post?.content
                        ?.toLowerCase()
                        ?.includes(search.toLowerCase())
                  )
                  ?.map((post) => {
                    let isFollowing =
                      !!following?.find((user) => user?.id === post?.user_id) ??
                      false;

                    return (
                      <View style={[styles.postCard]} key={post.id}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={[styles.userDetail]}
                          onPress={() => {
                            dispatch(selectPost(post));
                            dispatch(getPostUser(post?.user_id));
                            post?.user_id !== user?.id
                              ? navigation.navigate("User-details")
                              : "";
                          }}
                          // onPress={() => navigation.navigate('User-details')}
                        >
                          <Image
                            style={[styles.imgAvatar]}
                            source={{ uri: post?.avatar }}
                          />
                          <Text style={[styles.imgText]}>{post?.fullname}</Text>
                          {post?.user_id !== user?.id && (
                            <TouchableOpacity
                              style={{
                                width: "65%",
                              }}
                              onPress={() => {
                                if (!isFollowing) {
                                  isFollowing = true;
                                  dispatch(followUser(post?.user_id));
                                }
                              }}
                            >
                              <Text
                                style={{
                                  textAlign: "right",
                                  fontWeight: "bold",
                                  color: "#1369BE",
                                  textDecorationLine: isFollowing
                                    ? "none"
                                    : "none",
                                }}
                              >
                                {isFollowing ? "Following" : "Follow"}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={1}
                          // onPress={() => navigation.navigate('User-details')}
                          onPress={() => {
                            dispatch(selectPost(post));
                            navigation.navigate("Single-Post");
                          }}
                        >
                          {post?.media_url ? (
                            <Image
                              style={[styles.postImg]}
                              source={{
                                uri:
                                  post?.media_url !== ""
                                    ? post?.media_url
                                    : null,
                              }}
                            />
                          ) : (
                            <View style={[styles.postImg]}></View>
                          )}
                        </TouchableOpacity>

                        <View style={[styles.dateTime]}>
                          <Text style={[styles.date]}>
                            {new Date(post?.created_at)
                              .toDateString()
                              .split(" ")
                              .slice(1)
                              .join(" ")}
                          </Text>
                          <TouchableOpacity onPress={() => toggleModal(post)}>
                            <Text>...</Text>
                          </TouchableOpacity>
                        </View>

                        <View style={[styles.postText]}>
                          <Text style={[styles.boldContainer, {}]}>
                            {" "}
                            <Text style={[styles.bold]}>
                              {post?.fullname}
                            </Text>{" "}
                            {post?.title}
                            {/* {!text && (
                      <Text
                        style={{ color: '#085BAC' }}
                        onPress={() => setText(!text)}
                      >
                        ...more
                      </Text>
                    )}
                    {text && <Text> yes, patient is golden any time!</Text>} */}
                          </Text>
                          {/*<Text style={{ fontFamily: "Hero-New-Medium" }}>*/}
                          {/*  {post.name}{" "}*/}
                          {/*  {post.variety !== null &&*/}
                          {/*    post.variety !== "null" &&*/}
                          {/*    post.variety !== "undefined" &&*/}
                          {/*      <>{`- ‘${post.variety}’`}</>*/}
                          {/*    }*/}
                          {/*</Text>*/}
                          <View style={{ paddingLeft: 25, paddingTop: 10 }}>
                            <Text
                              style={{
                                fontFamily: "Hero-New-Medium",
                              }}
                            >
                              {post.name !== null &&
                                post.name !== "" &&
                                post.name !== "null" &&
                                post.name !== "undefined" &&
                                post.name}{" "}
                              {post.variety !== null &&
                                post.variety !== "" &&
                                post.variety !== "null" &&
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
                      </View>
                    );
                  })}
              </View>
            ) : (
              <View style={styles.floatView}>
                {followers
                  ?.filter((item) =>
                    item?.fullname
                      ?.toLowerCase()
                      ?.includes(search.toLowerCase())
                  )
                  ?.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(getPostUser(item?.id));
                        item?.id !== user?.id
                          ? navigation.navigate("User-details")
                          : "";
                      }}
                    >
                      <View style={styles.followItem} key={index}>
                        <Image
                          source={{ uri: item.avatar }}
                          style={styles.image}
                        />
                        <Text style={styles.followItemText}>
                          {item?.fullname}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </View>
          <ShareModal
            showBottomSheet={showShare}
            setShowShare={toggleModal}
            post={postToShare}
            Toast={Toast}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  searchContainer: {
    marginTop: 55,
    marginHorizontal: 25,
  },
  flowercircle: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  postCard: {
    marginVertical: 10,
  },
  userDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    width: "100%",
    minWidth: "100%",
    display: "flex",
  },
  imgAvatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  imgText: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  postImg: {
    width: "100%",
    height: 356,
    marginVertical: 10,
  },
  dateTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  date: {
    color: colors.greyDark,
    fontFamily: "Hero-New-Light-Italic",
  },
  postText: {
    marginVertical: 10,
  },
  boldContainer: {
    marginHorizontal: 20,
  },
  bold: {
    fontWeight: "bold",
  },

  /// search relate ===. to be pulled out
  searchBarWrapper: {
    paddingHorizontal: "5%",
    paddingTop: 20,
    flexDirection: "row",
  },
  searchInputContainer: {
    backgroundColor: colors.grey,
    justifyContent: "center",
    borderRadius: 20,
    height: 46,
    paddingLeft: 15,
    paddingRight: 25,
    flex: 1,
  },
  image: {
    height: 41,
    width: 41,
    borderRadius: 20.5,
  },
  followItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  followItemText: {
    fontWeight: "500",
    marginLeft: 14,
  },
  floatView: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: "white",
  },

  cancelContainer: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    color: colors.greyDark,
    fontWeight: "300",
  },
});

export default Explore;
