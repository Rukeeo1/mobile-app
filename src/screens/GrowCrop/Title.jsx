import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

import constants from '../../constants';
import {useNavigation} from "@react-navigation/native";

const { colors } = constants;

export const EditableTitle = ({ cropToGrowDetails }) => {
    const navigation = useNavigation();
  const [cropDetails, setCropDetails] = useState({
    cropName: '<Crop>',
    category: '',
    variety: "'<Var >'",
    monthIndex: 0,
  });

  useEffect(() => {
    setCropDetails((prevState) => ({
      ...prevState,
      ...cropToGrowDetails,
    }));
  }, [cropToGrowDetails]);
  console.log(cropToGrowDetails,'from edit title')

  const handleChange = (itemName, text) => {
    setCropDetails((prevState) => ({
      ...prevState,
      [itemName]: text,
    }));
  };
  const gotoInputEdit = () => {
      navigation.navigate('Crops', {
          screen: 'Crop-selection',
          params: {
              cropName: cropToGrowDetails?.cropName,
              cropId: cropToGrowDetails?.cropId,
              cropVariety: cropToGrowDetails.cropVariety,
          },
      });
  }
  return (
    <View>
      <View style={{ alignItems: 'center', marginTop: '5%' }}>
          {/*<TextInput*/}
          {/*    color={colors.white}*/}
          {/*    value={cropToGrowDetails.cropName}*/}
          {/*    onChangeText={() => gotoInputEdit()}*/}
          {/*    style={{*/}
          {/*        fontSize: 28,*/}
          {/*        fontWeight: '200',*/}
          {/*        maxWidth: '80%',*/}
          {/*    }}*/}
          {/*/>*/}
          <TouchableOpacity onPress={() => gotoInputEdit()}>
              <Text
                  color={colors.white}  style={{
                  fontSize: 28,
                  fontWeight: '200',
                  maxWidth: '80%',
                  color: colors.white
              }}>
                  {cropToGrowDetails?.cropName}
              </Text>
          </TouchableOpacity>

        {/*<TextInput*/}
        {/*  color={colors.white}*/}
        {/*  value={cropToGrowDetails.cropVariety}*/}
        {/*  style={{*/}
        {/*    fontSize: 24,*/}
        {/*    fontWeight: '500',*/}
        {/*    marginVertical: '2%',*/}
        {/*    maxWidth: '80%',*/}
        {/*  }}*/}
        {/*  // onChangeText={(text) => handleChange('cropVariety', text)}*/}
        {/*  onChangeText={() => gotoInputEdit()}*/}
        {/*/>*/}
          <TouchableOpacity onPress={() => gotoInputEdit()}>
             <View>
                 <Text
                     color={colors.white}  style={{
                     fontSize: 24,
                     fontWeight: '500',
                     marginVertical: '2%',
                     maxWidth: '100%', color: colors.white
                 }}>
                     {cropToGrowDetails?.cropVariety}
                 </Text>
             </View>
          </TouchableOpacity>
        {/*<TextInput*/}
        {/*  color={colors.white}*/}
        {/*  value={cropToGrowDetails.variety}*/}
        {/*  style={{ fontSize: 24, fontWeight: '200', maxWidth: '80%' }}*/}
        {/*  // onChangeText={(text) => handleChange('variety', text)}*/}
        {/*  onC={() => gotoInputEdit()}*/}
        {/*/>*/}
          <TouchableOpacity onPress={() => gotoInputEdit()}>
              <Text
                  color={colors.white} style={{ fontSize: 24, fontWeight: '200', maxWidth: '80%', color: colors.white }}>
                  {cropToGrowDetails?.variety}
              </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EditableTitle;
