import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import constants from "../../constants";
import { useNavigation } from "@react-navigation/native";

const { colors } = constants;

export const EditableTitle = ({ cropToGrowDetails }) => {
  const navigation = useNavigation();
  const [cropDetails, setCropDetails] = useState({
    cropName: "<Crop>",
    category: "",
    variety: "'<Var >'",
    cropVariety: "",
    monthIndex: 0,
  });

  useEffect(() => {
    setCropDetails((prevState) => ({
      ...prevState,
      ...cropToGrowDetails,
    }));
  }, [cropToGrowDetails]);
  console.log(cropToGrowDetails, "from edit title");

  const handleChange = (itemName, text) => {
    setCropDetails((prevState) => ({
      ...prevState,
      [itemName]: text,
    }));
  };
  const gotoInputEdit = () => {
    navigation.navigate("Crops", {
      screen: "Crop-selection",
      params: {
        cropName: cropToGrowDetails?.cropName,
        cropId: cropToGrowDetails?.cropId,
        cropVariety: cropToGrowDetails.cropVariety,
      },
    });
  };
  return (
    <View>
      <View style={{ alignItems: "center", marginTop: "0%" }}>
        <View
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: 0,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: "6%",
          }}
        >
          <Text
            color={colors.white}
            fontType="light"
            style={{
              fontSize: 42,
              // height: 61,
              fontWeight: "200",
              maxWidth: "80%",
              color: colors.white,
            }}
          >
            {cropToGrowDetails?.cropName}
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: 0,
            justifyContent: "center",
            alignItems: "center",
            height: `${cropToGrowDetails?.cropVariety ? "auto" : "0%"}`,
            // marginHorizontal: '6%',
          }}
        >
          <Text
            color={colors.white}
            fontType="bold"
            style={{
              fontSize: 20,
              marginVertical: "2%",
              maxWidth: "100%",
              color: colors.white,
            }}
          >
            {cropToGrowDetails?.cropVariety}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: 0,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: "6%",
            marginBottom: 40,
            height: `${cropToGrowDetails?.variety ? "auto" : "0%"}`,
          }}
        >
          <Text
            color={colors.white}
            fontType="light"
            style={{
              fontSize: 20,
              fontWeight: "200",
              maxWidth: "80%",
              color: colors.white,
            }}
          >
            {cropToGrowDetails?.variety}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EditableTitle;
