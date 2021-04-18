import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { GrowCalendar } from '../../components';

import constants from '../../constants';

const { colors } = constants;

const start = 2000;

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

export const GrowCropCalender = ({
  handleDate = () => {},
  handleMonth = () => {},
  handleYear = () => {},
  setSelectedDateItems,
  activeItemsContainerStyle = {},
  calenderWrapperStyle = {},
  textColor,
  renderIcon = () => {},
}) => {
  const confirmCallback = () => {
    setSelectedDateItems?.();
  };

  return (
    <View style={{ flexDirection: 'row', height: 200, alignItems: 'center' }}>
      <View style={[styles.calenderWrapper, calenderWrapperStyle]}>
        <View
          style={[styles.activeItemsIndicator, activeItemsContainerStyle]}
        />
        <GrowCalendar
          type='days'
          data={days}
          onSelectItem={handleDate}
          textColor={textColor}
        />
        <GrowCalendar
          type='month'
          data={monthsForCalender}
          onSelectItem={handleMonth}
          textColor={textColor}
        />
        <GrowCalendar
          type='years'
          data={years}
          onSelectItem={handleYear}
          textColor={textColor}
        />
      </View>
      {renderIcon(confirmCallback)}
    </View>
  );
};

const styles = StyleSheet.create({
  calenderWrapper: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '85%',
  },
  activeItemsIndicator: {
    height: 50,
    position: 'absolute',
    backgroundColor: colors.white,
    width: '90%',
    top: '83.5%',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0.5,
      height: 0.4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 15,
  },
});

export default GrowCropCalender;
