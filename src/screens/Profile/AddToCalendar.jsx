import React, { useState, useRef } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { JobItem } from './JobItem';

import { GradientButton } from '../../components/Button';

import constants from '../../constants';

const { colors, screenHeight, screenWidth } = constants;

const AddToCalendar = () => {
  const navigation = useNavigation();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthsFull = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dummyJobs = [
    {
      type: 'sow',
      title: 'Sow Tomatoes',
      status: 'about to start',
    },
    {
      type: 'plant',
      title: 'Plant Pepper',
      status: 'about to start',
    },
    {
      type: 'water',
      title: 'Water House Plants',
      status: 'in progress',
    },
    {
      type: 'harvest',
      title: 'Harvest Leeks',
      status: 'done',
    },
    {
      type: 'plant',
      title: 'Plant Pepper',
      status: 'about to start',
    },
    {
      type: 'water',
      title: 'Water House Plants',
      status: 'in progress',
    },
  ];
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [m, setM] = useState(currentMonthIndex);
  const [y, setY] = useState(currentYear);
  const scrollRef = useRef();

  const [jobs, setJobs] = useState(false);
  const [rest, setRest] = useState(false);
  const [viewingMore, setViewingMore] = useState(false);

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

  const onFabPress = () => {
    scrollRef.current.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
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
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {months.map((month, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                      height: 46,
                      width: 46,
                      borderRadius: 46 / 2,
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 10,
                      marginVertical: 10,
                      backgroundColor: `${
                        index === m ? colors.green : 'white'
                      }`,
                      fontWeight: `${index === m ? 'bold' : 'normal'}`,
                    }}
                    key={index}
                    onPress={() => setMonth(index)}
                  >
                    <Text
                      style={{
                        color: `${index === m ? '#fff' : 'black'}`,
                        fontWeight: `${index === m ? 'bold' : 'normal'}`,
                      }}
                    >
                      {month}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              <TouchableOpacity onPress={prevYear}>
                <MaterialIcons
                  name='arrow-back-ios'
                  size={24}
                  color={colors.green}
                />
              </TouchableOpacity>
              <View style={{}}>
                <Text
                  style={{
                    color: colors.green,
                    fontSize: 40,
                    fontWeight: '100',
                  }}
                >
                  {months[m]} {y}
                </Text>
              </View>
              <TouchableOpacity onPress={nextItem}>
                <MaterialIcons
                  name='arrow-forward-ios'
                  size={24}
                  color={colors.green}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                marginBottom: 30,
                textAlign: 'center',
                color: colors.green,
              }}
            >
              Today
            </Text>
          </View>

          <View>
            <GradientButton
              gradient={[colors.red, colors.redDeep]}
              onPress={() => navigation.navigate('Crops')}
            >
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 20,
                }}
              >
                <Text style={[styles.btnText]}>Grow in {monthsFull[m]} </Text>
                <AntDesign name='search1' size={25} color={colors.white} />
              </View>
            </GradientButton>
            <GradientButton
              gradient={[colors.green, colors.greenDeep]}
              onPress={() => setJobs(!jobs)}
            >
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 20,
                }}
              >
                <Text style={[styles.btnText]}>Jobs</Text>
                <AntDesign name='plus' size={25} color={colors.white} />
              </View>
            </GradientButton>

            {jobs && (
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.jobs]}
                onPress={() => {
                  setRest(true);
                  setJobs(false);
                }}
              >
                <View style={[styles.jobsChild]}>
                  <Image source={require('../../assets/circle.png')} />
                  <View style={[styles.jobsText]}>
                    <Text>|</Text>
                    <Text style={[styles.boldText]}>20 {months[m]}</Text>
                  </View>
                </View>
                <AntDesign name='right' size={24} color={colors.green} />
              </TouchableOpacity>
            )}

            {rest ? (
              <View style={{ marginTop: 30 }}>
                {dummyJobs
                  .slice(0, viewingMore ? dummyJobs.length : 3)
                  .map((job, index) => (
                    <React.Fragment key={index}>
                      <JobItem job={job} />
                    </React.Fragment>
                  ))}

                <TouchableOpacity onPress={() => setViewingMore(!viewingMore)}>
                  <Text style={[styles.viewMore]}>
                    {viewingMore ? 'Hide jobs' : 'View more'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View></View>
            )}

            <GradientButton gradient={[colors.blueLigth, colors.blue]}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 20,
                }}
              >
                <Text style={[styles.btnText]}>What you’re harvesting</Text>
                <AntDesign name='info' size={28} color={colors.white} />
              </View>
            </GradientButton>

            <View style={[styles.horizontalLine]}></View>

            <View style={[styles.favoriteContainer]}>
              <Text style={[styles.favouriteText]}>
                Some of our favourites to grow this month
              </Text>
            </View>

            <View style={[styles.flowers, { marginVertical: 15 }]}>
              <View>
                <Image
                  style={[styles.flowerImg]}
                  source={require('../../assets/tomatoe.png')}
                />
              </View>

              <View style={[styles.flowerText]}>
                <Text style={{ fontSize: 22, fontWeight: 'normal' }}>
                  Chillies
                </Text>
                <Text style={[styles.boldText]}>Intermediate</Text>
              </View>
            </View>

            <View style={{ marginBottom: 25 }}>
              <Text style={[styles.quote]}>
                You will be wishing for ripe tomatoes earlier than you think!
                Get sowing these summer gems as soon as you can… Thank us later!
              </Text>

              <GradientButton
                gradient={[colors.green, colors.greenDeep]}
                onPress={() => console.log('hello worl')}
              >
                <Text style={[styles.btnText]}>Grow It</Text>
              </GradientButton>
            </View>

            <View style={[styles.flowers]}>
              <View>
                <Image
                  style={[styles.flowerImg]}
                  source={require('../../assets/tomatoe1.png')}
                />
              </View>

              <View style={[styles.flowerText]}>
                <Text style={{ fontSize: 22 }}>Chillies</Text>
                <Text style={[styles.boldText]}>Intermediate</Text>
              </View>
            </View>
            <View style={[styles.flowers]}>
              <View>
                <Image
                  style={[styles.flowerImg]}
                  source={require('../../assets/tomatoe2.png')}
                />
              </View>

              <View style={[styles.flowerText]}>
                <Text style={{ fontSize: 22 }}>Chillies</Text>
                <Text style={[styles.boldText]}>Intermediate</Text>
              </View>
            </View>
            <View style={[styles.flowers]}>
              <View>
                <Image
                  style={[styles.flowerImg]}
                  source={require('../../assets/tomatoe3.png')}
                />
              </View>

              <View style={[styles.flowerText]}>
                <Text style={{ fontSize: 22 }}>Chillies</Text>
                <Text style={[styles.boldText]}>Intermediate</Text>
              </View>
            </View>
            <View style={[styles.flowers]}>
              <View>
                <Image
                  style={[styles.flowerImg]}
                  source={require('../../assets/tomatoe4.png')}
                />
              </View>

              <View style={[styles.flowerText]}>
                <Text style={{ fontSize: 22 }}>Chillies</Text>
                <Text>Intermediate</Text>
              </View>
            </View>

            <View style={{ marginBottom: 50 }}>
              <Text style={[styles.explore]}>Continue to explore</Text>
              <GradientButton
                gradient={[colors.red, colors.redDeep]}
                onPress={onFabPress}
              >
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    paddingHorizontal: 20,
                  }}
                >
                  <Text style={[styles.btnText]}>Grow in February</Text>
                  <AntDesign name='plus' size={25} color={colors.white} />
                </View>
              </GradientButton>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#fff',
  },
  parentContiner: {
    padding: 24,
  },
  dateText: {
    textAlign: 'center',
    color: colors.green,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 5,
  },
  jobs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 50,
    height: 78,
    backgroundColor: colors.white,
    // shadow iOS
    shadowColor: 'grey',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: screenWidth * 0.04,
  },
  jobsText: {
    marginLeft: 15,
  },
  jobsImg: {
    width: 20,
    height: 20,
  },
  viewMore: {
    color: colors.green,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
  },
  quote: {
    textAlign: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  favouriteText: {
    textAlign: 'center',
    color: colors.green,
    maxWidth: 250,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  btnText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  flowers: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 5,
    backgroundColor: colors.white,
    shadowColor: 'grey',
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 6,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default AddToCalendar;
