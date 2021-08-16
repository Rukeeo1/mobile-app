import React, { useContext, useState } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { GradientButton as Button } from "../../components";
import constants from "../../constants";
import ManageCropContext, {
  useManageCropContext,
} from "../../context/ManageCropsContext";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob, updateJob } from "../../redux/actions";
import Toast from "react-native-toast-message";

const { colors } = constants;

const KilledCrop = ({ navigation }) => {
  const getCurrentDate = () => {
    const date = new Date().getDate();
    const month = `0${new Date().getMonth() + 1}`;
    const year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    // return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
    return year + "-" + month + "-" + date; //format: yyyy-mm-dd;
  };
  const manageCropContext = useContext(ManageCropContext);
  const {
    data: { cropToGrowDetails, jobId },
    value,
  } = useManageCropContext();

  // console.log({ cropToGrowDetails });

  const { user } = useSelector((state) => ({
    user: state.auth.user,
  }));

  const userId = user.id;

  const dispatch = useDispatch();
  const jobInfo = {
    crop_id: cropToGrowDetails?.cropId,
    user_id: user?.id,
    // job_date: new Date('2017-09-13 00:13:28'.replace(' ', 'T')),
    // job_date: ourDate.toString(),
    job_date: ourDate,
    job_type: "KILLED",
    status: "KILLED",
    variety: cropToGrowDetails?.variety,
    cropVariety: cropToGrowDetails?.cropVariety,
  };

  const [killingJob, setKillingJob] = useState(false);
  let ourDate;
  const onDelete = async () => {
    ourDate = getCurrentDate();
    setKillingJob(true);
    jobInfo.job_date = ourDate;
    jobInfo.title = "KILLED";
    jobInfo.status = "KILLED";
    jobInfo.job_type = "KILLED";
    await manageCropContext?.actions?.updateCropToGrowDetails({
      fromJobs: true,
      jobId: cropToGrowDetails?.jobId,
      job_type: "KILLED",
      action: "KILLED",
      jobStatus: "KILLED",
      notNewCalendar: true,
    });
    const error = await dispatch(
      updateJob(cropToGrowDetails?.jobId, jobInfo, Toast)
    );
    if (!error) {
      navigation.navigate("Settings", {
        screen: "Main-Profile",
        params: {
          indexOfItemToShow: 5,
        },
      });
    }
    setKillingJob(false);
  };

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <LinearGradient
      style={styles.container}
      colors={[colors.green, colors.greenDeep]}
    >
      <Text style={styles.title}>Crop killed</Text>
      <Text style={styles.question}>Aw man!</Text>
      <Text style={styles.warning}>Don’t give up, you can do this.</Text>
      <Button
        title="End crop"
        coverStyle={{ marginTop: "10%" }}
        gradient={[colors.pink, colors.pinkDeep]}
        onPress={onDelete}
        loading={killingJob}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.optOut}>No that was a mistake. Take me back!</Text>
      </TouchableOpacity>
    </LinearGradient>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  title: {
    marginTop: "45%",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
  question: {
    marginTop: "10%",
    color: colors.white,
    fontSize: 30,
    fontWeight: "100",
  },
  warning: {
    marginTop: "5%",
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 20,
  },
  optOut: {
    color: colors.white,
    marginTop: "10%",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
export default KilledCrop;
