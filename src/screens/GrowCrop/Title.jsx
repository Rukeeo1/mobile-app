import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import constants from '../../constants';

const { colors } = constants;

export const EditableTitle = ({ cropToGrowDetails }) => {
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

  const handleChange = (itemName, text) => {
    setCropDetails((prevState) => ({
      ...prevState,
      [itemName]: text,
    }));
  };
  return (
    <View>
      <View style={{ alignItems: 'center', marginTop: '5%' }}>
        <TextInput
          color={colors.white}
          value={cropDetails.cropName}
          onChangeText={(text) => handleChange('cropName', text)}
          style={{
            fontSize: 28,
            fontWeight: '200',
            maxWidth: '80%',
          }}
        />
        <TextInput
          color={colors.white}
          value={cropDetails.category}
          style={{
            fontSize: 24,
            fontWeight: '500',
            marginVertical: '2%',
            maxWidth: '80%',
          }}
          onChangeText={(text) => handleChange('category', text)}
        />
        <TextInput
          color={colors.white}
          value={cropDetails.variety}
          style={{ fontSize: 24, fontWeight: '200', maxWidth: '80%' }}
          onChangeText={(text) => handleChange('variety', text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EditableTitle;
