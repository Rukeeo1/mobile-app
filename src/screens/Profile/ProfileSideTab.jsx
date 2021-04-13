import React, { useEffect, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {
  Entypo,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';

import constants from '../../constants/index';
import notificationIcon from '../../assets/notification.png';
import notificationActive from '../../assets/notification-active.png';
import manageCropsInactive from '../../assets/managecropswhite.png';
import manageCrops from '../../assets/managecrops.png';
import exploreInactive from '../../assets/exploreinactive.png';
import exploreActive from '../../assets/exploreActive.png';

const { colors, screenHeight, screenWidth } = constants;

const ProfileSideTab = ({
  setActiveGradient,
  setCurrentIndex,
  indexOfItemToShow,
  handleNavigation,
  navigation,
  currentIndex,
  onClickEllipse,
}) => {
  const [coordinates, setCoordinates] = useState([]);
  const [roundBackgroundAnimation] = useState(
    new Animated.ValueXY({ x: -10, y: 84 })
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = React.useRef();

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const sideBarTabItems = [
    {
      name: 'notifications',
      // icon: (iconStyle) => <Feather name='bell' size={24} style={iconStyle} />,
      icon: (active) => (
        <Image
          source={active ? notificationActive : notificationIcon}
          style={{ opacity: active ? 1 : 0.5 }}
        />
      ),
      ref: React.createRef(),
      backgroundColor: [colors.green, colors.greenDeep],
      style: styles.iconsAboveWhiteLineTopSpacing,
    },
    {
      name: 'create-post',
      icon: (active) => (
        <Entypo
          name='plus'
          size={30}
          color={colors.white}
          style={{ opacity: active ? 1 : 0.5 }}
        />
      ),
      ref: React.createRef(),
      backgroundColor: [colors.purshBlueDeep, colors.blue],
      styles: { marginTop: 40 },
    },
    {
      name: 'profile',
      icon: (active) => (
        <Ionicons
          name='md-person-outline'
          size={24}
          style={{
            color: active ? colors.greenDeep : colors.white,
            opacity: active ? 1 : 0.5,
          }}
        />
      ),
      ref: React.createRef(),
      activeColor: colors.greenDeep,
      backgroundColor: [colors.greenDeep, colors.green],
      styles: { marginTop: 40 },
    },
    {
      name: 'explore',
      icon: (active) => (
        <Image source={active ? exploreActive : exploreInactive} />
      ),
      ref: React.createRef(),
      activeColor: '#AD0048',
      backgroundColor: [colors.blue, colors.purshBlueDeep],
      styles: { marginTop: 40 },
    },
    {
      name: 'manage-crops',
      icon: (active) => (
        <Image
          source={active ? manageCrops : manageCropsInactive}
          style={{ width: 32, height: 32, opacity: active ? 1 : 0.5,  }}
        />
      ),
      ref: React.createRef(),
      activeColor: colors.greenDeep,
      backgroundColor: ['#AD0048', '#E8357F'],
      styles: { marginTop: 100 },
    },
    {
      name: 'calendar',
      icon: (active) => (
        <Ionicons name='md-calendar-outline' size={24} color={colors.white} style={{color: active? colors.greenDeep : colors.white, opacity: active? 1 : 0.5}} />
      ),
      ref: React.createRef(),
      activeColor: colors.greenDeep,
      backgroundColor: [colors.greenDeep, colors.green],
      styles: { marginTop: 40 },
    },
  ];

  const moveBall = (itemPosition) => {
    const itemsCoordinates = coordinates[itemPosition];

    if (sideBarTabItems[itemPosition].name === 'create-post') {
      handleNavigation('Posts');
    }

    Animated.spring(roundBackgroundAnimation, {
      toValue: { x: -10, y: itemsCoordinates?.y },
      useNativeDriver: false,
    }).start();

    setCurrentIndex(itemPosition);
    setActiveIndex(itemPosition);
    setActiveGradient(sideBarTabItems[itemPosition]?.backgroundColor || []);
  };

  useEffect(() => {
    // get the positions of sidebar items/icons on the screen (basically their x and y coordinates)
    const intialCoordinatesDetails = [];
    sideBarTabItems.forEach((item) => {
      //for each item on the side bar loop through and get their position
      item.ref.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          intialCoordinatesDetails.push({
            x,
            y,
            width,
            height,
            item: item.name,
          });
          intialCoordinatesDetails.length === sideBarTabItems.length &&
            setCoordinates(intialCoordinatesDetails); // only setCoordinates state...if we've looped through all the items...remember at this point we are still in the loop
        }
      );
    });
  }, []);

  useEffect(() => {
    /**
     * @indexOfItemToShow: is used to set the active sidebar item, when comming from another screen. for example notification, being the firstItem has and index of 0. create post has and index of 1 etc.
     *
     * if i wanted Create post which is the plus icon to be active by default when comming from a different page, i pass in a indexOfItemToShow through navigation params...
     *
     * The codde below works as follows:
       
     (1) indexOfItemToShow checks if there's an item you want to make default and if the property is passed with the parent
     (2) coordinates.length === sideBarTabItems.length checks that the coordinate of all the sidebar icons have been measured and the coordinate state item updated
      
     */

    if (indexOfItemToShow && coordinates.length === sideBarTabItems.length) {
      //currentindex handles the Icon/Menu Item to display
      setCurrentIndex(indexOfItemToShow);

      //move the active circle to the activeItem
      moveBall(indexOfItemToShow);

      //clears the route params...so that indexOfItemToShow doesn't keep clashing with currentinde
      navigation.setParams({
        indexOfItemToShow: null,
      });
    }
  }, [coordinates.length, indexOfItemToShow, currentIndex]);

  return (
    <SafeAreaView style={styles.tab}>
      <TouchableOpacity style={styles.ellipse} onPress={onClickEllipse}>
        <FontAwesome5
          name='ellipsis-h'
          size={24}
          color={colors.white}
          style={{ opacity: 0.5 }}
        />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
        style={{ overflow: 'visible' }}
        ref={containerRef}
      >
        <Animated.View
          onPress
          style={[styles.tabIconActive, roundBackgroundAnimation.getLayout()]}
        />

        {sideBarTabItems.map((item, index) => (
          <AnimatedTouchable
            style={[
              styles.tabIconWrapper,
              item.styles,
              activeIndex === index && {
                left: -10,
              },
            ]}
            onPress={() => moveBall(index)}
            ref={item.ref}
            key={index}
          >
            {item.icon(
              activeIndex === index
              // ? { color: activeGradient[0] }
              // : { color: colors.white, opacity: 0.5 }
            )}
          </AnimatedTouchable>
        ))}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          height: 1,
          backgroundColor: colors.white,
          top: screenHeight * 0.58,
          width: 100,
          opacity: 0.5,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main: {
    backgroundColor: colors.white,
    width: '80%',
    paddingTop: '10%',
    flex: 1,
    borderTopRightRadius: 40,
  },
  tab: {
    // width: 65,
  },
  ellipse: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconWrapper: {
    marginTop: '35%',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 290323,
    elevation: 10,
  },
  tabIconActive: {
    top: 450,
    zIndex: -9,
    backgroundColor: colors.white,
    borderRadius: 30,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    height: 60,
    width: 60,
    position: 'absolute',
  },
  iconsAboveWhiteLineTopSpacing: {
    marginTop: screenHeight * 0.4,
  },
});

export default ProfileSideTab;
