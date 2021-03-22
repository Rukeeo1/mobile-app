import React from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';

import { GradientButton as Button } from '../../components';

import constants from '../../constants';

const { colors } = constants;

const Carousel = () => {
  const renderCard = () => (
    <View
      style={{
        backgroundColor: colors.white,
        width: Dimensions.get('screen').width * 0.6,
        borderTopLeftRadius: 8,
        marginHorizontal: '3%',
      }}
    >
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
      <View
        style={{
          width: '100%',
          paddingHorizontal: '6%',
          alignItems: 'center',
          marginTop: '3%',
        }}
      >
        <Button title='Sow It!' gradient={[colors.pink, colors.pinkDeep]} />
        <Text style={{ textAlign: 'center', fontSize: 16 }}>
          In a seed tray or individual pots add lightly damp compost{' '}
        </Text>
      </View>
    </View>
  );
  return (
    <ScrollView
      horizontal
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: 'red',
        marginVertical: '6%',
      }}

    >
      <Text>hello</Text>
      {/* {[1, 3, 4, 5, 2]?.map((item, index) => (
        <View
          style={{
            backgroundColor: colors.white,
            width: Dimensions.get('screen').width * 0.6,
            borderTopLeftRadius: 8,
            marginHorizontal: '3%',
          }}
          key={index}
        >
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
          <View
            style={{
              width: '100%',
              paddingHorizontal: '6%',
              alignItems: 'center',
              marginTop: '3%',
            }}
          >
            <Button title='Sow It!' gradient={[colors.pink, colors.pinkDeep]} />
            <Text style={{ textAlign: 'center', fontSize: 16 }}>
              In a seed tray or individual pots add lightly damp compost{' '}
            </Text>
          </View>
        </View>
      ))} */}
      
    </ScrollView>
  );
};

export default Carousel;
