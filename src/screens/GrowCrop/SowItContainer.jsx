import React, { useEffect, useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Feather, AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import ManageCropContext from "../../context/ManageCropsContext";

import { GradientButton as Button, Text } from "../../components";

import { GrowCropCalender } from "./GrowCropCalendar";

import { updateJob } from "../../redux/actions";

import constants from "../../constants";
import moment from "moment";
// import moment from "moment";

const { colors, months, monthsAbr, defaultCalendarDay, defaultCalendarYear } =
  constants;

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
  jobInfo,
  variety,
  jobType,
  jobTitle,
  jobStatus2,
  jobCurrentAction,
  jobStatusLevel,
  completeCheck,
  stageOneComplete,
  stageTwoComplete,
  sowDateFromServer,
  plantDateFromServer,
  harvestStartDateFromServer,
  harvestEndDateFromServer,
                                            setActiveScreen
}) => {
  const manageCropContext = useContext(ManageCropContext);
  const { data } = manageCropContext;
  const { growItStarted, action, notNewCalendarSow, notNewCalendarPlant, notNewCalendarHarvest, jobStatus, jobId } =
    data.cropToGrowDetails;

  const [showSowItButton, setShowSowItButton] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [afterCancelDateConfirmedSow, setAfterCancelDateConfirmedSow] = useState(notNewCalendarSow);
  const [afterCancelDateConfirmedPlant, setAfterCancelDateConfirmedPlant] = useState(notNewCalendarPlant);
  const [afterCancelDateConfirmedHarvest, setAfterCancelDateConfirmedHarvest] = useState(notNewCalendarHarvest);
  const [showFullSelectedDate, setShowFullSelectedDate] = useState(false);
  // const [notNewCalendar, setNotNewCalendar] = useState(false);
  const [showConfirmExisingJob, setShowConfirmExistingBox] = useState(false);
  const [showConfirmed, setShowConfirmed] = useState(true);
  const [showQuestion, setShowQuestion] = useState(true);

  //refactor: note change selectedDate to selectedDay to avoid confusion
  const [selectedDate, setSelectedDate] = useState(defaultCalendarDay);
  const [selectedMonth, setSelectedMonth] = useState(
    months[monthsAbr.indexOf(startMonth)]
  );
  const [selectedYear, setSelectedYear] = useState(defaultCalendarYear);

  const monthIndex = monthsAbr.indexOf(startMonth);

  const ourMonths = [
    "dummyMonth",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const ourMonthIndex = (correctMonth) =>
    ourMonths.indexOf(correctMonth) < 10
      ? "0" + ourMonths.indexOf(correctMonth)
      : ourMonths.indexOf(correctMonth);

  useEffect(() => {
    if (fromJobs) {
      // if (!completeCheck) {
      //   if ((jobType === "SOW" || jobType === "PENDING") && stageOneComplete) {
      //     setShowSowItButton(false);
      //     setShowFullSelectedDate(false);
      //     setShowConfirmExistingBox(false);
      //     setShowConfirmed(true);
      //     setShowQuestion(false);
      //   }
      //   if (jobType === "PLANT" && stageTwoComplete) {
      //     setShowSowItButton(false);
      //     setShowFullSelectedDate(false);
      //     setShowConfirmExistingBox(false);
      //     setShowConfirmed(true);
      //     setShowQuestion(false);
      //   }
        //   if ((jobType === "SOW" || jobType === "PENDING") && stageOneComplete) {
        //     setShowSowItButton(false);
        //     setShowFullSelectedDate(false);
        //     setShowConfirmExistingBox(false);
        //     setShowConfirmed(true);
        //     setShowQuestion(false);
        //   }
      //   if ((jobType === "SOW" || jobType === "PENDING") && !stageOneComplete) {
      //     setShowSowItButton(false);
      //     setShowFullSelectedDate(false);
      //     setShowConfirmExistingBox(true);
      //     setShowConfirmed(false);
      //     setShowQuestion(true);
      //   }
      //   if (jobType === "PLANT" && !stageTwoComplete) {
      //     setShowSowItButton(false);
      //     setShowFullSelectedDate(false);
      //     setShowConfirmExistingBox(true);
      //     setShowConfirmed(false);
      //     setShowQuestion(true);
      //   }
      // }
        if (!completeCheck) {
              if ((jobType === "SOW" || jobType === "PENDING") && stageOneComplete) {
                setShowSowItButton(false);
                setShowFullSelectedDate(false);
                setShowConfirmExistingBox(false);
                setShowConfirmed(true);
                setShowQuestion(false);
              }
              if ((jobType === "SOW" || jobType === "PENDING") && !stageOneComplete) {
                setShowSowItButton(false);
                setShowFullSelectedDate(false);
                setShowConfirmExistingBox(true);
                setShowConfirmed(false);
                setShowQuestion(true);
              }
              if (jobType === "PLANT" && !stageTwoComplete) {
                setShowSowItButton(false);
                setShowFullSelectedDate(false);
                setShowConfirmExistingBox(true);
                setShowConfirmed(false);
                setShowQuestion(true);
              }

            if (jobType === "SOW" && stageOneComplete && !stageTwoComplete) {
                setShowSowItButton(true);
                setShowFullSelectedDate(false);
                setShowConfirmExistingBox(false);
                setShowConfirmed(true);
                setShowQuestion(false);
            }
            if (jobType === "PLANT" && stageOneComplete && !stageTwoComplete) {
                setShowSowItButton(false);
                setShowFullSelectedDate(false);
                setShowConfirmExistingBox(true);
                setShowConfirmed(false);
                setShowQuestion(true);
            }

            // if (jobType === "SOW" && !stageOneComplete && !stageTwoComplete) {
            //     setShowSowItButton(true);
            //     setShowFullSelectedDate(false);
            //     setShowConfirmExistingBox(false);
            //     setShowConfirmed(true);
            //     setShowQuestion(false);
            // }

            // if (jobType === "PLANT" && !stageOneComplete && !stageTwoComplete) {
            //     setShowSowItButton(true);
            //     setShowFullSelectedDate(false);
            //     setShowConfirmExistingBox(false);
            //     setShowConfirmed(true);
            //     setShowQuestion(false);
            // }
            if (
                jobType === "SOW" &&
                !stageOneComplete &&
                !stageTwoComplete &&
                afterCancelDateConfirmedSow
            ) {
                setShowSowItButton(false);
                setShowFullSelectedDate(true);
                setShowConfirmExistingBox(false);
                setShowConfirmed(true);
                setShowQuestion(false);
            }

            if (
                jobType === "PLANT" &&
                !stageOneComplete &&
                !stageTwoComplete &&
                afterCancelDateConfirmedPlant
            ) {
                setShowSowItButton(false);
                setShowFullSelectedDate(true);
                setShowConfirmExistingBox(false);
                setShowConfirmed(true);
                setShowQuestion(false);
            }

            if (
                jobType === "HARVEST" &&
                !stageOneComplete &&
                !stageTwoComplete &&
                afterCancelDateConfirmedHarvest
            ) {
                setShowSowItButton(false);
                setShowFullSelectedDate(true);
                setShowConfirmExistingBox(false);
                setShowConfirmed(true);
                setShowQuestion(false);
            }

            if (jobType === "SOW" && !stageOneComplete && stageTwoComplete) {
                setShowSowItButton(true);
                setShowFullSelectedDate(false);
                setShowConfirmExistingBox(false);
                setShowConfirmed(true);
                setShowQuestion(false);
            }
            if (jobType === "PLANT" && stageOneComplete && !stageTwoComplete) {
                setShowSowItButton(false);
                setShowFullSelectedDate(false);
                setShowConfirmExistingBox(true);
                setShowConfirmed(false);
                setShowQuestion(true);
            }

            if (
                jobType === "SOW" &&
                !stageOneComplete &&
                stageTwoComplete &&
                jobStatus === "STARTED"
            ) {
                setShowSowItButton(false);
                setShowFullSelectedDate(true);
                setShowConfirmExistingBox(false);
                setShowConfirmed(true);
                setShowQuestion(false);
            }

            if (
                jobType === "PLANT" &&
                stageOneComplete &&
                !stageTwoComplete &&
                jobStatus === "STARTED"
            ) {
                setShowSowItButton(false);
                setShowFullSelectedDate(true);
                setShowConfirmExistingBox(false);
                setShowConfirmed(true);
                setShowQuestion(false);
            }



        }
      if (completeCheck) {
        if ((jobType === "SOW" || jobType === "PENDING") && stageOneComplete) {
          setShowSowItButton(false);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(true);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
        if (jobType === "PLANT" && stageTwoComplete) {
          setShowSowItButton(false);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(true);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
        if ((jobType === "SOW" || jobType === "PENDING") && !stageOneComplete) {
          setShowSowItButton(false);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(true);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
        if (jobType === "PLANT" && !stageTwoComplete) {
          setShowSowItButton(false);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
        if (jobType === "SOW" && stageOneComplete && !stageTwoComplete) {
          setShowSowItButton(false);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(true);
          setShowConfirmed(true);
          setShowQuestion(false);
        }

        if (jobType === "PLANT" && stageOneComplete && !stageTwoComplete) {
          setShowSowItButton(true);
          setShowFullSelectedDate(true);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
      }
    }
    //
    if (!fromJobs) {
      if (!completeCheck) {
        if ((jobType === "SOW" || jobType === "PENDING") && stageOneComplete) {
          setShowSowItButton(false);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(true);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
        if (jobType === "PLANT" && stageTwoComplete) {
          setShowSowItButton(false);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(true);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
        if ((jobType === "SOW" || jobType === "PENDING") && !stageOneComplete) {
          setShowSowItButton(false);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(true);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
        if (jobType === "PLANT" && !stageTwoComplete) {
          setShowSowItButton(true);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }

        if (jobType === "SOW" && stageOneComplete && !stageTwoComplete) {
          setShowSowItButton(true);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }

        if (jobType === "SOW" && !stageOneComplete && !stageTwoComplete) {
          setShowSowItButton(true);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }

        if (jobType === "PLANT" && !stageOneComplete && !stageTwoComplete) {
          setShowSowItButton(true);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
        if (
          jobType === "SOW" &&
          !stageOneComplete &&
          !stageTwoComplete &&
          afterCancelDateConfirmedSow
        ) {
          setShowSowItButton(false);
          setShowFullSelectedDate(true);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }

        if (
          jobType === "PLANT" &&
          !stageOneComplete &&
          !stageTwoComplete &&
          afterCancelDateConfirmedPlant
        ) {
          setShowSowItButton(false);
          setShowFullSelectedDate(true);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }

        if (
          jobType === "HARVEST" &&
          !stageOneComplete &&
          !stageTwoComplete &&
            afterCancelDateConfirmedHarvest
        ) {
          setShowSowItButton(false);
          setShowFullSelectedDate(true);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }

        if (jobType === "SOW" && !stageOneComplete && stageTwoComplete && plantDateFromServer === '') {
          setShowSowItButton(true);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
        if (jobType === "PLANT" && stageOneComplete && !stageTwoComplete && sowDateFromServer === '') {
          setShowSowItButton(true);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }

        if (
          jobType === "SOW" &&
          !stageOneComplete &&
          stageTwoComplete &&
          jobStatus === "STARTED"
        ) {
          setShowSowItButton(false);
          setShowFullSelectedDate(true);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }

        if (
          jobType === "PLANT" &&
          stageOneComplete &&
          !stageTwoComplete &&
          jobStatus === "STARTED"
        ) {
          setShowSowItButton(false);
          setShowFullSelectedDate(true);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
      }

      if (completeCheck) {
        if ((jobType === "SOW" || jobType === "PENDING") && stageOneComplete) {
          setShowSowItButton(false);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(true);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
        if (jobType === "PLANT" && stageTwoComplete) {
          setShowSowItButton(false);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(true);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
        if (
          (jobType === "SOW" || jobType === "PENDING") &&
          !stageOneComplete
        ) {
          setShowSowItButton(false);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(true);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
        if (jobType === "PLANT" && !stageTwoComplete) {
          setShowSowItButton(true);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
        if (jobType === "HARVEST" && !stageTwoComplete) {
          setShowSowItButton(true);
          setShowFullSelectedDate(false);
          setShowConfirmExistingBox(false);
          setShowConfirmed(true);
          setShowQuestion(false);
        }
          if (
              jobType === "SOW" &&
              !stageOneComplete &&
              stageTwoComplete &&
              jobStatus === "STARTED"
          ) {
              setShowSowItButton(false);
              setShowFullSelectedDate(true);
              setShowConfirmExistingBox(false);
              setShowConfirmed(true);
              setShowQuestion(false);
          }

          if (
              jobType === "PLANT" &&
              stageOneComplete &&
              !stageTwoComplete &&
              jobStatus === "STARTED"
          ) {
              setShowSowItButton(false);
              setShowFullSelectedDate(true);
              setShowConfirmExistingBox(false);
              setShowConfirmed(true);
              setShowQuestion(false);
          }
      }
    }

    // console.log('testtesttest');
    console.log({
      tibvbv: {
          stageOneComplete,
          fromJobs,
          completeCheck,
          stageTwoComplete,
          jobType,
          jobStatus,
          notNewCalendarSow,
          notNewCalendarPlant,
          notNewCalendarHarvest,
          afterCancelDateConfirmedSow,
          afterCancelDateConfirmedPlant,
          afterCancelDateConfirmedHarvest,
      }
    });
  }, [
    fromJobs,
    completeCheck,
    stageOneComplete,
    stageTwoComplete,
    jobType,
      jobStatus,
      notNewCalendarSow,
      notNewCalendarPlant,
      notNewCalendarHarvest,
      afterCancelDateConfirmedSow,
      afterCancelDateConfirmedPlant,
      afterCancelDateConfirmedHarvest,
  ]);
  useEffect(() => {
    console.log({ lebron2: data });
  }, []);
  useEffect(() => {
    // if (completeCheck) {
    //     setShowFullSelectedDate(false);
    //     setShowSowItButton(false);
    //     setShowConfirmExistingBox(completeCheck);
    // }
    //
    // if (!completeCheck) {
    //     setShowFullSelectedDate(true);
    //     setShowSowItButton(false);
    //     setShowConfirmExistingBox(false);
    // }
  }, [completeCheck]);

  useEffect(() => {
    // console.log('testtesttest');
  }, []);

  // useEffect(() => {
  //     console.log({'testtesttest': {selectedYear, selectedMonth, selectedDate}});
  // }, [selectedYear, selectedMonth, selectedDate]);
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
            jobType={jobType}
            jobStatusLevel={jobStatusLevel}
            onCancel={onCancel}
            jobInfoNew={jobInfo}
            jobStatus2={jobStatus2}
            jobCurrentAction={jobCurrentAction}
            // onConfirm={}
            showConfirmed={showConfirmed}
            setShowConfirmed={setShowConfirmed}
            jobInfo={jobInfo}
            jobTitle2={jobTitle}
            completeCheck={completeCheck}
            showQuestion={showQuestion}
            setShowQuestion={setShowQuestion}
            sowDateFromServer={sowDateFromServer}
            plantDateFromServer={plantDateFromServer}
            harvestStartDateFromServer={harvestStartDateFromServer}
            harvestEndDateFromServer={harvestEndDateFromServer}
            setActiveScreen={setActiveScreen}
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
              setShowSowItButton(false);
              setShowFullSelectedDate(true);
              manageCropContext?.actions?.updateCropToGrowDetails({
                notNewCalendarSow: jobType === 'SOW',
                notNewCalendarPlant: jobType === 'PLANT',
              });
              setAfterCancelDateConfirmedSow(jobType === 'SOW');
              setAfterCancelDateConfirmedPlant(jobType === 'PLANT');
                setAfterCancelDateConfirmedHarvest(jobType === 'HARVEST')
              onSubmitSelected(
                `${selectedYear}-${ourMonthIndex(
                  selectedMonth
                )}-${selectedDate}`
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
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
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
                marginRight: !showHoriazontalButtonAfterDateIsSelected ? 20 : 0,
              }}
            >
              <Text fontType="light">{reminderText}</Text>
              <Text
                style={{ color: colors.pink, fontSize: 18, marginTop: "2%" }}
                fontType="light"
              >
                  {/*{`${selectedDate} ${selectedMonth} ${selectedYear}`}*/}
                  {(() => {
                      if (
                          (jobType === "SOW" && sowDateFromServer !== "") ||
                          (jobType === "SOW" &&
                              data?.cropToGrowDetails?.sowItDate &&
                              data?.cropToGrowDetails?.sowItDate !== "")
                      ) {
                          return new Date(
                              sowDateFromServer || data?.cropToGrowDetails?.jobDate
                          ).toDateString();
                      } else if (
                          (jobType === "PLANT" && plantDateFromServer !== "") ||
                          (jobType === "PLANT" &&
                              data?.cropToGrowDetails?.plantItDate &&
                              data?.cropToGrowDetails?.plantItDate !== "")
                      ) {
                          return new Date(
                              plantDateFromServer || data?.cropToGrowDetails?.jobDate
                          ).toDateString();
                      }  else if (
                          (jobType === "HARVEST" && harvestStartDateFromServer !== "") ||
                          (jobType === "HARVEST" &&
                              data?.cropToGrowDetails?.harvestItStartDate &&
                              data?.cropToGrowDetails?.harvestItStartDate !== "")
                      ) {
                          return new Date(
                              harvestStartDateFromServer || data?.cropToGrowDetails?.jobDate
                          ).toDateString();
                      } else {
                          new Date(data?.cropToGrowDetails?.jobDate).toDateString();
                      }

                      return null;
                  })()}
              </Text>
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
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                {submitting ? (
                  <ActivityIndicator />
                ) : (
                  <Feather name="clock" size={24} color={colors.white} />
                )}
              </TouchableOpacity>
            )}
          </View>
          {showHoriazontalButtonAfterDateIsSelected && (
            <Button
              title="End Harvest"
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
  reminderText = "",
  exisitngJobConfirmQuestion,
  onCancel = () => {},
  confirmedJobText,
  jobInfoNew,
  variety2,
  jobType,
  jobTitle2,
  jobStatus2,
  jobStatusLevel,
  jobCurrentAction,
  // showConfirmExisingJob,
  completeCheck,
  showConfirmed,
  setShowConfirmed,
  showQuestion,
  setShowQuestion,
  sowDateFromServer,
  plantDateFromServer,
  harvestStartDateFromServer,
  harvestEndDateFromServer,
                                setActiveScreen
}) => {
  // const [showQuestion, setShowQuestion] = useState(completeCheck);

  const { userId } = useSelector((state) => ({
    userId: state.auth?.user.id,
  }));
  const manageCropContext = useContext(ManageCropContext);
  const { data } = manageCropContext;
  const { jobId, cropId, jobDate, variety, growItStarted, notNewCalendarSow, notNewCalendarPlant } =
    data.cropToGrowDetails;

  const dispatch = useDispatch();

  const onConfirm = () => {
    setShowConfirmed(completeCheck);
    setShowQuestion(!completeCheck);
    let myJobDetail = {
      status: "DONE",
      crop_id: cropId,
      user_id: userId,
      job_date: new Date(jobDate),
      variety: variety,
      job_type: jobType,
      title: jobType,
      // stage_one_completed: jobType === "SOW" || jobType === "PLANT",
      // stage_one_completed: jobType === "SOW",
      // stage_two_completed: jobType === "PLANT",
      // stage_three_completed: jobType === "HARVEST",
    };

    let myJobContext = {
      jobId,
      action: "DONE",
      currentlySetToRemindStage: "DONE",
      growItStarted: "DONE",
      jobStatus: jobStatus2,
      // stageOneComplete: jobType === "SOW" || jobType === "PLANT",
      // stageOneComplete: jobType === "SOW",
      // stageTwoComplete: jobType === "PLANT",
      // stageThreeComplete: jobType === "HARVEST",
    };

    let myJobContext2 = {
      jobId,
      currentlySetToRemindStage: "DONE",
      title: jobType,
      job_type: jobType,
      action: jobStatus2,
      // stageOneComplete: jobType === "SOW" || jobType === "PLANT",
      // stageOneComplete: jobType === "SOW",
      // stageTwoComplete: jobType === "PLANT",
      // stageThreeComplete: jobType === "HARVEST",
      growItStarted: "DONE",
    };
    if (jobType === "SOW") {
      myJobDetail = { ...myJobDetail, sow_date: jobDate, job_date: new Date(jobDate), title: 'SOW', status: "DONE", stage_one_completed: true };
      myJobContext = { ...myJobContext, sowItDate: jobDate, job_date: new Date(jobDate),stageTwoComplete: plantDateFromServer !== '', stageOneComplete: true };
      myJobContext2 = { ...myJobContext2, sowItDate: jobDate, stageTwoComplete: plantDateFromServer !== '',  stageOneComplete: true};
        dispatch(updateJob(jobId, myJobDetail, Toast)).then(() => {
            setActiveScreen(1);
        });

    }
      if (jobType === "PLANT") {
          myJobDetail = { ...myJobDetail, plant_date: jobDate, job_date: new Date(jobDate), title: 'PLANT', status: "DONE", stage_two_completed: true };
          myJobContext = { ...myJobContext, plantItDate: jobDate, job_date: new Date(jobDate), stageOneComplete: sowDateFromServer !== '', stageTwoComplete: true };
          myJobContext2 = { ...myJobContext2, plantItDate: jobDate,  stageOneComplete: sowDateFromServer !== '', stageTwoComplete: true };
          dispatch(updateJob(jobId, myJobDetail, Toast)).then(() => {
              setActiveScreen(2);
          });
      }
      if (jobType === "HARVEST") {
          myJobDetail = { ...myJobDetail, harvest_date: jobDate, job_date: new Date(jobDate), title: 'HARVEST', status: "DONE", stage_three_completed: true };
          myJobContext = { ...myJobContext, harvestItStartDate: jobDate, job_date: new Date(jobDate), stageOneComplete: sowDateFromServer !== '', stageTwoComplete: plantDateFromServer !== '', stageThreeComplete: true };
          myJobContext2 = { ...myJobContext2, harvestItStartDate: jobDate, stageOneComplete: sowDateFromServer !== '', stageTwoComplete: plantDateFromServer !== '', stageThreeComplete: true };

      }

    manageCropContext?.actions?.updateCropToGrowDetails(myJobContext);
    if (jobId) {
      manageCropContext?.actions?.updateCropToGrowDetails(myJobContext2);


    }
    // dispatch(updateJob())
  };

  return (
    <View>
      {showQuestion && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.showSelectedDateItem}>
            <Text fontType="light">{exisitngJobConfirmQuestion}</Text>
            <Text
              style={{ color: colors.pink, fontSize: 18, marginTop: "2%" }}
              fontType="light"
            >
              {new Date(data?.cropToGrowDetails?.jobDate).toDateString()}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ ...styles.circularButton, marginRight: 4 }}
              onPress={onCancel}
            >
              <AntDesign name="close" size={24} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circularButton} onPress={onConfirm}>
              <Feather name="check" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View>
        {showConfirmed && (
          <View style={[styles.showSelectedDateItem]}>
            <Text fontType="light">{confirmedJobText}</Text>
            <Text
              style={{ color: colors.pink, fontSize: 18, marginTop: "2%" }}
              fontType="light"
            >
              {(() => {
                if (
                  (jobType === "SOW" && sowDateFromServer !== "") ||
                  (jobType === "SOW" &&
                    data?.cropToGrowDetails?.sowItDate &&
                    data?.cropToGrowDetails?.sowItDate !== "")
                ) {
                  return new Date(
                    sowDateFromServer || data?.cropToGrowDetails?.jobDate
                  ).toDateString();
                } else if (
                    (jobType === "PLANT" && plantDateFromServer !== "") ||
                    (jobType === "PLANT" &&
                        data?.cropToGrowDetails?.plantItDate &&
                        data?.cropToGrowDetails?.plantItDate !== "")
                ) {
                    return new Date(
                        plantDateFromServer || data?.cropToGrowDetails?.jobDate
                    ).toDateString();
                }  else if (
                    (jobType === "HARVEST" && harvestStartDateFromServer !== "") ||
                    (jobType === "HARVEST" &&
                        data?.cropToGrowDetails?.harvestItStartDate &&
                        data?.cropToGrowDetails?.harvestItStartDate !== "")
                ) {
                    return new Date(
                        harvestStartDateFromServer || data?.cropToGrowDetails?.jobDate
                    ).toDateString();
                } else {
                  new Date(data?.cropToGrowDetails?.jobDate).toDateString();
                }

                return null;
              })()}
            </Text>
          </View>
        )}
      </View>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
    </View>
  );
};

export default CropDatePickerContainer;

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
