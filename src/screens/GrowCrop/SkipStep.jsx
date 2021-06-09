import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '../../components';

import constants from '../../constants';

const { colors, monthsAbr } = constants;

export const SkipStep = ({ tip, onSkip }) => {
  return (
    <View style={styles.skipStep}>
      <View style={{width: '50%'}}>
        <Text>{tip}</Text>
      </View>
      <TouchableOpacity onPress={onSkip}>
        <Text style={styles.skipText}>Skip step ></Text>
      </TouchableOpacity>
    </View>
  );
};

export default SkipStep;

const styles = StyleSheet.create({
  skipStep: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
    zIndex: 232,
    backgroundColor: colors.white,
  },
  skipText: { color: colors.pink, fontWeight: 'bold' },
});
