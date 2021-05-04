import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Tooltip from 'react-native-walkthrough-tooltip';

import ActionSheet from './ActionSheet';
import SideMenuOverlay from './SideMenuOverlay';

import { SafeArea, GradientButton as Button, Text } from '../../components';

import { MyCarousel as Carousel } from './Carousel';
import { EditableTitle } from './Title';
import { SowItContainer } from './SowItContainer';

import home from '../../assets/home-icon.png';
import pencil from '../../assets/pencil_circle.png';

import plant from '../../assets/plant.png';
import growingSeed from '../../assets/growing-seed.png';
import harvestIcon from '../../assets/harvest-icon.png';
import jobPendingIcon from '../../assets/job-pending-grey.png';

import constants from '../../constants';

const { colors } = constants;

const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

const getMonthStripItemWidth = () => {
  const screenWidth = Dimensions.get('screen').width;
  const itemWidth = (screenWidth * 0.9) / 12;

  return itemWidth;
};

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const CropCard = ({ navigation }) => {
  const [activeScreen, setActiveScreen] = useState(0);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [toolTipIsVisible, setToolTipIsVisible] = useState(true);
  // please if you stumble accross this and this comment is still here, make sure you force me to refactor this code and break things into chunks...Rukee

  const video = React.useRef(null);

  const images = [growingSeed, plant, harvestIcon];

  const toggleBtmSheet = () => setShowBottomSheet((prevState) => !prevState);

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
            height: screenHeight * 0.165,

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
              height: screenWidth * 0.2,
              width: screenWidth * 0.2,
              borderRadius: (screenWidth * 0.2) / 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={images[index]}
              style={{
                height: screenHeight * 0.05,
                width: screenHeight * 0.05,
                resizeMode: 'contain',
              }}
            />
          </LinearGradient>
        </TouchableOpacity>
        <Text
          style={{
            color: activeScreen === index ? colors.black : colors.white,
            marginTop: '6%',
          }}
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
              height: 26,
              width: 15,
              position: 'absolute',
              bottom: -0.75,
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

  //small right pink arrow...
  const renderCalenderConfirmIcon = (setSelectedDateItems) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: '1',
          paddingHorizontal: '5%',
          marginRight: 20,
          marginTop: '2%',
        }}
      >
        <TouchableOpacity
          onPress={setSelectedDateItems}
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: colors.pink,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AntDesign name='right' size={29} color={colors.white} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeArea containerStyle={{ flex: 1 }}>
      {!showSideMenu && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            zIndex: 989889233,
            bottom: 100,
            right: 30,
          }}
          onPress={() => setShowSideMenu(true)}
        >
          <LinearGradient
            colors={[colors.greenDeep, colors.green]}
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={home} />
          </LinearGradient>
        </TouchableOpacity>
      )}
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
            <TouchableOpacity onPress={() => toggleBtmSheet()}>
              <Image source={pencil} style={{ height: 37, width: 37 }} />
            </TouchableOpacity>
          </View>
          <EditableTitle />

          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginTop: '4%',
            }}
          >
            {[1, 2, 3].map((item, index) => (
              <React.Fragment key={index}>{renderTab(index)}</React.Fragment>
            ))}
          </View>
        </LinearGradient>
        <View style={{ paddingHorizontal: '5%' }}>
          {activeScreen === 0 && (
            <SowItContainer
              buttonTitle='Sow It!'
              renderIcon={(itemToConfirm) =>
                renderCalenderConfirmIcon(itemToConfirm)
              }
              tip='Enter the date you plan to sow your seeds'
              reminderText='Sown'
            />
          )}
          {activeScreen === 1 && (
            <SowItContainer
              buttonTitle='Plant It!'
              tip='When do you want to plant?'
              renderIcon={(itemToConfirm) =>
                renderCalenderConfirmIcon(itemToConfirm)
              }
              reminderText='Reminder to plant'
            />
          )}
          {activeScreen === 2 && (
            <SowItContainer
              buttonTitle='Harvest it!'
              tip='Enter the date harvest started'
              renderIcon={(itemToConfirm) =>
                renderCalenderConfirmIcon(itemToConfirm)
              }
              reminderText='Harvest started'
              showHoriazontalButtonAfterDateIsSelected
              onPressOfHorizontalBtn={() => navigation.navigate('End-Harvest')}
            />
          )}
          <View style={styles.skipStep}>
            <Text>Not starting from seed?</Text>
            <TouchableOpacity>
              <Text style={styles.skipText}>Skip step ></Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 20,
              zIndex: 28983,
              backgroundColor: colors.white,
            }}
          >
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
                  <Text style={{ color: colors.white }}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: colors.blue,
                }}
              >
                Sow Under Cover
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: colors.blue100,
                }}
                style={{ marginLeft: 20 }}
              >
                Sow Direct Outside
              </Text>
            </View>
            <View>
              <Tooltip
                animated={true}
                isVisible={toolTipIsVisible}
                content={
                  <View>
                    <Text
                      style={{
                        color: colors.white,
                        flexWrap: 'wrap',
                      }}
                      fontType='light'
                    >
                      Your first step is complete! Add a journal entry to track
                      your
                    </Text>
                  </View>
                }
                contentStyle={{
                  backgroundColor: colors.blueLigth,
                  paddingHorizontal: '5%',
                  paddingVertical: '5%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  elevation: 0,
                  shadowOpacity: 0,
                }}
                childrenWrapperStyle={{ width: '80%' }}
                backgroundColor='transparent'
                placement='bottom'
                arrowSize={{
                  width: 24,
                  height: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClose={() => setToolTipIsVisible(false)}
              >
                <Button
                  gradient={[colors.purshBlue, colors.blue]}
                  title='Add to Journal'
                  onPress={() => navigation.navigate('Crop-Journal')}
                />
              </Tooltip>
            </View>
          </View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24,
                marginVertical: 10,
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
          <Carousel />
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
      <ActionSheet onClose={toggleBtmSheet} showBottomSheet={showBottomSheet} />
      {showSideMenu && (
        <SideMenuOverlay toggleSideMenu={() => setShowSideMenu(false)} />
      )}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: '10%',
    position: 'relative',
  },
  top: {
    backgroundColor: 'green',
    zIndex: 2323,
  },
  skipStep: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
    zIndex: 232,
    backgroundColor: colors.white,
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
    height: 'auto',
    justifyContent: 'center',
    marginTop: '5%',
    paddingHorizontal: '3%',
    paddingVertical: '5%',
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
