import React from 'react';
import { View, StyleSheet } from 'react-native';

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

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const getDays = (selectedYear, selectedMonth) => {
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

export const GrowCropCalender = ({
  handleDate = () => {},
  handleMonth = () => {},
  handleYear = () => {},
  setSelectedDateItems,
  activeItemsContainerStyle = {},
  calenderWrapperStyle = {},
  textColor,
  renderIcon = () => {},
  defaultMonthIndex = 0,
  selectedYear,
  selectedMonth,
  selectedDay,
}) => {
  const confirmCallback = () => {
    setSelectedDateItems?.();
  };

  const daysOfTheMonth = getDays(selectedYear, selectedMonth);

  return (
    <View style={{ flexDirection: 'row', height: 200, alignItems: 'center' }}>
      <View style={[styles.calenderWrapper, calenderWrapperStyle]}>
        <View
          style={[styles.activeItemsIndicator, activeItemsContainerStyle]}
        />
        <GrowCalendar
          type='days'
          data={daysOfTheMonth}
          onSelectItem={handleDate}
          textColor={textColor}
          defaultSelectedItem={daysOfTheMonth.indexOf(parseInt(selectedDay))}
        />
        <GrowCalendar
          type='month'
          data={months}
          onSelectItem={handleMonth}
          textColor={textColor}
          defaultSelectedItem={defaultMonthIndex || 0}
        />
        <GrowCalendar
          type='years'
          data={getYears()}
          onSelectItem={handleYear}
          textColor={textColor}
          defaultSelectedItem={0}
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
