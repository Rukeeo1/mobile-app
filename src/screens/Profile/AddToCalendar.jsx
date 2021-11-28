import React, { useState, useRef, useEffect, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { JobItem } from "./JobItem";
import { JobItem2 } from "./JobItem2";

import {
  GradientButton,
  Text,
  FavoriteCropItem,
  SafeArea,
  KeyboardAvoiding,
  Input,
} from "../../components";

import {
  addReminder,
  getCropsFavoriteToGrow,
  getJobHistory,
  getUserJobs,
  getUserReminders,
    getUserOldJobs,
  updateReminder,
} from "../../redux/actions";
import ManageCropContext from "../../context/ManageCropsContext";

import constants from "../../constants";

const {
  colors,
  screenHeight,
  screenWidth,
  monthsAbr: months,
  months: monthsFull,
} = constants;

const AddToCalendar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const manageCropContext = useContext(ManageCropContext);

  const {
    favoriteCrops,
    user,
    jobs: userJobs,
    loading,
    reminders,
    jobHistory,
    updatingReminder,
  } = useSelector((state) => ({
    favoriteCrops: state.crops.favoriteCrops,
    user: state.auth?.user,
    jobs: state.jobs?.usersJobs,
    reminders: state.jobs?.userReminders,
    jobHistory: state.jobs?.jobHistory,
    currentJob: state.jobs?.currentJob,
    loading: state.loading.loading,
    updatingReminder: state.jobs.updatingReminder,
  }));

  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [m, setM] = useState(currentMonthIndex);
  const [y, setY] = useState(currentYear);
  const scrollRef = useRef();
  const [userJobLength, setUserJobLength] = useState(0);

  const [jobs, setJobs] = useState(false);
  const [viewingMore, setViewingMore] = useState(false);
  const [viewingMore2, setViewingMore2] = useState(false);
  const [cropToolTipIdToShow, setCropToolTipIdToShow] = useState("");
  const [fetchingFavoriteCrops, setFetchingFavoriteCrops] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(false);

  const [showTipHarvest, setShowTipHarvest] = useState(false); // STATE FOR THE INPUT VALUE
  const timeoutRef = useRef(null);

  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobDay, setNewJobDay] = useState("");

  const getFavoriteCrops = async () => {
    setFetchingFavoriteCrops(true);
    await dispatch(getCropsFavoriteToGrow(months[m]));
    setFetchingFavoriteCrops(false);
  };

  const getJobs = async (userId, month, year) => {
    setLoadingJobs(true);
    await dispatch(getUserJobs(userId, month, year));
    await dispatch(getUserReminders());
    setLoadingJobs(false);
  };

  useEffect(() => {
    getFavoriteCrops();
      dispatch(getUserOldJobs());
    if (user?.id) {
      getJobs(user?.id, months[m], y);

    }
      console.log({
          xgracefull2: {
              jobHistory,
          },
      });

  }, [m, user?.id, JSON.stringify(userJobs), m]);

  useEffect(() => {
      dispatch(getUserOldJobs());
      console.log({
          xgracefull: {
              jobHistory,
          },
      });
  }, [user?.id]);

  let initialJobs = [];

  const myUserJobs = () => {
    userJobs?.jobs
      ?.filter((job) => {
        const date = new Date(job?.job_date);
        return y === date.getFullYear() && m === date.getMonth();
      })
      .slice(0, userJobs?.jobs.length)
      ?.map((job, index) => {
        return job?.job_type !== "HARVEST" && job?.status !== "DONE" && job?.job_type !== "KILLED"
          ? initialJobs.push(job.job_type)
          : null;
      });
    jobHistory?.data
      ?.filter((job) => {
        const date = new Date(job?.job_date);
        return y === date.getFullYear() && m === date.getMonth();
      })
      .slice(0, viewingMore ? jobHistory?.data.length : 0)
      ?.map((job, index) => {
        return job?.job_type !== "HARVEST" && job?.job_type !== "KILLED"
          ? initialJobs.push(job.job_type)
          : null;
      });
    reminders?.reminders
      ?.filter((reminder) => {
        const date = new Date(reminder?.reminder_date);

        return y == date.getFullYear() && m == date.getMonth();
      })
      ?.slice(0, viewingMore ? reminders?.reminders.length : 3)
      .map((reminder, index) => {
        initialJobs.push(reminder);
      });
  };

  useEffect(() => {
    myUserJobs();
    setUserJobLength(initialJobs.length);
    // console.log({ initialJobs });
  }, [m]);

  const nextItem = () => {
    if (m > months.length - 2) {
      setM(0);
      setY(y + 1);
      return;
    }
    setM(m + 1);
  };

  const prevYear = () => {
    if (m === 0) {
      setM(11);
      setY(y - 1);
      return;
    }
    setM(m - 1);
  };

  const setMonth = (index) => {
    setM(index);
  };
  useEffect(() => {
    if (timeoutRef.current !== null) {
      // IF THERE'S A RUNNING TIMEOUT
      clearTimeout(timeoutRef.current); // THEN, CANCEL IT
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setShowTipHarvest(false);
    }, 3000); // AFTER 500ms
  }, [showTipHarvest]);

  const onFabPress = () => {
    scrollRef.current.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const pickCurrentMonth = () => {
    const currentMonth = new Date().getMonth();
    setMonth(currentMonth);
    setY(currentYear);
  };
  const noHarvest = Object.keys(userJobs).map((jobs) => jobs.jobs);
  const isNumeric = (str) => {
    if (typeof str != "string") {
      return false;
    }
    return !isNaN(str) && !isNaN(parseFloat(str));
  };

  const daysInMonth = (m, y) => {
    // m is 0 indexed: 0-11
    switch (m) {
      case 1:
        return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
      case 8:
      case 3:
      case 5:
      case 10:
        return 30;
      default:
        return 31;
    }
  };

  const isValidMonthDay = (d, m, y) => {
    return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
  };

  return (
    <KeyboardAvoiding>
      <SafeArea>
        <View style={{ flex: 1 }}>
          <SafeAreaView style={[styles.parent]}>
            <ScrollView
              style={[styles.parentContiner]}
              nestedScrollEnabled
              contentContainerStyle={{
                flexGrow: 1,
              }}
              showsVerticalScrollIndicator={false}
              ref={scrollRef}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FlatList
                    data={months}
                    keyExtractor={(item, index) => item}
                    numColumns={6}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={{
                          height: 46,
                          width: 46,
                          borderRadius: 46 / 2,
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "center",
                          marginHorizontal: 0,
                          marginVertical: 10,
                          backgroundColor: `${
                            index === m ? colors.greenDeep2 : "white"
                          }`,
                        }}
                        onPress={() => setMonth(index)}
                      >
                        <Text
                          style={{
                            color: `${index === m ? "#fff" : "black"}`,
                              fontSize: `${index === m ? 16 : 14}`,
                            // fontWeight: `${index === m ? "bold" : "100"}`,
                          }}
                          fontType={index === m ? "" : "light"}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 15,
                    marginBottom: 10,
                  }}
                >
                  <TouchableOpacity onPress={prevYear}>
                    <MaterialIcons
                      name="arrow-back-ios"
                      size={24}
                      color={colors.greenDeep2}
                    />
                  </TouchableOpacity>
                  <View style={{}}>
                    <Text
                        fontType={'thin'}
                      style={{
                        color: colors.black,
                        fontSize: 40,
                      }}
                    >
                      {months[m]} {y}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={nextItem}>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={24}
                      color={colors.greenDeep2}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={pickCurrentMonth}>
                  <Text
                    style={{
                      marginBottom: 15,
                      textAlign: "center",
                        fontSize: 14,
                      color: colors.greenDeep2,
                    }}
                  >
                    Today
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <GradientButton
                  gradient={[colors.red, colors.redDeep]}
                  onPress={() => {
                    navigation.navigate("Crops");
                    manageCropContext?.actions?.setGrowInMonthIndex(m);
                  }}
                >
                  <View
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      width: "100%",
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text style={styles.btnText2}>Grow in {monthsFull[m]} </Text>
                    <AntDesign name="search1" size={25} color={colors.white} />
                  </View>
                </GradientButton>
                <GradientButton
                  gradient={[colors.green, colors.greenDeep2]}
                  onPress={() => setJobs(!jobs)}
                >
                  <View
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      width: "100%",
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text style={styles.btnText}>Jobs</Text>
                    <AntDesign name="plus" size={25} color={colors.white} />
                  </View>
                </GradientButton>

                {jobs && (
                  <View style={[styles.jobs]}>
                    <View style={[styles.jobsChild]}>
                      {/* <Image
                        source={require('../../assets/circle.png')}
                        height={20}
                        width={20}
                      /> */}
                      <View style={[styles.jobsText]}>
                        <TextInput
                          style={{
                            height: 20,
                            width: "100%",
                            color: colors.black,
                            fontSize: 18,
                            marginBottom: 5,
                          }}
                          value={newJobTitle}
                          onChangeText={(val) => setNewJobTitle(val)}
                          placeholder="Job Text"
                          placeholderTextColor={colors.black}
                        />
                        {/* <Text style={styles.boldText}>
                            {months[m]} {y}
                          </Text> */}
                        <TextInput
                          style={{
                            height: 20,
                            width: "100%",
                            color: colors.green,
                          }}
                          value={newJobDay}
                          onChangeText={(val) => setNewJobDay(val)}
                          placeholder="Enter day of the month"
                          placeholderTextColor={colors.green}
                          keyboardType="number-pad"
                          maxLength={2}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          const day = parseInt(newJobDay);

                          if (!newJobTitle || newJobTitle.length < 3) {
                            Alert.alert(
                              "",
                              "Please enter the correct Job text",
                              [{ text: "Dismiss" }]
                            );
                          }
                          if ((!isNumeric(day) && day < 1) || (!isNumeric(day) && day > 31)) {
                            Alert.alert(
                              "",
                              "Your date is invalid. It should be between 1 and 31",
                              [{ text: "Dismiss" }]
                            );
                          } //else if (isNumeric(day)) {
                          // Alert.alert('', 'Your date is invalid. It should be a number', [{ text: 'Dismiss' }])
                          //}
                          else {
                            // if (day && !isValidMonthDay(day, m, y)) {
                            //     Alert.alert('', `Your date is invalid. It should be between the number of days in the month of ${m}`, [{ text: 'Dismiss' }])
                            // }
                            const jobDate = new Date();
                            jobDate.setDate(day);
                            jobDate.setMonth(m);
                            jobDate.setFullYear(y);

                            dispatch(
                              addReminder({
                                reminder_date: jobDate,
                                title: newJobTitle,
                              })
                            );

                            setNewJobDay("");
                            setNewJobTitle("");
                            setJobs(false);
                          }
                        }}
                        style={{
                          borderRadius: 50,
                          height: 60,
                          width: 60,
                          backgroundColor: colors.green,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: "#fff", fontSize: 17 }}>Set</Text>
                        {/* <AntDesign
                          name='right'
                          size={24}
                          color={colors.green}
                        // onPress={addJob}
                        /> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                <View style={{ marginTop: 0 }}>
                  {loadingJobs || loading ? (
                    <ActivityIndicator />
                  ) : (
                    userJobs?.jobs
                      ?.filter((job) => {
                        const date = new Date(job?.job_date);

                        return (
                          y === date.getFullYear() && m === date.getMonth()
                        );
                      })
                      ?.slice(
                        0,
                        viewingMore
                          ? userJobs?.jobs.length
                          : userJobLength >= 2
                          ? 2
                          : 3
                      )
                      ?.map((job, index) => {
                        return job.job_type !== "HARVEST"
                        && job?.status !== "DONE"
                        &&  job.job_type !== "KILLED" ? (
                          <React.Fragment key={index}>
                            <JobItem job={job} />
                          </React.Fragment>
                        ) : null;
                      })
                  )}
                  <View
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    {reminders?.reminders
                      ?.filter((reminder) => {
                        const date = new Date(reminder?.reminder_date);

                        return y === date.getFullYear() && m === date.getMonth();
                      })?.reverse()
                        ?.slice(0, viewingMore ? userJobs?.jobs.length : (userJobLength >= 2 && reminders?.reminders.length >= 1 ? 1 : 3))
                      .map((reminder, index) => {
                        return reminder.status === "PENDING" && (
                          <TouchableOpacity
                            style={[styles.tasks]}
                            key={index}
                            onPress={() => {
                              if (!updatingReminder)
                                dispatch(
                                  updateReminder(
                                    reminder,
                                    reminder.status === "PENDING"
                                      ? "DONE"
                                      : "PENDING"
                                  )
                                );
                            }}
                          >
                            <View style={[styles.jobsChild]}>
                              <Image
                                source={require("../../assets/job-indicator-pink.png")}
                                style={{ height: 25, width: 25 }}
                              />
                              <View style={[styles.jobsText]}>
                                <Text
                                  style={{
                                    textTransform: "capitalize",
                                    color:
                                      reminder.status === "PENDING"
                                        ? colors.black
                                        : colors.pink,
                                  }}
                                >
                                  {reminder?.title}
                                </Text>
                                <Text
                                  style={{
                                    color:
                                      reminder.status === "PENDING"
                                        ? colors.black
                                        : colors.pink,
                                  }}
                                >
                                  {`${new Date(
                                    reminder?.reminder_date
                                  ).getDate()} ${
                                    monthsFull[
                                      new Date(
                                        reminder?.reminder_date
                                      ).getMonth()
                                    ]
                                  }`}
                                </Text>
                              </View>
                              {updatingReminder === reminder.id ? (
                                <ActivityIndicator
                                  color={colors.greyDark}
                                  size="small"
                                  animating
                                />
                              ) : (
                                <MaterialIcons
                                  size={24}
                                  color={
                                    reminder.status === "PENDING"
                                      ? colors.greyDark
                                      : colors.pink
                                  }
                                  name={
                                    reminder.status === "PENDING"
                                      ? "check-circle-outline"
                                      : "check-circle"
                                  }
                                />
                              )}
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                  </View>

                    <View
                        style={{
                        }}>

                        {loadingJobs || loading ? (
                            <ActivityIndicator />
                        ) : (
                            jobHistory?.data
                                ?.filter((job2) => {
                                    const date = new Date(job2?.job_date);
                                    return (
                                        y === date.getFullYear() && m === date.getMonth()
                                    );
                                })
                                ?.slice(0, viewingMore ? jobHistory?.data.length : (userJobLength >= 2 && jobHistory?.data.length >= 1 ? 0 : 1))
                                ?.map((job2, index2) => {
                                    console.log({dayodayo6: job2})
                                    return (job2?.job_type === "SOW" || job2?.job_type === "PLANT" ) &&  (
                                        <React.Fragment key={index2}>
                                            <JobItem2 job={job2}/>
                                        </React.Fragment>
                                    )

                                })
                        )}
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                        }}
                    >
                        {reminders?.reminders
                            ?.filter((reminder) => {
                                const date = new Date(reminder?.reminder_date);

                                return y === date.getFullYear() && m === date.getMonth();
                            })?.reverse()
                            ?.slice(0, viewingMore ? userJobs?.jobs.length : (userJobLength >= 2 && reminders?.reminders.length >= 1 ? 0 : 3))
                            .map((reminder, index) => {
                                return reminder.status !== "PENDING" && (
                                    <TouchableOpacity
                                        style={[styles.tasks]}
                                        key={index}
                                    >
                                        <View style={[styles.jobsChild]}>
                                            <Image
                                                source={require("../../assets/job-indicator-pink.png")}
                                                style={{ height: 25, width: 25 }}
                                            />
                                            <View style={[styles.jobsText]}>
                                                <Text
                                                    style={{
                                                        textTransform: "capitalize",
                                                        color:
                                                            reminder.status === "PENDING"
                                                                ? colors.black
                                                                : colors.pink,
                                                    }}
                                                >
                                                    {reminder?.title}
                                                </Text>
                                                <Text
                                                    style={{
                                                        color:
                                                            reminder.status === "PENDING"
                                                                ? colors.black
                                                                : colors.pink,
                                                    }}
                                                >
                                                    {`${new Date(
                                                        reminder?.reminder_date
                                                    ).getDate()} ${
                                                        monthsFull[
                                                            new Date(
                                                                reminder?.reminder_date
                                                            ).getMonth()
                                                            ]
                                                    }`}
                                                </Text>
                                            </View>
                                            {updatingReminder === reminder.id ? (
                                                <ActivityIndicator
                                                    color={colors.greyDark}
                                                    size="small"
                                                    animating
                                                />
                                            ) : (
                                                <MaterialIcons
                                                    size={24}
                                                    color={
                                                        reminder.status === "PENDING"
                                                            ? colors.greyDark
                                                            : colors.pink
                                                    }
                                                    name={
                                                        reminder.status === "PENDING"
                                                            ? "check-circle-outline"
                                                            : "check-circle"
                                                    }
                                                />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                    </View>
                  {userJobLength > 3 && (
                    <TouchableOpacity
                      onPress={() => setViewingMore(!viewingMore)}
                    >
                      {userJobLength + reminders?.reminders?.length > 3 && (
                        <Text style={styles.viewMore}>
                          {viewingMore ? "Hide jobs" : "View more"}
                        </Text>
                      )}
                    </TouchableOpacity>
                  )}
                </View>

                <GradientButton
                  gradient={[colors.blueLigth, colors.blue]}
                  onPress={() => {
                    setShowTipHarvest(!showTipHarvest);
                  }}
                >
                  <View
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      width: "100%",
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text style={styles.btnText}>What you’re harvesting</Text>
                    <AntDesign name="info" size={28} color={colors.white} />
                  </View>
                </GradientButton>
                <View>
                  {showTipHarvest && noHarvest.indexOf(undefined) !== -1 && (
                    <>
                      <View style={styles.triangle}></View>
                      <View style={styles.rectangle}>
                        <Text
                          style={{
                            textAlignVertical: "center",
                            textAlign: "center",
                            color: "#085BAC",
                            padding: 20,
                          }}
                        >
                          Predicted harvests and crops{`\n`}
                          that you have marked as {`\n`}
                          harvesting will appear here
                        </Text>
                      </View>
                    </>
                  )}
                </View>
                <View>
                  {loadingJobs || loading ? (
                    <ActivityIndicator />
                  ) : (
                    userJobs?.jobs
                      ?.filter((job) => {
                        const date = new Date(job?.job_date);

                        return (
                          y === date.getFullYear() && m === date.getMonth()
                        );
                      })
                      ?.slice(0, viewingMore ? userJobs?.jobs.length : 3)
                      .map((job, index) => {
                        return job?.job_type === "HARVEST" &&
                          job?.status === "STARTED" ? (
                          <React.Fragment key={index}>
                            <JobItem job={job} />
                          </React.Fragment>
                        ) : null;
                      })
                  )}
                </View>

                <View style={[styles.horizontalLine]}/>

                <View style={[styles.favoriteContainer]}>
                  <Text style={styles.favouriteText2}>
                    Some of our favourites to grow this month
                  </Text>
                </View>
                {fetchingFavoriteCrops ? (
                  <View>
                    <ActivityIndicator />
                  </View>
                ) : (
                  favoriteCrops?.crops?.map((crop, index) => (
                    <FavoriteCropItem
                      crop={crop}
                      key={index}
                      tipToShowId={cropToolTipIdToShow}
                      onSetTipToShow={setCropToolTipIdToShow}
                      onNavigate={() => {
                        navigation.navigate("Crops", {
                          screen: "Crop-selection",
                          params: {
                            cropName: crop?.name,
                            sowTip: crop?.suggestion,
                            growLevel: crop?.grow_level,
                            cropId: crop?.id,
                            variety: crop?.variety,
                            crop_variety: crop?.crop_variety,
                          },
                        });
                        //update state context???
                        manageCropContext?.actions?.updateCropToGrowDetails({
                          cropName: crop?.name,
                          month: months[m],
                          variety: crop?.variety,
                          monthIndex: m,
                          cropId: crop?.id,
                          action: "STARTED",
                          crop_variety: crop?.crop_variety,
                        });
                      }}
                    />
                  ))
                )}

                <View style={{ marginTop: 30, marginBottom: 50 }}>
                  <Text style={styles.explore}>Continue to explore</Text>
                  <GradientButton
                    gradient={[colors.red, colors.redDeep]}
                    onPress={() => {
                      navigation.navigate("Crops");
                      manageCropContext?.actions?.setGrowInMonthIndex(m);
                    }}
                  >
                    <View
                      style={{

                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        width: "100%",
                        paddingHorizontal: 20,
                      }}
                    >
                      <Text style={styles.btnText2}>
                        Grow in {monthsFull[m]}{" "}
                      </Text>
                      <AntDesign
                        name="search1"
                        size={25}
                        color={colors.white}
                      />
                    </View>
                  </GradientButton>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </SafeArea>
    </KeyboardAvoiding>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: "#fff",
  },
  parentContiner: {
    padding: 24,
  },
  dateText: {
    textAlign: "center",
    color: colors.green,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 5,
  },
  jobs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 50,
    // height: 78,
    backgroundColor: colors.white,
    // shadow iOS
    shadowColor: "grey",
    shadowOffset: {
      width: 0.5,
      height: 0.4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // shadow android
    elevation: 10,
  },
  tasks: {
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 50,
    // height: 78,
    backgroundColor: colors.white,
    // shadow iOS
    shadowColor: "grey",
    shadowOffset: {
      width: 0.5,
      height: 0.4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // shadow android
    elevation: 10,
  },
  jobsChild: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingLeft: screenWidth * 0.04,
  },
  jobsText: {
    paddingHorizontal: 15,
    flex: 1,
  },
  jobsImg: {
    width: 20,
    height: 20,
  },
  viewMore: {
    color: colors.greenDeep2,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    fontSize: 13,
  },
  quote: {
    textAlign: "center",
    marginVertical: 10,
  },
  calendarContainer: {
    marginTop: 60,
  },
  horizontalLine: {
    borderWidth: 1,
    borderColor: colors.greyLight,
    marginVertical: 35,
  },
  favoriteContainer: {
    justifyContent: "center",
    alignItems: "center",
      marginBottom: 20,
  },
  favouriteText: {
    textAlign: "center",
    color: colors.greenDeep2,
    maxWidth: 250,
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 5,
  },
  favouriteText2: {
    textAlign: "center",
    color: colors.greenDeep2,
    maxWidth: 250,
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 5,
  },
  btnText: {
    color: colors.white,
    fontWeight: "bold",
      fontSize: 18
  },
  btnText2: {
    color: colors.white,
    fontWeight: "bold",
      fontSize: 18
  },
  flowers: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    marginVertical: 5,
    backgroundColor: colors.white,
    shadowColor: "grey",
    shadowOffset: {
      width: 0.5,
      height: 0.4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // shadow android
    elevation: 10,
  },
  flowerImg: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  flowerText: {
    marginLeft: 20,
  },
  explore: {
    // fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    marginTop: 6,
      fontSize: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#E4EDF6",
    marginLeft: "auto",
    marginRight: "auto",
  },
  rectangle: {
    width: "100%",
    height: 100,
    backgroundColor: "#E4EDF6",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    color: "#085BAC",
  },
});

export default AddToCalendar;
