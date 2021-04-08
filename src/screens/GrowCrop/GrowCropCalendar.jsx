import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { GradientButton as Button, GrowCalendar } from '../../components';

import constants from '../../constants';

const { colors } = constants;

const start = 1900;

const monthsForCalender = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const years = new Array(new Date().getFullYear() - start + 1)
  .fill(0)
  .map((_, i) => {
    const value = start + i;
    return value;
  })
  .reverse();

const days = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
];


export const GrowCropCalender = () => {
  return (
    <View style={{ flexDirection: 'row', height: 300, alignItems: 'center' }}>
      <View
        style={{
          marginTop: 32,
          flexDirection: 'row',
          justifyContent: 'center',
          width: '85%',
        }}
      >
        <GrowCalendar
          type='days'
          data={days}
          activeItemContainerStyle={{
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
          }}
        />
        <GrowCalendar type='month' data={monthsForCalender} />
        <GrowCalendar
          type='years'
          data={years}
          activeItemContainerStyle={{
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
          }}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: '1',
          paddingHorizontal: '5%',
          marginRight: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => alert('hello')}
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
    </View>
  );
};

export default GrowCropCalender;
