import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { GrowCalendar } from '../../components'; //calendarScrollItem

import constants from '../../constants';

const { colors, months } = constants;

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

const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear];

  for (let i = 1; i < 20; i++) {
    years.push(currentYear + i);
  }
  return years;
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const GrowCropCalender = ({
  handleDate = () => {},
  handleMonth = () => {},
  handleYear = () => {},
  setSelectedDateItems,
  activeItemsContainerStyle = {},
  calenderWrapperStyle = {},
  textColor,
  renderIcon = () => {},
  defaultMonthIndex,
  selectedYear,
  selectedMonth,
}) => {
  const confirmCallback = () => {
    setSelectedDateItems?.();
  };

  const getDays = () => {
    const days = [];
    for (
      let i = 1;
      i <= getDaysInMonth(selectedYear, months.indexOf(selectedMonth) + 1);
      i++
    ) {
      days.push(i);
    }
    return days;
  };

  return (
    <View style={{ flexDirection: 'row', height: 200, alignItems: 'center' }}>
      <View style={[styles.calenderWrapper, calenderWrapperStyle]}>
        <View
          style={[styles.activeItemsIndicator, activeItemsContainerStyle]}
        />
        <GrowCalendar
          type='days'
          data={getDays()}
          onSelectItem={handleDate}
          textColor={textColor}
          defaultSelectedItem={defaultMonthIndex}
        />
        <GrowCalendar
          type='month'
          data={months}
          onSelectItem={handleMonth}
          textColor={textColor}
          defaultSelectedItem={defaultMonthIndex}
        />
        <GrowCalendar
          type='years'
          data={getYears()}
          onSelectItem={handleYear}
          textColor={textColor}
          defaultSelectedItem={1}
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
