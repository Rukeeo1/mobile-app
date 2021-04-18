import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import constants from '../../constants';

const { colors } = constants;

export const EditableTitle = () => {
  const [cropDetails, setCropDetails] = useState({
    cropName: '<Type if applicable>',
    variety: "'<Var >'",
  });

  const handleChange = (itemName, text) => {
    console.log(text);
    setCropDetails((prevState) => ({
      ...prevState,
      [itemName]: text,
    }));
  };
  return (
    <View>
      <View style={{ alignItems: 'center', marginTop: '5%' }}>
        <Text style={{ fontSize: 34, color: colors.white, fontWeight: '200' }}>
          <Text>{'<Crop >'}</Text>
        </Text>
        <TextInput
          color={colors.white}
          value={cropDetails.cropName}
          style={{
            fontSize: 24,
            fontWeight: '500',
            marginVertical: '2%',
            maxWidth: '80%',
          }}
          onChangeText={(text) => handleChange('cropName', text)}
          placeholder='helo'
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
