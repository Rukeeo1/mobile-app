import React, { useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";

import { GradientButton, Text } from "../../components/";

import constants from "../../constants";
import { growCrop, updateJob } from "../../redux/actions";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const { colors, screenHeight } = constants;

export const CropItem = ({
  crop,
  currentVariety,
  currentName,
  currentCropId,
  manageCropContext,
  route,
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const { cropName, sowTip, growLevel, cropId } = route?.params || {};
  const {
    thumbnail_url,
    name,
    category,
    variety,
    affiliate_links,
    recommendation,
  } = crop || {}; //{affiliate_links, thumbnail_url, recommendation}
  const { cropCycleDetails, cropSteps, user } = useSelector((state) => ({
    cropCycleDetails: state?.crops?.cropCycleDetails[0],
    cropSteps: state?.crops?.cropSteps,
    user: state?.auth?.user,
  }));

  const getCurrentDate = () => {
    const date = new Date().getDate();
    const month = `0${new Date().getMonth() + 1}`;
    const year = new Date().getFullYear();
    return year + "-" + month + "-" + date; //format: yyyy-mm-dd;
  };
  let ourDate;
  let jobInfo = {};
  const handleGrowCrop = (selectedDate, cropIdx, jobType) => {
    // ourDate = new Date(); // 2020 January 5
    ourDate = getCurrentDate(); // 2020 January 5
    // ourDate = new Date(selectedDate); // 2020 January 5
    jobInfo = {
      cropName,
      crop_id: currentCropId,
      user_id: user?.id,
      job_date: ourDate,
      title: "PENDING",
      status: "PENDING",
      job_type: jobType,
      variety: recommendation,
      crop_type: currentVariety,
    };
    // console.log({
    //   oluwadurotimi: {
    //     cropName,
    //     crop_id: currentCropId,
    //     user_id: user?.id,
    //     job_date: ourDate,
    //     status: "PENDING",
    //     job_type: jobType,
    //     variety: recommendation,
    //     crop_type: currentVariety,
    //   },
    // });

    manageCropContext?.actions?.updateCropToGrowDetails({
      title: "PENDING",
      cropName: currentName,
      action: "PENDING",
      job_type: "PENDING",
      jobDate: jobInfo.job_date,
      variety: recommendation,
      cropVariety: currentVariety,
      cropId: currentCropId,
    });

    // handleNavigation('Success')
    return dispatch(growCrop(jobInfo, false));
  };
  const handleNavigation = (path) => () => {
    manageCropContext?.actions?.updateCropToGrowDetails({
      variety: recommendation,
      cropName: currentName,
      cropVariety: currentVariety,
      cropId: currentCropId,
    });

    navigation.navigate(path);
  };

  return (
    <View style={{ marginVertical: screenHeight * 0.005 }}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.cropCardContainer]}
        onPress={() => setShow(!show)}
      >
        <View style={[styles.cropDetails]}>
          <Image style={[styles.cropAvatar]} source={{ uri: thumbnail_url }} />
          <View style={[styles.cropText]}>
            <Text style={[styles.cropName]}>{recommendation}</Text>
            <Text>{currentVariety}</Text>
          </View>
        </View>
        <AntDesign name="right" size={24} color={colors.green} />
      </TouchableOpacity>
      {show && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 200,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <GradientButton
            gradient={[colors.blueLigth, colors.blue]}
            onPress={() => {
              handleGrowCrop("1234", currentCropId, "PENDING");
              navigation.navigate("Success");
            }}
          >
            <View
              style={{
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 20,
              }}
            >
              <Text style={styles.btnText}>Grow It</Text>
            </View>
          </GradientButton>
          <GradientButton
            coverStyle={{ marginLeft: 5 }}
            gradient={[colors.blueLigth, colors.blue]}
            onPress={() => {
              Linking.openURL(`${affiliate_links}`);
            }}
            //
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text style={styles.btnText}>Buy seed</Text>
              <Entypo name="shopping-cart" size={24} color={colors.white} />
            </View>
          </GradientButton>
        </View>
      )}
    </View>
  );
};

export default CropItem;

const styles = StyleSheet.create({
  cropCardContainer: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    borderRadius: 100 / 2,
    height: 70,
    paddingRight: 20,
    // marginVertical: 3,
    // shadow iOS
    shadowColor: "grey",
    shadowOffset: {
      width: 0.5,
      height: 0.4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // shadow android
    elevation: 15,
  },
  cropDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  cropText: {
    marginLeft: 10,
  },
  cropAvatar: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  btnText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
