import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';

import {
  SafeArea,
  GradientButton as Button,
  GrowCalendar,
} from '../../components';
// import Carousel from './Carousel';

import home from '../../assets/home-icon.png';
import shovel from '../../assets/shovel.png';
import plant from '../../assets/plant.png';
import growingSeed from '../../assets/growing-seed.png';

import constants from '../../constants';
import { Platform } from 'react-native';

const { colors } = constants;

const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

const getMonthStripItemWidth = () => {
  const screenWidth = Dimensions.get('screen').width;
  const itemWidth = (screenWidth * 0.9) / 12;

  return itemWidth;
};

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const CropCard = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  // please if you stumble accross this and this comment is still here, make sure you force me to refactor this code and break things into chunks...Rukee

  const video = React.useRef(null);

  const images = [growingSeed, plant, shovel];

  const renderTab = (index) => (
    <>
      <View
        style={[
          {
            alignItems: 'center',
            width: screenWidth * 0.28,
            borderTopLeftRadius: screenWidth * 0.2,
            borderTopRightRadius: screenWidth * 0.2,
            justifyContent: 'center',
            height: screenHeight * 0.15,
            marginHorizontal: '6%',
          },
          activeScreen === index && { backgroundColor: colors.white },
        ]}
      >
        <TouchableOpacity onPress={() => setActiveScreen(index)}>
          <LinearGradient
            colors={
              activeScreen === index
                ? [colors.pink, colors.pinkDeep]
                : [colors.green, colors.greenDeep]
            }
            style={{
              // height: 80,
              // width: 80,
              height: screenWidth * 0.2,
              width: screenWidth * 0.2,
              // borderRadius: 40,
              borderRadius: (screenWidth * 0.2) / 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={images[index]}
              style={{ height: 37, width: 37, resizeMode: 'contain' }}
            />
          </LinearGradient>
        </TouchableOpacity>
        <Text
          style={[
            { color: colors.white, marginTop: '6%' },
            activeScreen === index && { color: colors.black },
          ]}
        >
          20 Feb
        </Text>

        <View
          style={[
            {
              height: 20,
              width: 15,
              position: 'absolute',
              bottom: 0,
              left: -15,
            },
            activeScreen === index && { backgroundColor: colors.white },
          ]}
        >
          <View
            style={{
              height: '100%',
              width: '100%',
              borderBottomRightRadius: 20,
              backgroundColor: colors.greenDeep,
            }}
          />
        </View>
        <View
          style={[
            {
              height: 25,
              width: 15,
              position: 'absolute',
              bottom: -0.7,
              right: -15,
            },
            activeScreen === index && { backgroundColor: colors.white },
          ]}
        >
          <View
            colors={[colors.greenDeep, colors.greenDeep]}
            style={{
              height: '100%',
              width: '100%',
              borderBottomLeftRadius: 23,
              backgroundColor: colors.greenDeep,
            }}
          />
        </View>
        <View />
      </View>
    </>
  );

  return (
    <SafeArea containerStyle={{ flex: 1 }}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          style={styles.top}
          colors={[colors.green, colors.greenDeep]}
        >
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '5%',
              marginTop: '10%',
            }}
          >
            <Image source={home} style={{ height: 37, width: 37 }} />
            <Entypo
              name='dots-three-horizontal'
              size={24}
              color={colors.white}
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: '5%' }}>
            <Text
              style={{ fontSize: 34, color: colors.white, fontWeight: '200' }}
            >
              Tomatoes
            </Text>
            <Text
              style={{ fontSize: 34, color: colors.white, fontWeight: '200' }}
            >
              {'<Var >'}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginTop: '4%',
            }}
          >
            {[1, 2, 3].map((item, index) => renderTab(index))}
          </View>
        </LinearGradient>
        {/* <View style={{ marginTop: 32 }}>
          <GrowCalendar />
        </View> */}
        <View style={{ paddingHorizontal: '5%' }}>
          <Button title='Sow It!' gradient={[colors.pink, colors.pinkDeep]} />
          <View style={styles.skipStep}>
            <Text>Not starting from seed?</Text>
            <TouchableOpacity>
              <Text style={styles.skipText}>Skip step ></Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text>When to sow guide</Text>
            <View style={styles.monthStrip}>
              {months.map((item, index) => (
                <View
                  style={[
                    styles.montStripItem,
                    true && { backgroundColor: colors.blue },
                    index === 0 && {
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    },
                    index === months.length - 1 && {
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                    },
                  ]}
                  key={index}
                >
                  <Text style={[{ color: colors.white }]}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: colors.blue,
                  }}
                >
                  Sow Under Cover
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 20 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: colors.blue100,
                  }}
                >
                  Sow Direct Outside
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: '7%' }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 32,
                fontWeight: '100',
              }}
            >
              How to Sow Seeds
            </Text>
            <Text style={{ textAlign: 'center' }}>
              Not all tomatoes will grow well outside with no protection, having
              said that there are varieties where you can so this is something
              to bear in mind when choosing seeds and thinking about where you
              will grow your tomatoes.
            </Text>
          </View>
          {/* <Carousel /> */}
          <View style={{ marginTop: '4%' }}>
            <Video
              ref={video}
              style={styles.video}
              source={{
                uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              }}
              useNativeControls
              resizeMode='contain'
              isLooping
              onPlaybackStatusUpdate={(status) => {}}
            />
          </View>
          <LinearGradient
            style={styles.toolTip}
            colors={[colors.green, colors.greenDeep]}
          >
            <Text style={styles.toolTipTitle}>Tool tip</Text>
            <Text style={styles.toolTipContent}>
              March is usually a great time to start sowing seeds. Starting
              earlier in the year can be difficult as you may end up with plants
              that are outgrowing their pots, that you can’t plant out because
              its too cold still! But who doesn’t love a challenge!{' '}
            </Text>
          </LinearGradient>
          <View style={styles.companionContainer}>
            <Image
              source={{
                uri:
                  'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
              }}
              style={styles.companionContainerImage}
            />
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.companionContainerTitle}>
                Companion Plant
              </Text>
              <Text style={styles.companionContainerText}>
                Basil is great with tomatoes not only for its culinary delights,
                but it can also help deter some garden pests such as whiteflies.
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Ready. Set. Grow!</Text>
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1, backgroundColor: colors.white, paddingBottom: '10%' },
  top: {
    backgroundColor: 'green',
    height:
      Platform.OS === 'ios'
        ? Dimensions.get('screen').height * 0.37
        : Dimensions.get('screen').height * 0.402,
  },
  skipStep: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
  },
  skipText: { color: colors.pink, fontSize: 15, fontWeight: 'bold' },
  monthStrip: {
    height: Dimensions.get('screen').height * 0.02,
    backgroundColor: 'red',
    borderRadius: 25,
    flexDirection: 'row',
    marginTop: 5,
  },
  montStripItem: {
    width: getMonthStripItemWidth(),
    alignItems: 'center',
    backgroundColor: colors.grey100,
    height: '100%',
  },
  video: {
    height: 200,
    width: '100%',
  },
  toolTip: {
    borderRadius: 8,
    height: Dimensions.get('screen').height * 0.19,
    justifyContent: 'center',
    marginTop: '5%',
    paddingHorizontal: '3%',
  },
  toolTipTitle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toolTipContent: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '300',
    marginTop: '4%',
    fontSize: 16,
  },
  companionContainer: {
    marginTop: '5%',
  },
  companionContainerImage: {
    height: Dimensions.get('screen').height * 0.2,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  companionContainerTitle: {
    color: colors.pink,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '4%',
  },
  companionContainerText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: '3%',
  },
  footer: {
    marginTop: '6%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 24,
    fontWeight: '200',
  },
});

export default CropCard;
