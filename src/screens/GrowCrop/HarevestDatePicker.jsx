import React, { useEffect, useState, useContext } from "react";
import {StyleSheet, View} from "react-native";

import ManageCropContext from "../../context/ManageCropsContext";

import { GradientButton as Button, Text } from "../../components";

import { GrowCropCalender } from "./GrowCropCalendar";

import constants from "../../constants";

const {
  colors,
  months,
  monthsAbr,
  defaultCalendarDay,
  defaultCalendarYear,
  HARVEST,
} = constants;

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
  dateStartedTitle,
  onEndHarvest = () => {},
  harvestEnded,
                                       currentJobDate
}) => {
  const manageCropContext = useContext(ManageCropContext);
  const { cropToGrowDetails } = manageCropContext?.data;

  const [showStartButton, setShowStartButton] = useState(true);
  const [showCalender, setShowCalender] = useState(false);
  const [showFullSelectedDate, setShowFullSelectedDate] = useState(false);
  const [showEndHarvestButton, setShowEndHarvestButton] = useState(true);
  const [selectedDate, setSelectedDate] = useState(defaultCalendarDay);
  const [showEndHarvestSummary, setShowEndHarvestSummary] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    months[monthsAbr.indexOf(startMonth)]
  );
  const [selectedYear, setSelectedYear] = useState(defaultCalendarYear);

  const monthIndex = monthsAbr.indexOf(startMonth);

  useEffect(() => {
    if (cropToGrowDetails.fromJobs && cropToGrowDetails?.action === HARVEST) {
      setShowEndHarvestButton(true);
      setShowStartButton(false);
      setShowFullSelectedDate(true);
    }
  }, [manageCropContext.data]);

  useEffect(() => {
    if (harvestEnded) {
      setShowStartButton(false);
      setShowCalender(false);
      setShowEndHarvestButton(false);
      setShowEndHarvestSummary(true);
      setShowFullSelectedDate(false);
    }
  }, [harvestEnded]);

  const endHarvestMonth = new Date().getMonth();
  const endHarvestDay = new Date().getDate();
  const endHarvestYear = new Date().getFullYear();

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
            fontType="bold"
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

          <View style={[styles.showSelectedDateItem]}>
          {/*<SelectedDate*/}
          {/*    // selectedDate={selectedDate}*/}
          {/*    // selectedMonth={selectedMonth}*/}
          {/*    // selectedYear={selectedYear}*/}
          {/*  selectedDate={new Date(currentJobDate).getUTCDate()}*/}
          {/*  selectedMonth={new Date(currentJobDate).getUTCMonth() + 1}*/}
          {/*  selectedYear={new Date(currentJobDate).getUTCFullYear()}*/}
          {/*  title={dateStartedTitle} //set a condition if harvest ended*/}
          {/*/>*/}
                <Text fontType="light">{dateStartedTitle}</Text>
            <Text
                style={{ color: colors.pink, fontSize: 18, marginTop: "2%" }}
                fontType="light"
            >
                {new Date(currentJobDate).toDateString()}
            </Text>
          <View>
            <Button
              title="End Harvest"
              gradient={[colors.pink, colors.pinkDeep]}
              onPress={onEndHarvest}
            />
          </View>
        </View>
      )}
      {showEndHarvestSummary && (
        <>
          <SelectedDate
            selectedDate={selectedDate}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            title={dateStartedTitle} //set a condition if harvest ended
          />
          <SelectedDate
            selectedDate={endHarvestDay}
            selectedMonth={months[endHarvestMonth]}
            selectedYear={endHarvestYear}
            title={"Harvest Ended"} //set a condition if harvest ended
          />
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
        justifyContent: "center",
        paddingHorizontal: "6%",
        borderTopLeftRadius: 45,
        borderBottomLeftRadius: 45,
        borderTopRightRadius: 45,
        marginTop: "5%",
        borderBottomRightRadius: 45,
        backgroundColor: "white",
        flex: 1,
        shadowColor: "grey",
        shadowOffset: {
          width: 0.5,
          height: 0.4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 15,
        paddingVertical: "3%",
        // marginRight: !showHoriazontalButtonAfterDateIsSelected ? 20 : 0,
      }}
    >
      <Text fontType="light">{title}</Text>
      <Text
        style={{ color: colors.pink, fontSize: 18, marginTop: "2%" }}
        fontType="light"
      >{`${selectedDate} ${selectedMonth} ${selectedYear}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    horizontalFlexSpBtw: {},
    showSelectedDateItem: {
        justifyContent: "center",
        paddingHorizontal: "6%",
        borderTopLeftRadius: 45,
        borderBottomLeftRadius: 45,
        borderTopRightRadius: 45,
        marginTop: "5%",
        borderBottomRightRadius: 45,
        backgroundColor: "white",
        flex: 1,
        shadowColor: "white",
        shadowOffset: {
            width: 0.5,
            height: 0.4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 15,
        paddingVertical: "3%",
    },
    circularButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: colors.pink,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
});
