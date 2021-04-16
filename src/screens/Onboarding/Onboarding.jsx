import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-swiper'
import growthLogo from '../../assets/growth_logo.png'
import { Logo } from '../../components'
import constants from '../../constants'

const { colors } = constants
const OnboardingLayout = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>

          <View style={{ height: 335 }}>
            <Swiper controlsEnabled={false} loop={false} dotStyle={{backgroundColor:'rgba(225,225,225,.2)', marginLeft: 12, marginRight: 12, width: 14, height: 14, borderRadius: 14}} activeDotStyle={{backgroundColor: 'white', width: 14, height: 14, borderRadius: 14}}>
              <View style={[styles.slideContainer, styles.slide1]}>
                <LinearGradient
                  colors={[colors.green, colors.greenDeep]}
                  style={[styles.general]}
                >
                  <Text style={[styles.screenTitle]}>Grow Calendar</Text>
                  <Text style={[styles.screenDescription]}>
                    Plan and schedule your growing year with an intuitive
                    calendar that grows with you!
                  </Text>
                </LinearGradient>
              </View>
              <View style={[styles.slideContainer, styles.slide2]}>
                <LinearGradient
                  colors={[colors.purshBlue, colors.purshBlueDeep]}
                  style={[styles.general]}
                >
                  

                  <Text style={[styles.screenTitle]}>Explore</Text>
                  <Text style={[styles.screenDescription]}>
                    A community where you can share your successes and failures,
                    get inspired, learn from others, and enjoy a new way to
                    learn
                  </Text>
                </LinearGradient>
              </View>
              <View style={[styles.slideContainer, styles.slide3]}>
                <LinearGradient
                  colors={[colors.green, colors.greenDeep]}
                  style={[styles.general]}
                >
                 <Text style={[styles.screenTitle]}>Guided Growing</Text>
                  <Text style={[styles.screenDescription]}>
                    Never feel overwhelmed! We are here to prove that gardening
                    truly is for everyone. We have beginner crops and guides to
                    help you every step of the way.
                  </Text>

                </LinearGradient>
              </View>
              <View style={[styles.slideContainer, styles.slide4]}>
                <LinearGradient
                  colors={[colors.pink, colors.pinkDeep]}
                  style={[styles.general, styles.space]}
                >
                 
                  <Text style={[styles.screenTitle]}>Manage Crops</Text>
                  <Text style={[styles.screenDescription]}>
                    See at a glance everything you are growing and where they
                    are in the growing process
                  </Text>
                </LinearGradient>
              </View>
            </Swiper>
          </View>
          <View style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: '#ffffff'}}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Logo
                source={growthLogo}
                logoStyles={{
                  marginTop: 10,
                  marginBottom: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  width: '80%',
                  // height: 'auto'
                }}
              />
            </View>
            <Text style={{ textAlign: 'center', fontSize: 22, paddingTop: 15, paddingLeft: 30, paddingRight: 30, 
            marginLeft: 'auto', marginRight: 'auto', marginBottom: 10, fontFamily: 'Hero-New-Light', maxWidth: 350 }}>
              Choose your subscription plan below to start your{' '}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                color: colors.green,
                fontFamily: 'Hero-New-Medium',
                fontWeight: 'bold',
                paddingBottom: 50
              }}
            >
              30 day FREE trial
            </Text>

            <View style={[styles.TrialContainer]}>
              <TouchableOpacity activeOpacity={0.9} style={[styles.trial]} onPress={() =>navigation.navigate("Splash") }>
                <LinearGradient
                  colors={[colors.green, colors.greenDeep]}
                  style={[styles.general, styles.spaceReduced]}
                >
                  <Text style={{fontFamily: 'Hero-New-Medium', color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>
                  30 day free trial
                </Text>
                  <Text style={{fontFamily: 'Hero-New-Medium', color: '#ffffff', fontSize: 20,}}>
                    £2.99 per month
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} style={[styles.trial]} onPress={() =>navigation.navigate("Splash") }>
                <LinearGradient
                  colors={[colors.green, colors.greenDeep]}
                  style={[styles.general, styles.spaceReduced]}
                >
                <Text style={{fontFamily: 'Hero-New-Medium', color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>
                  30 day free trial
                </Text>
                  <Text style={{fontFamily: 'Hero-New-Medium', color: '#ffffff', fontSize: 20,}}>
                    £29.99 per year
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                textAlign: 'right',
                color: '#668D00',
                fontWeight: 'bold',
                paddingRight: 15,
                paddingTop: 10,
                fontFamily: 'Hero-New-Medium',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              Save £5.89 (17%)
            </Text>

            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                marginTop: 20,
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: 300,
                justifyContent: 'center',
                display: 'flex',
                fontFamily: 'Hero-New-Light',
              }}
            >
              Subscription automatically renews after the 30 day free trial. You
              can cancel at any time.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide1: {
    // backgroundColor: 'rgba(20,20,200,0.3)',
  },
  slide2: {
    // backgroundColor: 'rgba(20,200,20,0.3)',
  },
  slide3: {
    // backgroundColor: 'rgba(200,20,20,0.3)',
  },
  slide4: {
    // backgroundColor: 'rgba(200,20,20,0.3)',
  },

  imageContainer: {
    width: 204,
    height: 204,
  },
  screenTitle: {
    textAlign: 'center',
    fontSize: 42,
    fontWeight: '100',
    color: '#FFFFFF',
    marginTop: 50,
  },
  screenDescription: {
    textAlign: 'center',
    paddingHorizontal: 30,
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 20,
    fontFamily: 'Hero-New-Medium',
  },

  general: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  space: {
    padding: 20,
  },
  spaceReduced: {
    paddingTop: 10,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 10,
  },
  TrialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trial: {
    width: '48%',
    height: 75,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    overflow: 'hidden',
  },
  trialText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
})

export default OnboardingLayout
