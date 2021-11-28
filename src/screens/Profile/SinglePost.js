import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { SafeArea } from "../../components";
import { GradientButton, SmallGradientButton } from "../../components/Button";
import constants from "../../constants";

const { colors } = constants;

const SinglePost = ({ navigation }) => {
  // const [showShare, setShowShare] = useState(false)
  // const [follow, setFollow] = useState(false)
  // const [grow, setGrow] = useState(false)
  // const toggleModal = () => setShowShare((prevState) => !prevState)
  const { selected: post } = useSelector((state) => state.posts);

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
          <View style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={[styles.postCard]} key={post.id}>
              <View
                activeOpacity={0.8}
                style={[styles.userDetail]}
                // onPress={() => navigation.navigate('Single-Post')}
                // onPress={() => navigation.navigate('User-details')}
              >
                <Image
                  style={[styles.imgAvatar]}
                  source={{ uri: post?.avatar }}
                />
                <Text style={[styles.imgText]}>{post?.fullname}</Text>
              </View>

              <View
                activeOpacity={0.8}
                // onPress={() => navigation.navigate('User-details')}
                // onPress={() => navigation.navigate('Single-Post')}
              >
                <Image
                  style={[styles.postImg]}
                  source={{ uri: post?.media_url }}
                />
              </View>

              <View style={[styles.dateTime]}>
                <Text style={[styles.date]}>
                  {new Date(post?.created_at).toDateString()}
                </Text>
                {/* <Text>...</Text> */}
              </View>

              <View style={[styles.postText]}>
                <Text style={[styles.boldContainer, {}]}>
                  {" "}
                  <Text style={[styles.bold]}>{post?.fullname}</Text>{" "}
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
                      post.name !== "noCropName" &&
                      post.name}{" "}
                    {post.variety !== null &&
                      post.variety !== "" &&
                      post.variety !== "null" &&
                    post.variety !== 'noVariety' &&
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
          </View>
        </LinearGradient>
      </SafeArea>
    </>
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
    overflow: "visible",
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
});

export default SinglePost;
