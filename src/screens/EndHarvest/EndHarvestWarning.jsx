import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

import ManageCropContext from "../../context/ManageCropsContext";

import { updateJob } from "../../redux/actions";

import { GradientButton as Button, Text } from "../../components";

import manageCropsIcons from "../../assets/managecrops.png";

import constants from "../../constants";

const { colors } = constants;

const EndHarvestWarning = ({ navigation }) => {
  const manageCropContext = useContext(ManageCropContext);
  const { data } = manageCropContext;
  const { jobId, cropId, jobDate } = data.cropToGrowDetails;

  const { userId } = useSelector((state) => ({
    userId: state.auth?.user.id,
  }));

  const [endingHarvest, setEndingHarvest] = useState(false);

  const dispatch = useDispatch();

  const getCurrentDate = () => {
    const date = new Date().getDate();
    const month = `0${new Date().getMonth() + 1}`;
    const year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    // return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
    return year + "-" + month + "-" + date; //format: yyyy-mm-dd;
  };
  let todaysDate = getCurrentDate();
  const endHarvest = async () => {
    setEndingHarvest(true);
    if (jobId) {
      const errorResponse = await dispatch(
        updateJob(
          jobId,
          {
            status: "DONE",
            crop_id: cropId,
            user_id: userId,
            job_date: todaysDate,
            job_type: "HARVEST",
            title: "HARVEST",
            harvest_end_date: todaysDate,
            stage_three_completed: true,
          },
          Toast
        )
      );

      if (!errorResponse) {
        setTimeout(() => {
          navigation.navigate("End-Harvest-Confirmation");
        }, 500);
      }
    }
    setEndingHarvest(false);
  };
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <LinearGradient
      style={styles.container}
      colors={[colors.green, colors.greenDeep]}
    >
      <Text style={styles.title} fontType="bold">
        End Harvest
      </Text>
      <Text style={styles.question} fontType="light">
        Are you sure?
      </Text>
      <Text style={styles.warning} fontType="bold">
        You can’t undo this action. Once harvest has ended you can’t make any
        edits to this crop.
      </Text>
      <Button
        title="Yes please, end harvest!"
        coverStyle={{ marginTop: "10%" }}
        gradient={[colors.pink, colors.pinkDeep]}
        onPress={endHarvest}
        loading={endingHarvest}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack("End-Harvest-Schedule")}
      >
        <Text style={styles.optOut} fontType="bold">
          No that was a mistake. Take me back!
        </Text>
      </TouchableOpacity>
      <View style={styles.toolTip}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={manageCropsIcons} />
        </View>
        <Text style={styles.toolTipTitle} fontType="bold">
          Don’t forget!
        </Text>
        <Text style={styles.toolTipTitleContent}>
          You can view this crop even once finished in the manage crops area.
        </Text>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
    fontWeight: "normal",
    textAlign: "center",
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
  toolTip: {
    marginTop: "10%",
    backgroundColor: colors.white,
    borderRadius: 17,
    height: Dimensions.get("screen").height * 0.25,
    display: "flex",
    justifyContent: "center",
      paddingVertical: "5%",
      paddingHorizontal: "5%",
  },
  toolTipTitle: {
    textAlign: "center",
    fontSize: 16,
    color: colors.green,
    fontWeight: "bold",
    marginTop: "3%",
  },
  toolTipTitleContent: {
    textAlign: "center",
    fontSize: 14,
      marginTop: "2%",
      marginBottom: "2%",
    fontWeight: "200",
  },
});
export default EndHarvestWarning;
