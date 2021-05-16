import React from 'react';
import { View, Text } from 'react-native';

import constants from '../../constants';

const { colors, screenHeight, screenWidth } = constants;

const TopTabs = ({ isActive }) => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export const TabItem = ({ isActive, onTabItemClick, imageSource }) => {
  return (
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
              source={imageSource}
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
};

export default TopTabs;
