import React from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';

import { GradientButton as Button, Text } from '../../components';

import constants from '../../constants';

const { colors } = constants;

export const MyCarousel = () => {
  return (
    <ScrollView
      horizontal={true}
      style={{ marginVertical: 30, paddingLeft:10 }}
      showsHorizontalScrollIndicator={false}
    >
      {[1, 3, 4, 5].map((_, index) => (
        <View style={styles.carouselItem} key={index}>
          <Image
            source={{
              uri:
                'https://images.pexels.com/photos/5760807/pexels-photo-5760807.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            }}
            style={{
              height: Dimensions.get('screen').height * 0.23,
              width: '100%',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            resizeMode='cover'
          />
          <View style={styles.carouselText}>
            <Button title='Sow It!' gradient={[colors.pink, colors.pinkDeep]} />
            <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 3 }}>
              In a seed tray or individual pots add lightly damp compost{' '}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    backgroundColor: colors.white,
    width: Dimensions.get('screen').width * 0.6,
    borderTopLeftRadius: 8,
    paddingRight: '3%',
  },
  carouselText: {
    width: '100%',
    paddingHorizontal: '6%',
    backgroundColor: colors.white,
    alignItems: 'center',
    height: 200,
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
