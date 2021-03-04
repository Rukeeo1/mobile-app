import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-web-swiper';
import { Button } from '../../components';
import constants from '../../constants';


const OnboardingLayout = ({navigation}) => {
  const { colors } = constants;
  return (
    <View style={styles.container}>
      <Swiper controlsEnabled={false}>
        <View style={[styles.slideContainer, styles.slide1]}>
          <LinearGradient
            colors={[colors.green, colors.greenDeep]}
            style={[styles.general]}
          >
            <Image
              source={require('../../assets/slideone.png')}
              style={[styles.imageContainer]}
            />
            <Text style={[styles.screenTitle]}>Grow Calendar</Text>
            <Text style={[styles.screenDescription]}>
              Plan and schedule your growing year with an intuitive calendar
              that grows with you!
            </Text>
          </LinearGradient>
        </View>
        <View style={[styles.slideContainer, styles.slide2]}>
          <LinearGradient
            colors={[colors.pink, colors.pinkDeep]}
            style={[styles.general]}
          >
            <Image
              source={require('../../assets/slide2.png')}
              style={[styles.imageContainer]}
            />
            <Text style={[styles.screenTitle]}>Manage Crops</Text>
            <Text style={[styles.screenDescription]}>
              See at a glance everything you are growing and where they are in
              the growing process
            </Text>
          </LinearGradient>
        </View>
        <View style={[styles.slideContainer, styles.slide3]}>
          <LinearGradient
            colors={[colors.purshBlue, colors.purshBlueDeep]}
            style={[styles.general]}
          >
            <Image
              source={require('../../assets/slide3.png')}
              style={[styles.imageContainer]}
            />
            <Text style={[styles.screenTitle]}>Explore</Text>
            <Text style={[styles.screenDescription]}>
              A community where you can share your successes and failures, get
              inspired, learn from others, and enjoy a new way to learn
            </Text>
          </LinearGradient>
        </View>
        <View style={[styles.slideContainer, styles.slide4]}>
          <LinearGradient
            colors={[colors.purshBlue, colors.purshBlueDeep]}
            style={[styles.general, styles.space]}
          >
            <Image
              source={require('../../assets/slide4.png')}
              style={[styles.imageContainer]}
            />
            <Text style={[styles.screenTitle]}>Guides</Text>
            <Text style={[styles.screenDescription]}>
              Never feel overwhelmed! We are here to prove that gardening truly
              is for everyone. We have beginner crops and guides to help you
              every step of the way.
            </Text>

            <Button
              gradient={[colors.green, colors.greenDeep]}
              coverStyle={{
                margin: 20,
              }}
              title={'Got It!'}
              onPress={() => navigation.navigate('Settings')}
            />
          </LinearGradient>
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide1: {
    backgroundColor: 'rgba(20,20,200,0.3)',
  },
  slide2: {
    backgroundColor: 'rgba(20,200,20,0.3)',
  },
  slide3: {
    backgroundColor: 'rgba(200,20,20,0.3)',
  },
  slide4: {
    backgroundColor: 'rgba(200,20,20,0.3)',
  },

  imageContainer: {
    width: 204,
    height: 204,
  },
  screenTitle: {
    textAlign: 'center',
    marginTop: 36,
    marginBottom: 28,
    fontSize: 42,
    color: '#FFFFFF',
  },
  screenDescription: {
    textAlign: 'center',
    paddingHorizontal: 20 ,
    color: '#FFFFFF',
  },

  general: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  space: {
    padding: 20,
  },
});

export default OnboardingLayout;
