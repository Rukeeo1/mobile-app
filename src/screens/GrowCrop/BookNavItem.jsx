import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import houseIcon from '../../assets/house-fill.png';

import constants from '../../constants';



const { colors } = constants;

const BookNavItem = ({onPress}) => {
  return (
    <View
      style={{
        height: 100,
        width: 200,
        borderTopLeftRadius: 64,
        marginLeft: 23,
        borderBottomLeftRadius: 64,
        overflow: 'hidden',
        position: 'absolute',
        top: 650,
        zIndex: 2323,
        right: -100,
      }}
    >
      <LinearGradient
        style={{
          height: '100%',
          justifyContent: 'center',

          borderTopLeftRadius: 4,
        }}
        colors={[colors.purshBlue, colors.purshBlueDeep]}
      >
        <TouchableOpacity
          style={{
            height: 70,
            width: 70,
            borderRadius: 35,
            backgroundColor: colors.white,
            marginLeft: 13,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onPress}
        >
          <Image source={houseIcon} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default BookNavItem;
