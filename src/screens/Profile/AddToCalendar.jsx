import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { GradientButton } from '../../components/Button'
import constants from '../../constants'
import { useNavigation } from '@react-navigation/native';

const { colors } = constants
const AddToCalendar = () => {

  const navigation = useNavigation();
  const renderCalendar = () => {
    return (
      <>
        <Calendar
          showControls={true}
          titleFormat={'MMMM YYYY'}
          dayHeadings={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          monthNames={[
            'jan',
            'feb',
            'mar',
            'apr',
            'may',
            'jun',
            'jul',
            'aug',
            'sep',
            'oct',
            'nov',
            'dec',
          ]}
          prevButtonText={'Prev'}
          nextButtonText={'Next'}
          customStyle={{
            day: { fontSize: 15, textAlign: 'center', color: '#4c4b4b' },
          }}
          weekStart={1}
          theme={{
            selectedDayBackgroundColor: '#A6CB42',
            selectedDayTextColor: '#FFF',
          }}
        />
      </>
    )
  }
  
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
  // const currentMonthIndex = new Date().getMonth()
  // const currentYear = new Date().getFullYear()
  // const [m, setM] = useState(currentMonthIndex)
  // const [y, setY] = useState(currentYear)

  // const nextItem = () => {
  //   console.log('bext', m)
  //   if (m > 11) {
  //     setM(0)
  //     setY(y + 1)
  //   }

  //   setM(m + 1)
  // }

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
          <View style={[styles.calendarContainer]}>
            {renderCalendar()}
            <Text
              style={[styles.dateText]}
              
            >
              Today
            </Text>
          </View>

          {/* <View
            style={{
              width: 300,
              borderWidth: 2,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {months.map((month, index) => {
                return (
                  <View
                    style={{
                      height: 46,
                      width: 46,
                      borderRadius: 46 / 2,
                      textAlign: 'center',
                      // borderWidth: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 10,
                      marginVertical: 10,
                      backgroundColor: `${index === m ? 'dodgerblue' : ''}`,
                      color: `${index === m ? 'white' : 'black'}`,
                    }}
                    key={index}
                    onPress={() => alert('hello')}
                  >
                    <Text>{month}</Text>
                  </View>
                )
              })}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 30,
                marginBottom: 30,
              }}
            >
              <View>
              <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
              </View>
              <View style={{}}>
                <Text>{months[m]} {y}</Text>
              </View>
              <View onPress={() => alert('call me')}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </View>
            </View>
          </View> */}

          <View>
            <GradientButton gradient={[colors.red, colors.redDeep]} onPress={() => navigation.navigate("Crops")}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 20,
                }}
              >
                <Text style={[styles.btnText]}>Grow in February </Text>
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
              <View style={[styles.jobs]}>
                <View style={[styles.jobsChild]}>
                  <Image source={require('../../assets/hang.png')} />
                  <View style={[styles.jobsText]}>
                    <Text>Sow Tomatoes</Text>
                    <Text style={[styles.boldText]}>20 February</Text>
                  </View>
                </View>
                <Image
                  style={[styles.jobsImg]}
                  source={require('../../assets/right-arrow-green.png')}
                />
              </View>
              <View style={[styles.jobs]}>
                <View style={[styles.jobsChild]}>
                  <Image source={require('../../assets/flower.png')} />
                  <View style={[styles.jobsText]}>
                    <Text>Sow Tomatoes</Text>
                    <Text style={[styles.boldText]}>20 February</Text>
                  </View>
                </View>
                <Image
                  style={[styles.jobsImg]}
                  source={require('../../assets/right-arrow-green.png')}
                />
              </View>
              <View style={[styles.jobs]}>
                <View style={[styles.jobsChild]}>
                  <Image source={require('../../assets/circle.png')} />
                  <View style={[styles.jobsText]}>
                    <Text>Sow Tomatoes</Text>
                    <Text style={[styles.boldText]}>20 February</Text>
                  </View>
                </View>
                <Image
                  style={[styles.jobsImg]}
                  source={require('../../assets/right-arrow-green.png')}
                />
              </View>
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
