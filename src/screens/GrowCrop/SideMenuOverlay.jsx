import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';

import notificationIcon from '../../assets/notification.png';
import notificationActive from '../../assets/notification-active.png';
import manageCropsInactive from '../../assets/managecropswhite.png';
import manageCrops from '../../assets/managecrops.png';
import exploreInactive from '../../assets/exploreinactive.png';
import exploreActive from '../../assets/exploreActive.png';

import constants from '../../constants';

const { colors, screenHeight, screenWidth } = constants;

const SideMenuOverlay = ({ toggleSideMenu }) => {
  const [coordinates, setCoordinates] = useState([]);

  const navigation = useNavigation();

  const handleNavigation = (index) => {
    navigation.navigate('Settings', {
      screen: 'Main-Profile',
      params: {
        indexOfItemToShow: index,
      },
    });
    toggleSideMenu();
  };

  const sideBarTabItems = [
    {
      name: 'notifications',
      icon: (active) => (
        <Image
          source={active ? notificationActive : notificationIcon}
          style={{ opacity: active ? 1 : 0.5 }}
        />
      ),
      ref: React.createRef(),
      backgroundColor: [colors.green, colors.greenDeep],
      style: styles.iconsAboveWhiteLineTopSpacing,
      onclick: () => handleNavigation(0),
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
      onclick: () => handleNavigation(1),
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
      onclick: () => handleNavigation(2),
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
      onclick: () => handleNavigation(3),
    },
    {
      name: 'manage-crops',
      icon: (active) => (
        <Image
          source={active ? manageCrops : manageCropsInactive}
          style={{ width: 32, height: 32, opacity: active ? 1 : 0.5 }}
        />
      ),
      ref: React.createRef(),
      activeColor: colors.greenDeep,
      backgroundColor: ['#AD0048', '#E8357F'],
      styles: { marginTop: 100 },
      onclick: () => handleNavigation(4),
    },
    {
      name: 'calendar',
      icon: (active) => (
        <Ionicons
          name='md-calendar-outline'
          size={24}
          color={colors.white}
          style={{
            // color: active ? colors.greenDeep : colors.white,
            color: true ? colors.greenDeep : colors.white,
            opacity: true ? 1 : 0.5,
          }}
        />
      ),
      ref: React.createRef(),
      activeColor: colors.greenDeep,
      backgroundColor: [colors.greenDeep, colors.green],
      styles: { marginTop: 40, left: -12 },
      onclick: () => handleNavigation(5),
    },
  ];

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: colors.black,
          opacity: 0.5,
          width: '84%',
          height: '100%',
        }}
        onPress={toggleSideMenu}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          paddingTop: screenHeight * 0.049,
        }}
      >
        <LinearGradient
          colors={[colors.green, colors.greenDeep]}
          style={{
            height: screenHeight * 1,
            zIndex: 2323,
            opacity: 1,
            paddingTop: '15%',
            borderTopLeftRadius: 100,
            alignItems: 'center',
            overflow: 'visible',
          }}
        >
          <View style={{ alignItems: 'center', marginBottom: 45 }}>
            <TouchableOpacity style={styles.ellipse}>
              <FontAwesome5
                name='ellipsis-h'
                size={24}
                color={colors.white}
                style={{ opacity: 0.5 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.ball} />
          {sideBarTabItems.map((item, index) => (
            <TouchableOpacity
              style={[styles.tabIconWrapper, item.styles]}
              onPress={item?.onclick}
              key={index}
            >
              {item.icon()}
            </TouchableOpacity>
          ))}
          <View
            style={{
              position: 'absolute',
              height: 1,
              backgroundColor: colors.white,
              top: screenHeight * 0.58,
              width: '100%',
              opacity: 0.5,
            }}
          />
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: screenHeight,
    flexDirection: 'row',
  },
  tabIconWrapper: {
    marginTop: screenHeight * 0.03,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 290323,
    elevation: 10,
  },
  ball: {
    top: screenHeight * 0.740,
    zIndex: -10,
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
    left: -10,
  },
});

export default SideMenuOverlay;
