import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

import { GradientButton as Button } from '../../components';
import { GrowCropCalender } from '../GrowCrop/GrowCropCalendar';

import { growCrop } from '../../redux/actions';

import constants from '../../constants';

const { colors, months, monthsAbr, defaultCalendarDay, defaultCalendarYear } =
  constants;

const EndHarvestSchedule = ({ navigation }) => {
  const dispatch = useDispatch();

  const { cropCycleDetails, user } = useSelector((state) => ({
    cropCycleDetails: state.crops.cropCycleDetails[0],
    user: state?.auth?.user,
  }));

  const sowMonth = cropCycleDetails?.sow_months.split(',')[0];

  const [selectedDay, setSelectedDay] = useState(defaultCalendarDay);
  const [selectedYear, setSelectedYear] = useState(defaultCalendarYear);
  const [selectedMonth, setSelectedMonth] = useState(
    months[monthsAbr.indexOf(sowMonth)]
  );
  const [submitting, setSubmitting] = useState(false);

  const monthIndex = monthsAbr.indexOf(sowMonth);

  const handleNavigation = (destination, params) => {
    navigation.navigate(destination, params);
  };

  const scheduleCrop = async () => {
    const growDate = selectedDay + ' ' + selectedMonth + ' ' + selectedYear;
    const cropInfo = {
      crop_id: cropCycleDetails?.cropId,
      user_id: user?.id,
      job_date: new Date(growDate),
    };
    setSubmitting(true);
    const error = await dispatch(growCrop(cropInfo, Toast));
    setSubmitting(false);
    if (!error) {
      handleNavigation('Settings', {
        screen: 'Main-Profile',
        params: {
          indexOfItemToShow: 5,
        },
      });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={styles.container}
        colors={[colors.green, colors.greenDeep]}
      >
        <Text style={styles.title}>End Harvest</Text>
        <Text style={styles.question}>
          Let’s get it scheduled in the grow calendar?
        </Text>
        <Text style={styles.suggest}>
          Suggested date is predicted from this harvest
        </Text>
        <GrowCropCalender
          activeItemsContainerStyle={{ top: '80%' }}
          calenderWrapperStyle={{ width: '95%' }}
          textColor={colors.white}
          handleDate={setSelectedDay}
          handleMonth={setSelectedMonth}
          handleYear={setSelectedYear}
          selectedDay={selectedDay}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          defaultMonthIndex={monthIndex}
        />

        <Button
          title='Schedule it'
          coverStyle={{ marginTop: '10%' }}
          gradient={[colors.pink, colors.pinkDeep]}
          onPress={scheduleCrop}
          loading={submitting}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Grow-Crop')}>
          <Text style={styles.optOut}>Later</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  title: {
    marginTop: '45%',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  question: {
    marginTop: '10%',
    color: colors.white,
    fontSize: 30,
    fontWeight: '100',
    textAlign: 'center',
  },
  suggest: {
    fontSize: 16,
    marginTop: '5%',
    color: colors.white,
  },
  warning: {
    marginTop: '5%',
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
  optOut: {
    color: colors.white,
    marginTop: '10%',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
export default EndHarvestSchedule;
