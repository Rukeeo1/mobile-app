import React, { useState } from 'react';
import { View } from 'react-native';

import { GradientButton as Button, Text } from '../../components';

import { GrowCropCalender } from './GrowCropCalendar';

import constants from '../../constants';

const { colors, months, monthsAbr, defaultCalendarDay, defaultCalendarYear } =
  constants;

export const HarevestDatePicker = ({
  startButtonTitle,
  tip,
  renderIcon,
  reminderText,
  showHoriazontalButtonAfterDateIsSelected,
  onPressOfHorizontalBtn,
  startMonth,
  onSubmitSelected,
  submitting,
  dateStartedTitle
}) => {
  const [showStartButton, setShowStartButton] = useState(true);
  const [showCalender, setShowCalender] = useState(false);
  const [showFullSelectedDate, setShowFullSelectedDate] = useState(false);
  const [showEndHarvestButton, setShowEndHarvestButton] = useState(true);
  const [selectedDate, setSelectedDate] = useState(defaultCalendarDay);
  const [selectedMonth, setSelectedMonth] = useState(
    months[monthsAbr.indexOf(startMonth)]
  );
  const [selectedYear, setSelectedYear] = useState(defaultCalendarYear);

  const monthIndex = monthsAbr.indexOf(startMonth);
  console.log(selectedMonth, 'RO: selected month');

  return (
    <View>
      {showStartButton && (
        <Button
          title={startButtonTitle}
          gradient={[colors.pink, colors.pinkDeep]}
          onPress={() => {
            setShowCalender(true);
            setShowStartButton(false);
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
              setShowStartButton(false);
              setShowFullSelectedDate(true);
              onSubmitSelected(
                `${selectedYear} ${selectedMonth} ${selectedDate} `
              );
            }}
            renderIcon={renderIcon}
            defaultMonthIndex={monthIndex}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedDay={selectedDate}
          />
        </View>
      )}
      {showFullSelectedDate && (
        <>
          <SelectedDate
            selectedDate={selectedDate}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            title={reminderText} //set a condition if harvest ended
          />
          <View>
            {showEndHarvestButton ? (
              <Button
                title='End Harvest'
                gradient={[colors.pink, colors.pinkDeep]}
                onPress={() => {}}
              />
            ) : (
              <SelectedDate
                selectedDate={selectedDate} //endharvest date as today's date
                selectedMonth={selectedMonth} // end harvest month as current month
                selectedYear={selectedYear} // end harvest year as current year
                title={reminderText} //set a condition if harvest ended
              />
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default HarevestDatePicker;

const SelectedDate = ({ selectedDate, selectedMonth, selectedYear, title }) => {
  return (
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
        // marginRight: !showHoriazontalButtonAfterDateIsSelected ? 20 : 0,
      }}
    >
      <Text fontType='light'>{title}</Text>
      <Text
        style={{ color: colors.pink, fontSize: 18, marginTop: '2%' }}
        fontType='light'
      >{`${selectedDate} ${selectedMonth} ${selectedYear}`}</Text>
    </View>
  );
};
