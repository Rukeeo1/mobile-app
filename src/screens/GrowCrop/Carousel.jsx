import React from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';

import { GradientButton as Button, Text } from '../../components';

import constants from '../../constants';

const { colors, screenWidth, screenHeight } = constants;

export const MyCarousel = ({ steps }) => {
  return (
    <ScrollView
      horizontal={true}
      style={{ marginVertical: 30, paddingLeft: 10 }}
      showsHorizontalScrollIndicator={false}
    >
      {steps?.map((step, index) => (
              step?.content.toLowerCase() !== 'n/a' && (
              <View style={styles.carouselItem} key={index}>
              <View>
                  <Image
                      source={{
                          uri: 'https://images.pexels.com/photos/5760807/pexels-photo-5760807.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
                      }}
                      style={{
                          height: Dimensions.get('screen').height * 0.23,
                          width: '100%',
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                      }}
                      resizeMode='cover'
                  />
                  <View style={styles.carouselText} resizeMode="contain">
                      <Button
                          title={`Step ${index + 1}`}
                          gradient={[colors.pink, colors.pinkDeep]}
                      />
                      <Text fontType="light" style={{textAlign: 'center', fontSize: 16, marginTop: 10, flex: 1}}>
                          {step?.content}
                      </Text>
                  </View>
              </View>
          </View>)

      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    backgroundColor: colors.white,
    width: Dimensions.get('screen').width * 0.5,
    borderTopLeftRadius: 8,
    marginRight: screenWidth * 0.06,
  },
  carouselText: {
    width: '100%',
    paddingHorizontal: '6%',
    backgroundColor: colors.white,
    alignItems: 'center',
    height: screenHeight * 0.3,
    borderTopWidth: 0,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0.5,
      height: 0.4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // shadow android
    elevation: 15,
  },
});

export default MyCarousel;
