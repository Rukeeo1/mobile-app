import React, { useEffect } from "react";
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import constants from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../redux/actions/notificationsActions";

const { colors } = constants;
const Notification = () => {
  const dispatch = useDispatch();
  const { loading, refreshing } = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* <SafeAreaView> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading || refreshing}
            onRefresh={() => dispatch(getNotifications(true))}
            colors={[colors.green]}
            tintColor={colors.green}
          />
        }
      >
        <View>
          <View style={[styles.topSection]}>
            <Text style={[styles.title]}>Notifications</Text>
            <View style={[styles.subTitle]}>
              <Text style={[styles.boldText]}>Today</Text>
              <Text style={[styles.markAsRead]}>Mark all as read</Text>
            </View>
          </View>

          <View style={[styles.todaySection]}>
            <View style={[styles.Card]}>
              <View>
                <Image
                  source={require("../../assets/avatarimg.png")}
                  style={{ height: 54, width: 54, borderRadius: 27 }}
                />
              </View>
              <View style={[styles.cardText]}>
                <Text>
                  <Text style={[styles.boldText]}>Namee</Text> Has started
                  following you
                </Text>
                <Text style={[styles.cardSubText]}>06 December at 10:04am</Text>
              </View>
            </View>
            <View style={[styles.Card]}>
              <View>
                <Image
                  source={require("../../assets/avatarimg.png")}
                  style={{ height: 54, width: 54, borderRadius: 27 }}
                />
              </View>
              <View style={[styles.cardText]}>
                <Text>
                  <Text style={[styles.boldText]}>Namee</Text> Has started
                  following you
                </Text>
                <Text style={[styles.cardSubText]}>06 December at 10:04am</Text>
              </View>
            </View>
          </View>

          {/* horizontl  line */}
          <View style={[styles.Line]} />

          <View style={[styles.sections]}>
            <Text style={[styles.sectionTitle]}>Yesterday</Text>

            <View style={[styles.Card]}>
              <View>
                <Image
                  source={require("../../assets/avatarimg.png")}
                  style={{ height: 54, width: 54, borderRadius: 27 }}
                />
              </View>
              <View style={[styles.cardText]}>
                <Text style={[styles.text]}>
                  Don’t forget to Sow/Plant It today! Update your crop card to
                  tick off your job 🌱
                </Text>
                <Text style={[styles.cardSubText]}>06 December at 10:04am</Text>
              </View>
            </View>
          </View>

          {/* <View style={[styles.Line]} /> */}

          <View style={[styles.sections]}>
            {/* <Text style={[styles.sectionTitle]}>This week</Text> */}
            {/* 
              <View style={[styles.Card]}>
                <View>
                  <Image
                    source={require('../../assets/avatarimg.png')}
                    style={{ height: 54, width: 54, borderRadius: 27 }}
                  />
                </View>
                <View style={[styles.cardText]}>
                  <Text style={[styles.text]}>
                    Don’t forget to Sow/Plant It today! Update your crop card to
                    tick off your job 🌱
                  </Text>
                  <Text style={[styles.cardSubText]}>
                    06 December at 10:04am
                  </Text>
                </View>
              </View> */}
            {/* <View style={[styles.Card]}>
                <View>
                  <Image
                    source={require('../../assets/avatarimg.png')}
                    style={{ height: 54, width: 54, borderRadius: 27 }}
                  />
                </View>
                <View style={[styles.cardText]}>
                  <Text style={[styles.text]}>
                    You have jobs to tick off today 🧤
                  </Text>
                  <Text style={[styles.cardSubText]}>
                    06 December at 10:04am
                  </Text>
                </View>
              </View> */}
          </View>

          {/* <View style={[styles.Line]} /> */}

          <View style={[styles.sections]}>
            {/* <Text style={[styles.sectionTitle]}>Earlier</Text> */}

            {/* <View style={[styles.Card]}>
                <View>
                  <Image
                    source={require('../../assets/avatarimg.png')}
                    style={{ height: 54, width: 54, borderRadius: 27 }}
                  />
                </View>
                <View style={[styles.cardText]}>
                  <Text style={[styles.text]}>
                    <Text style={[styles.boldText]}>Namee</Text> Has started
                    following you
                  </Text>
                  <Text style={[styles.cardSubText]}>
                    06 December at 10:04am
                  </Text>
                </View>
              </View> */}
            {/* <View style={[styles.Card]}>
                <View>
                  <Image
                    source={require('../../assets/avatarimg.png')}
                    style={{ height: 54, width: 54, borderRadius: 27 }}
                  />
                </View>
                <View style={[styles.cardText]}>
                  <Text style={[styles.text]}>
                    <Text style={[styles.boldText]}>Namee</Text> Has started
                    following you
                  </Text>
                  <Text style={[styles.cardSubText]}>
                    06 December at 10:04am
                  </Text>
                </View>
              </View> */}
          </View>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 25,
  },
  topSection: {
    marginBottom: 25,
    paddingLeft: 25,
    paddingRight: 25,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "100",
    marginTop: 70,
    marginBottom: 15,
  },
  subTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todaySection: {
    backgroundColor: colors.greenTransparent,
    paddingLeft: 25,
    paddingRight: 25,
    paddingVertical: 10,
  },
  Card: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    marginLeft: 10,
  },
  text: {
    maxWidth: "90%",
  },
  cardSubText: {
    color: colors.greyDark,
    fontSize: 13,
    marginTop: 3,
  },
  imgAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderBottomColor: "dodgerblue",
    borderWidth: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  markAsRead: {
    color: colors.green,
    fontWeight: "bold",
  },
  Line: {
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
    marginLeft: 25,
    marginRight: 30,
    marginVertical: 20,
  },
  sectionTitle: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  sections: {
    paddingLeft: 25,
    paddingRight: 25,
  },
});
export default Notification;
