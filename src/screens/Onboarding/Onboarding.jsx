import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-web-swiper';
import images from '../../assets';
import { Button } from "../../components/Button";

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
     height: 204
  },
  screenTitle: {
      textAlign: 'center',
      marginTop: 36,
      marginBottom: 28,
      fontSize: 52
  },
  screenDescription: {
    textAlign: 'center',
    paddingHorizontal: 20
  }
})

export const OnboardingLayout = () => {
  console.log(images)
  return (
    <View style={styles.container}>
      <Swiper>
        <View style={[styles.slideContainer, styles.slide1]}>
     
          <Image source={require('../../assets/slideone.png')} style={[styles.imageContainer]}/>
          <Text style={[styles.screenTitle]}>Grow Calendar</Text>
          <Text style={[styles.screenDescription]}>
            Plan and schedule your growing year with an intuitive calendar that
            grows with you!
          </Text>
        </View>
        <View style={[styles.slideContainer, styles.slide2]}>
        <Image source={require('../../assets/slide2.png')} style={[styles.imageContainer]}/>
          <Text style={[styles.screenTitle]}>Manage Crops</Text>
          <Text style={[styles.screenDescription]}>See at a glance everything you are growing and where they are in the growing process</Text>
        </View>
        <View style={[styles.slideContainer, styles.slide3]}>
        <Image source={require('../../assets/slide3.png')} style={[styles.imageContainer]}/>
          <Text style={[styles.screenTitle]}>Explore</Text>
          <Text style={[styles.screenDescription]}>A community where you can share your successes and failures, get inspired, learn from others, and enjoy a new way to learn</Text>
        </View>
        <View style={[styles.slideContainer, styles.slide3]}>
        <Image source={require('../../assets/slide4.png')} style={[styles.imageContainer]}/>
          <Text style={[styles.screenTitle]}>Guides</Text>
          <Text style={[styles.screenDescription]}>Never feel overwhelmed! We are here to prove that gardening truly is for everyone. We have beginner crops and guides to help you every step of the way.</Text>
          
          
            <Button 
              title={"Got it!"}
              // coverStyle={{...style.genericBtnStyles}}
              onPress={() =>alert("Hey I got calledd!")}
              color={"white"}
            />
        </View>
      </Swiper>
    </View>
  )
}


const style = StyleSheet.create({
  genericBtnStyles: {
    height: 40,
    borderRadius: 20,
    color: "white"
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default OnboardingLayout
