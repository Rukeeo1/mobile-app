import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { GradientButton } from '../../components/Button'
import constants from '../../constants'

const { colors } = constants
const AddToCalendar = () => {
  const navigation = useNavigation()
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
  ]
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
  ]
  const currentMonthIndex = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const [m, setM] = useState(currentMonthIndex)
  const [y, setY] = useState(currentYear)

  const nextItem = () => {
    console.log('bext', m)
    setM(m)
    setY(y + 1)
  }

  const prevYear = () => {
    console.log('prev', m)
    setM(m)
    setY(y - 1)
  }

  const setMonth = (index) => {
    setM(index)
  }

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
                      backgroundColor: `${index === m ? colors.green : ''}`,
                      fontWeight: `${index === m ? 'bold' : ''}`,
                      color: `${index === m ? 'white' : 'black'}`,
                    }}
                    key={index}
                    onPress={() => setMonth(index)}
                  >
                    <Text style>{month}</Text>
                  </TouchableOpacity>
                )
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
                  name="arrow-back-ios"
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
                  name="arrow-forward-ios"
                  size={24}
                  color={colors.green}
                />
              </TouchableOpacity>
            </View>

            <Text style={{marginBottom: 30, textAlign: 'center', color: colors.green}}>Today</Text>
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
                <AntDesign name="search1" size={25} color={colors.white} />
              </View>
            </GradientButton>
            <GradientButton gradient={[colors.green, colors.greenDeep]}>
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
                <AntDesign name="plus" size={25} color={colors.white} />
              </View>
            </GradientButton>
            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.jobs]}
                onPress={() => navigation.navigate('Grow-Crop')}
              >
                <View style={[styles.jobsChild]}>
                  <Image source={require('../../assets/hang.png')} />
                  <View style={[styles.jobsText]}>
                    <Text>Sow Tomatoes</Text>
                    <Text style={[styles.boldText]}>20 February</Text>
                  </View>
                </View>

                <AntDesign name="right" size={24} color={colors.green} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.jobs]}
                onPress={() => navigation.navigate('Grow-Crop')}
              >
                <View style={[styles.jobsChild]}>
                  <Image source={require('../../assets/flower.png')} />
                  <View style={[styles.jobsText]}>
                    <Text>Sow Tomatoes</Text>
                    <Text style={[styles.boldText]}>20 February</Text>
                  </View>
                </View>
                <AntDesign name="right" size={24} color={colors.green} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} style={[styles.jobs]}>
                <View style={[styles.jobsChild]}>
                  <Image source={require('../../assets/circle.png')} />
                  <View style={[styles.jobsText]}>
                    <Text>Sow Tomatoes</Text>
                    <Text style={[styles.boldText]}>20 February</Text>
                  </View>
                </View>
                <AntDesign name="right" size={24} color={colors.green} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={[styles.viewMore]}>View more</Text>
            </View>

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
                <AntDesign name="info" size={28} color={colors.white} />
              </View>
            </GradientButton>

            <View style={[styles.horizontalLine]}></View>

            <View style={[styles.favoriteContainer]}>
              <Text style={[styles.favouriteText]}>
                Some of our favourites to grow this month
              </Text>
            </View>

            {/* <View>
            <Text>Tomato</Text>
            <Text>Beginner Crop</Text>
          </View> */}

            <View>
              <Text style={[styles.quote]}>
                You will be wishing for ripe tomatoes earlier than you think!
                Get sowing these summer gems as soon as you can… Thank us later!
              </Text>
              <GradientButton
                gradient={[colors.green, colors.greenDeep]}
                onPress={() => alert('hello worl')}
              >
                <Text style={[styles.btnText]}>Grow It</Text>
              </GradientButton>
            </View>

            <View style={[styles.flowers]}>
              <View>
                <Image
                  style={[styles.flowerImg]}
                  source={require('../../assets/avatarimg.png')}
                />
              </View>

              <View style={[styles.flowerText]}>
                <Text style={{ fontSize: 20 }}>Chillies</Text>
                <Text style={[styles.boldText]}>Intermediate</Text>
              </View>
            </View>
            <View style={[styles.flowers]}>
              <View>
                <Image
                  style={[styles.flowerImg]}
                  source={require('../../assets/avatarimg.png')}
                />
              </View>

              <View style={[styles.flowerText]}>
                <Text style={{ fontSize: 20 }}>Chillies</Text>
                <Text style={[styles.boldText]}>Intermediate</Text>
              </View>
            </View>
            <View style={[styles.flowers]}>
              <View>
                <Image
                  style={[styles.flowerImg]}
                  source={require('../../assets/avatarimg.png')}
                />
              </View>

              <View style={[styles.flowerText]}>
                <Text style={{ fontSize: 20 }}>Chillies</Text>
                <Text style={[styles.boldText]}>Intermediate</Text>
              </View>
            </View>
            <View style={[styles.flowers]}>
              <View>
                <Image
                  style={[styles.flowerImg]}
                  source={require('../../assets/avatarimg.png')}
                />
              </View>

              <View style={[styles.flowerText]}>
                <Text style={{ fontSize: 20 }}>Chillies</Text>
                <Text>Intermediate</Text>
              </View>
            </View>

            <View>
              <Text style={[styles.explore]}>Continue to explore</Text>
              <GradientButton gradient={[colors.red, colors.redDeep]}>
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
                  <AntDesign name="plus" size={25} color={colors.white} />
                </View>
              </GradientButton>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

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
  },
  jobsText: {
    marginLeft: 20,
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
    maxWidth: 222,
    fontSize: 20,
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
})

export default AddToCalendar
