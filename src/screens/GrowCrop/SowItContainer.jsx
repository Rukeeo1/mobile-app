import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { GradientButton as Button } from '../../components';

import { GrowCropCalender } from './GrowCropCalendar';

import constants from '../../constants';

const { colors } = constants;

export const SowItContainer = () => {
  const [showSowItButton, setShowSowItButton] = useState(true);
  const [showCalender, setShowCalender] = useState(false);
  const [showFullSelectedDate, setShowFullSelectedDate] = useState(false);

  const [selectedDate, setSelectedDate] = useState('18');
  const [selectedMonth, setSelectedMonth] = useState('February');
  const [selectedYear, setSelectedYear] = useState('2021');

  return (
    <View>
      {showSowItButton && (
        <Button
          title='Sow It!'
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
          <GrowCropCalender
            handleDate={setSelectedDate}
            handleMonth={setSelectedMonth}
            handleYear={setSelectedYear}
            setSelectedDateItems={() => {
              setShowCalender(false);
              setShowSowItButton(false);
              setShowFullSelectedDate(true);
            }}
          />
        </View>
      )}
      {showFullSelectedDate && (
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
              marginVertical: '5%',
              borderBottomRightRadius: 45,
              backgroundColor: 'white',
              width: '80%',
              height: 60,
              shadowColor: 'grey',
              shadowOffset: {
                width: 0.5,
                height: 0.4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 15,
              paddingVertical: '5%',
            }}
          >
            <Text>Reminder to sow</Text>
            <Text
              style={{ color: colors.pink, fontSize: 18, marginTop: '2%' }}
            >{`${selectedDate} ${selectedMonth} ${selectedYear}`}</Text>
          </View>
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
            }}
          >
            <Feather name='clock' size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SowItContainer;
