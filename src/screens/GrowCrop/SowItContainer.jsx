import React, { useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { GradientButton as Button, Text } from '../../components';

import { GrowCropCalender } from './GrowCropCalendar';

import constants from '../../constants';

const { colors, months, monthsAbr } = constants;

export const SowItContainer = ({
  buttonTitle,
  tip,
  renderIcon,
  reminderText,
  showHoriazontalButtonAfterDateIsSelected,
  onPressOfHorizontalBtn,
  startMonth,
  onSubmitSelected,
  submitting,
}) => {
  const [showSowItButton, setShowSowItButton] = useState(true);
  const [showCalender, setShowCalender] = useState(false);
  const [showFullSelectedDate, setShowFullSelectedDate] = useState(false);

  const [selectedDate, setSelectedDate] = useState('18');
  const [selectedMonth, setSelectedMonth] = useState(
    months[monthsAbr.indexOf(startMonth)]
  );
  const [selectedYear, setSelectedYear] = useState('2021');

  const monthIndex = monthsAbr.indexOf(startMonth);

  return (
    <View>
      {showSowItButton && (
        <Button
          title={buttonTitle}
          gradient={[colors.pink, colors.pinkDeep]}
          coverStyle={{ zIndex: 42 }}
          onPress={() => {
            setShowCalender(true);
            setShowSowItButton(false);
          }}
        />
      )}
      {showCalender && (
        <View style={{ marginVertical: 10 }}>
          <Text
            fontType='bold'
            style={{ backgroundColor: colors.white, marginTop: 5 }}
          >
            {tip}
          </Text>
          <GrowCropCalender
            handleDate={setSelectedDate}
            handleMonth={setSelectedMonth}
            handleYear={setSelectedYear}
            setSelectedDateItems={() => {
              // maybe this prop should be named toggle
              setShowCalender(false);
              setShowSowItButton(false);
              setShowFullSelectedDate(true);
              onSubmitSelected(
                `${selectedYear} ${selectedMonth} ${selectedDate} `
              );
            }}
            renderIcon={renderIcon}
            defaultMonthIndex={monthIndex}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
        </View>
      )}
      {showFullSelectedDate && (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                paddingHorizontal: '6%',
                borderTopLeftRadius: 45,
                borderBottomLeftRadius: 45,
                borderTopRightRadius: 45,
                marginTop: '5%',
                borderBottomRightRadius: 45,
                backgroundColor: 'white',
                flex: 1,
                shadowColor: 'grey',
                shadowOffset: {
                  width: 0.5,
                  height: 0.4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 15,
                paddingVertical: '3%',
                marginRight: !showHoriazontalButtonAfterDateIsSelected ? 20 : 0,
              }}
            >
              <Text fontType='light'>{reminderText}</Text>
              <Text
                style={{ color: colors.pink, fontSize: 18, marginTop: '2%' }}
                fontType='light'
              >{`${selectedDate} ${selectedMonth} ${selectedYear}`}</Text>
            </View>
            {!showHoriazontalButtonAfterDateIsSelected && (
              <TouchableOpacity
                onPress={() => {
                  setShowCalender(true);
                  setShowSowItButton(false);
                  setShowFullSelectedDate(false);
                }}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  backgroundColor: colors.pink,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 15,
                }}
              >
                {submitting ? (
                  <ActivityIndicator />
                ) : (
                  <Feather name='clock' size={24} color={colors.white} />
                )}
              </TouchableOpacity>
            )}
          </View>
          {showHoriazontalButtonAfterDateIsSelected && (
            <Button
              title='End Harvest'
              gradient={[colors.pink, colors.pinkDeep]}
              onPress={onPressOfHorizontalBtn ? onPressOfHorizontalBtn : null}
            />
          )}
        </>
      )}
    </View>
  );
};

export default SowItContainer;
