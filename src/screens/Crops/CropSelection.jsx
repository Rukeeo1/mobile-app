import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";

import {
  getCropsFavoriteToGrow,
  getCropVarieties,
  growCrop,
  harvestCrop,
  plantCrop,
  updateJob,
  updateJob2,
} from "../../redux/actions";

import { Input, GradientButton } from "../../components/";
import { CropItem } from "./CropItem";

import constants from "../../constants";
import ManageCropContext from "../../context/ManageCropsContext";
import Toast from "react-native-toast-message";

const { colors, months } = constants;

const CropSelection = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const manageCropContext = useContext(ManageCropContext);
  const { cropToGrowDetails, endHarvest } = manageCropContext?.data;

  const { cropDetail, favoriteCrops } = useSelector((state) => state.crops);
  const { cropCycleDetails, cropSteps, user } = useSelector((state) => ({
    cropCycleDetails: state.crops.cropCycleDetails[0],
    cropSteps: state.crops.cropSteps,
    user: state?.auth?.user,
  }));
  const { cropName, sowTip, growLevel, cropId } = route?.params || {};

  const [cropUserVariety, setCropUserVariety] = useState("");
  const [cropVarietyType, setCropVarietyType] = useState("");
  const getCurrentDate = () => {
    const date = new Date().getDate();
    const month = `0${new Date().getMonth() + 1}`;
    const year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    // return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
    return year + "-" + month + "-" + date; //format: yyyy-mm-dd;
  };

  let ourDate;
  let jobInfo = {};
  let jobInfo2 = {};
  const handleGrowCrop = async (selectedDate, cropIdx, jobType) => {
    // ourDate = new Date(); // 2020 January 5
    ourDate = getCurrentDate(); // 2020 January 5
    // ourDate = new Date(selectedDate); // 2020 January 5
    jobInfo = {
      cropName,
      crop_id: cropIdx,
      user_id: user?.id,
      job_date: ourDate,
      status: "PENDING",
      job_type: jobType,
      // variety: cropVarietyType,
      cropType: cropVarietyType,
      cropVariety: cropUserVariety,
    };

    console.log({ testDamooo: cropToGrowDetails });

    jobInfo.title = "PENDING";
    manageCropContext?.actions?.updateCropToGrowDetails({
      title: "PENDING",
      cropName,
      action: "PENDING",
      job_type: "PENDING",
      jobDate: jobInfo.job_date,

      // variety: cropVarietyType,
      cropVariety: cropUserVariety,
    });
    if (cropToGrowDetails?.editCropName) {
      jobInfo2 = {
        cropName,
        crop_id: cropToGrowDetails.cropId,
        user_id: user?.id,
        variety: cropToGrowDetails.variety,
        cropType: cropVarietyType,
        cropVariety: cropUserVariety,
        action: cropToGrowDetails.action,
        job_type: cropToGrowDetails.job_type,
        jobDate: cropToGrowDetails.jobDate,
      };
      manageCropContext?.actions?.updateCropToGrowDetails({
        // variety: cropVarietyType,
        cropVariety: cropUserVariety,
      });

      console.log({ sunchine: jobInfo2 });
      return await dispatch(
        updateJob(cropToGrowDetails?.jobId, jobInfo2, Toast)
      );
    }
    return await dispatch(growCrop(jobInfo, false));
  };

  useEffect(() => {
    if (cropName) {
      dispatch(getCropVarieties(cropName));
    }
    dispatch(getCropsFavoriteToGrow(months[new Date().getMonth()]));
  }, [cropName]);

  let tmpItem;

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* <SafeAreaView> */}
      <ScrollView>
        <View>
          <LinearGradient
            style={[styles.searchContainer]}
            colors={[colors.green, colors.greenDeep]}
          >
            <AntDesign
              name="left"
              size={24}
              color={colors.white}
              onPress={() => navigation.goBack()}
            />
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.titleTop]}>{cropName}</Text>

              <View style={[styles.titleTag]}>
                <MaterialIcons name="star" size={20} color={colors.white} />
                <Text style={{ color: colors.white, marginHorizontal: 4 }}>
                  {growLevel}
                </Text>
              </View>
            </View>
            <View>
              <Input
                placeholder="Enter your variety name here"
                containerStyle={styles.searchInputContainer}
                inputStyle={{
                  marginTop: -10,
                  paddingRight: 10,
                  color: "red",
                }}
                onChangeText={(text) => setCropUserVariety(text)}
                isCenter={true}
                placeholderText="red"
              ></Input>
            </View>

            <View style={{ alignItems: "center", marginVertical: 15 }}>
              <Text style={{ color: colors.white, marginVertical: 4 }}>
                You can find this on your seed pack
              </Text>
              {cropUserVariety.length > 2 && (
                <Text style={{ fontWeight: "bold", color: colors.white }}>
                  What type is the variety you have chosen
                </Text>
              )}
            </View>

            <>
              {cropDetail?.crops?.map((crop) => {
                return (
                  crop?.variety &&
                  crop?.variety?.toLowerCase() !== "" && (
                    <GradientButton
                      key={crop?.id}
                      gradient={[colors.blueLigth, colors.blue]}
                      onPress={() => {
                        // setSearch(crop?.variety)
                        console.log({ xxxVariety: crop?.variety });
                        setCropVarietyType(crop?.variety);
                        manageCropContext?.actions?.updateCropToGrowDetails({
                          category: crop?.variety,
                          variety: crop?.variety,
                          cropVariety: cropUserVariety,
                          cropName,
                          // cropVariety: crop?.variety,
                          cropId: crop?.id,
                        });
                        handleGrowCrop(getCurrentDate(), crop?.id, "PENDING");
                        navigation.navigate("Success");
                      }}
                    >
                      {/* {console.log(crop,'from maping stuff')} */}
                      <View
                        style={{
                          alignItems: "center",
                          width: "100%",
                          paddingHorizontal: 20,
                        }}
                      >
                        <Text style={[styles.btnText]}>
                          {crop?.variety === "N/A" ? "Grow it" : crop?.variety}
                        </Text>
                      </View>
                    </GradientButton>
                  )
                );
              })}

              {cropDetail?.crops
                // ?.filter((crop) =>
                //   search === '' ? true : crop?.variety
                //     ?.toLowerCase()
                //     .includes(search?.toLowerCase())
                // )
                ?.map((crop) => {
                  (crop && crop?.variety === null) |
                    (crop && crop?.variety === "") &&
                    (tmpItem = (
                      <>
                        <GradientButton
                          gradient={[colors.blueLigth, colors.blue]}
                          onPress={() => {
                            handleGrowCrop(getCurrentDate, crop?.id, "Pending");
                            navigation.navigate("Success");
                            console.log({ yyyVariety: crop?.variety });
                            setCropVarietyType("");
                            manageCropContext?.actions?.updateCropToGrowDetails(
                              {
                                category: crop?.category,

                                // variety: crop?.variety,
                                cropVariety: cropUserVariety,
                                cropName,
                                cropId: crop?.id,
                              }
                            );
                          }}
                        >
                          <View
                            style={{
                              alignItems: "center",
                              width: "100%",
                              paddingHorizontal: 20,
                            }}
                          >
                            <Text style={[styles.btnText]}>Grow it</Text>
                          </View>
                        </GradientButton>
                      </>
                    ));
                })}

              <View>{tmpItem}</View>
            </>
          </LinearGradient>
        </View>

        <View style={{ alignItems: "center", marginVertical: 20 }}>
          {cropDetail?.crops?.map(
            (crop1, index1) =>
              Object.keys.recommendations &&
              sowTip.toLowerCase() !== "n/a" && (
                <>
                  <Text style={{ fontSize: 20 }}>Grow it Recommends</Text>
                  <Text style={{ width: "80%", textAlign: "center" }}>
                    {sowTip}
                  </Text>
                </>
              )
          )}
        </View>

        <View style={[styles.cropSection]}>
          {cropDetail?.crops?.map(
            (item) =>
              // Object.keys.recommendations && (favoriteCrops?.crops?.map((crop, index) => (
              item.recommendations &&
              item.recommendations.length !== 0 &&
              item.recommendations.map(
                (crop, index) =>
                  crop.recommendation !== 0 && (
                    <CropItem
                      route={route}
                      key={index}
                      crop={crop}
                      currentVariety={item.variety}
                      currentName={cropName}
                      currentCropId={item?.id}
                      manageCropContext={manageCropContext}
                    />
                  )
              )
          )}
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: "10%",
    paddingBottom: "10%",
    paddingHorizontal: 25,
  },
  titleTop: {
    fontSize: 42,
    color: colors.white,
    marginTop: 5,
    fontWeight: "100",
  },
  titleTag: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  searchForm: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  searchInputContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
    borderRadius: 50 / 2,
    width: "100%",
  },
  cropSection: {
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  cropCardContainer: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    borderRadius: 100 / 2,
    height: 70,
    paddingRight: 20,
    marginVertical: 6,
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
  cropAvatar: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  cropText: {
    marginLeft: 10,
  },
  cropName: {
    fontSize: 20,
  },
  btnText: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default CropSelection;
