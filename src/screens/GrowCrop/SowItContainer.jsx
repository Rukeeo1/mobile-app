import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

import { GradientButton as Button, Text } from '../../components';

import { GrowCropCalender } from './GrowCropCalendar';

import constants from '../../constants';

const { colors } = constants;

export const SowItContainer = ({
  buttonTitle,
  tip,
  renderIcon,
  reminderText,
  showHoriazontalButtonAfterDateIsSelected,
  onPressOfHorizontalBtn,
}) => {
  const [showSowItButton, setShowSowItButton] = useState(true);
  const [showCalender, setShowCalender] = useState(false);
  const [showFullSelectedDate, setShowFullSelectedDate] = useState(false);

  const [selectedDate, setSelectedDate] = useState('18');
  const [selectedMonth, setSelectedMonth] = useState('February');
  const [selectedYear, setSelectedYear] = useState('2021');

  // const renderConfirmIcon = (callBack) => {
  //   return (
  //     <View
  //       style={{
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         flex: '1',
  //         paddingHorizontal: '5%',
  //         marginRight: 20,
  //         marginTop: '2%',
  //       }}
  //     >
  //       <TouchableOpacity
  //         onPress={callBack}
  //         style={{
  //           height: 50,
  //           width: 50,
  //           borderRadius: 25,
  //           backgroundColor: colors.pink,
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <AntDesign name='right' size={29} color={colors.white} />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

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
              setShowCalender(false);
              setShowSowItButton(false);
              setShowFullSelectedDate(true);
            }}
            // renderIcon={renderConfirmIcon}
            renderIcon={renderIcon}
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
                <Feather name='clock' size={24} color={colors.white} />
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
