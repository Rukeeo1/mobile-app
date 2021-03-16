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

const { colors } = constants
const AddToCalendar = () => {
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
  return (
    <SafeAreaView style={[styles.parent]}>
      <ScrollView
        style={[styles.parentContiner]}
        nestedScrollEnabled
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={[styles.calendarContainer]}>
          {renderCalendar()}
          <Text style={[styles.dateText]}>Today</Text>
        </View>

        <View>
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
              <Text style={[styles.btnText]}>Grow in February </Text>
              <Image
                style={{ width: 25, height: 25 }}
                source={require('../../assets/search.png')}
              />
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
              <Image
                style={{ width: 25, height: 25 }}
                source={require('../../assets/plus.png')}
              />
            </View>
          </GradientButton>

                <View style={[styles.jobs]}>
                  <View style={[styles.jobsChild]}>
                    <Image source={require('../../assets/hang.png')} />
                    <View style={[styles.jobsText]}>
                      <Text>Sow Tomatoes</Text>
                      <Text style={[styles.boldText]}>20 February</Text>
                    </View>
                  </View>
                    <Image style={[styles.jobsImg]} source={require('../../assets/right-arrow-green.png')}/>
                </View>
                <View style={[styles.jobs]}>
                  <View style={[styles.jobsChild]}>
                    <Image source={require('../../assets/flower.png')} />
                    <View style={[styles.jobsText]}>
                      <Text>Sow Tomatoes</Text>
                      <Text style={[styles.boldText]}>20 February</Text>
                    </View>
                  </View>
                    <Image style={[styles.jobsImg]} source={require('../../assets/right-arrow-green.png')}/>
                </View>
                <View style={[styles.jobs]}>
                  <View style={[styles.jobsChild]}>
                    <Image source={require('../../assets/circle.png')} />
                    <View style={[styles.jobsText]}>
                      <Text>Sow Tomatoes</Text>
                      <Text style={[styles.boldText]}>20 February</Text>
                    </View>
                  </View>
                    <Image style={[styles.jobsImg]} source={require('../../assets/right-arrow-green.png')}/>
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
              <Image
                style={{ width: 25, height: 25 }}
                source={require('../../assets/information.png')}
              />
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
              You will be wishing for ripe tomatoes earlier than you think! Get
              sowing these summer gems as soon as you can… Thank us later!
            </Text>
            <GradientButton gradient={[colors.green, colors.greenDeep]}>
              <Text style={[styles.btnText]}>Grow It</Text>
            </GradientButton>
          </View>

          <View style={[styles.flowers]}>
            <View>
            <Image style={[styles.flowerImg]} source={require('../../assets/avatarimg.png')}/>
            </View>

            <View style={[styles.flowerText]}>
              <Text>Chillies</Text>
              <Text style={[styles.boldText]}>Intermediate</Text>
            </View>
          </View>
          <View style={[styles.flowers]}>
            <View>
            <Image style={[styles.flowerImg]} source={require('../../assets/avatarimg.png')}/>
            </View>

            <View style={[styles.flowerText]}>
              <Text>Chillies</Text>
              <Text style={[styles.boldText]}>Intermediate</Text>
            </View>
          </View>
          <View style={[styles.flowers]}>
            <View>
            <Image style={[styles.flowerImg]} source={require('../../assets/avatarimg.png')}/>
            </View>

            <View style={[styles.flowerText]}>
              <Text>Chillies</Text>
              <Text style={[styles.boldText]}>Intermediate</Text>
            </View>
          </View>
          <View style={[styles.flowers]}>
            <View>
            <Image style={[styles.flowerImg]} source={require('../../assets/avatarimg.png')}/>
            </View>

            <View style={[styles.flowerText]}>
              <Text>Chillies</Text>
              <Text style={[styles.boldText]}>Intermediate</Text>
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
              <Image
                style={{ width: 25, height: 25 }}
                source={require('../../assets/search.png')}
              />
            </View>
          </GradientButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    marginTop: 5
  },
  jobs: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   paddingVertical: 10,
   paddingHorizontal: 20,
   borderRadius: 50,
   borderWidth: 2,
   borderColor: colors.greyLight,
   height: 78
  },
  jobsChild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  jobsText: {
    marginLeft: 20
  },
  jobsImg: {
    width: 20,
    height: 20
  },
  viewMore: {
    color: colors.green,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18
  },
  quote: {
    textAlign: 'center',
    marginVertical: 10
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
    fontWeight: 'bold',
    maxWidth: 222,
  },
  btnText: {
    color: colors.white,
    fontWeight: 'bold'
  },
  flowers: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.greyLight,
    marginVertical: 5
  },
  flowerImg: {
    width: 70,
    height: 70,
    borderRadius: 70/2
  },
  flowerText: {
    marginLeft: 20
  },
  explore: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 6
  },
  boldText: {
    fontWeight: 'bold'
  }
})

export default AddToCalendar
