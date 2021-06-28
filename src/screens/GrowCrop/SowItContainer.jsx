import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather, AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import ManageCropContext from '../../context/ManageCropsContext';

import { GradientButton as Button, Text } from '../../components';

import { GrowCropCalender } from './GrowCropCalendar';

import { updateJob } from '../../redux/actions';

import constants from '../../constants';
// import moment from "moment";

const { colors, months, monthsAbr, defaultCalendarDay, defaultCalendarYear } =
  constants;

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
  //refactor: note change selectedDate to selectedDay to avoid confusion
  const [selectedDate, setSelectedDate] = useState(defaultCalendarDay);
  const [selectedMonth, setSelectedMonth] = useState(
    months[monthsAbr.indexOf(startMonth)]
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const monthIndex = monthsAbr.indexOf(startMonth);

    const ourMonths = [
        'dummyMonth',
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
        'December'
    ]
    const ourMonthIndex = (correctMonth) => ourMonths.indexOf(correctMonth) < 10 ? '0' + ourMonths.indexOf(correctMonth) : ourMonths.indexOf(correctMonth);

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
                `${selectedYear}-${ourMonthIndex(selectedMonth)}-${selectedDate}`
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

export const CropDatePickerContainer = ({
  buttonTitle,
  tip,
  renderIcon,
  reminderText,
  showHoriazontalButtonAfterDateIsSelected,
  onPressOfHorizontalBtn,
  startMonth,
  onSubmitSelected,
  submitting,
  exisitngJobConfirmQuestion,
  fromJobs,
  confirmedJobText,
}) => {

  const [showSowItButton, setShowSowItButton] = useState(true);
  const [showCalender, setShowCalender] = useState(false);
  const [showFullSelectedDate, setShowFullSelectedDate] = useState(false);
  const [showConfirmExisingJob, setShowConfirmExistingBox] = useState(false);
  //refactor: note change selectedDate to selectedDay to avoid confusion
  const [selectedDate, setSelectedDate] = useState(defaultCalendarDay);
  const [selectedMonth, setSelectedMonth] = useState(
    months[monthsAbr.indexOf(startMonth)]
  );
  const [selectedYear, setSelectedYear] = useState(defaultCalendarYear);

  const monthIndex = monthsAbr.indexOf(startMonth);

    const ourMonths = [
        'dummyMonth',
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
        'December'
    ]
    const ourMonthIndex = (correctMonth) => ourMonths.indexOf(correctMonth) < 10 ? '0' + ourMonths.indexOf(correctMonth) : ourMonths.indexOf(correctMonth);

  useEffect(() => {
    if (fromJobs) {
      setShowSowItButton(false);
      setShowConfirmExistingBox(true);
    }
  }, []);

  const onCancel = () => {
    setShowConfirmExistingBox(false);
    setShowCalender(true);
  };

    // console.log({onSubmitSelected});
    const justMonth = ourMonthIndex(selectedMonth);

    // console.log(moment.utc(`${selectedYear} ${selectedMonth} ${selectedDate}`));
    // console.log('moment test', moment(`${selectedYear} ${selectedMonth} ${selectedDate}`,'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss'))
  return (
    <View>
      <View>
        {showConfirmExisingJob && (
          <ConfirmExistingJob
            exisitngJobConfirmQuestion={exisitngJobConfirmQuestion}
            confirmedJobText={confirmedJobText}
            onCancel={onCancel}
            // onConfirm={}
          />
        )}
      </View>
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
                `${selectedYear}-${ourMonthIndex(selectedMonth)}-${selectedDate}`
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

const ConfirmExistingJob = ({
  reminderText = '',
  exisitngJobConfirmQuestion,
  onCancel = () => {},
  confirmedJobText,
}) => {
  const [showQuestion, setShowQuestion] = useState(true);
  const [showConfirmed, setShowConfirmed] = useState(false);

  const { userId } = useSelector((state) => ({
    userId: state.auth?.user.id,
  }));
  const manageCropContext = useContext(ManageCropContext);
  const { data } = manageCropContext;
  const { jobId, cropId, jobDate } = data.cropToGrowDetails;

  const dispatch = useDispatch();

  const onConfirm = () => {
    setShowConfirmed(true);
    setShowQuestion(false);
    if (jobId) {
      dispatch(
        updateJob(
          jobId,
          {
            status: 'DONE',
            crop_id: cropId,
            user_id: userId,
            job_date: jobDate,
            title:''
          },
          Toast
        )
      );
    }
    // dispatch(updateJob())
  };

  return (
    <View>
      {showQuestion && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.showSelectedDateItem}>
            <Text fontType='light'>{exisitngJobConfirmQuestion}</Text>
            <Text
              style={{ color: colors.pink, fontSize: 18, marginTop: '2%' }}
              fontType='light'
            >
              {new Date(data?.cropToGrowDetails?.jobDate).toDateString()}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{...styles.circularButton, marginRight:4}} onPress={onCancel}>
              <AntDesign name='close' size={24} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circularButton} onPress={onConfirm}>
              <Feather name='check' size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View>
        {showConfirmed && (
          <View style={[styles.showSelectedDateItem]}>
            <Text fontType='light'>{confirmedJobText}</Text>
            <Text
              style={{ color: colors.pink, fontSize: 18, marginTop: '2%' }}
              fontType='light'
            >
              {new Date(data?.cropToGrowDetails?.jobDate).toDateString()}
            </Text>
          </View>
        )}
      </View>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
    </View>
  );
};

export default SowItContainer;

const styles = StyleSheet.create({
  horizontalFlexSpBtw: {},
  showSelectedDateItem: {
    justifyContent: 'center',
    paddingHorizontal: '6%',
    borderTopLeftRadius: 45,
    borderBottomLeftRadius: 45,
    borderTopRightRadius: 45,
    marginTop: '5%',
    borderBottomRightRadius: 45,
    backgroundColor: 'white',
    flex: 1,
    shadowColor: 'white',
    shadowOffset: {
      width: 0.5,
      height: 0.4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 15,
    paddingVertical: '3%',
  },
  circularButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.pink,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});
