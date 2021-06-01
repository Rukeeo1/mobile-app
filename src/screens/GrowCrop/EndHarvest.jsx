import React from 'react';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { GradientButton as Button } from '../../components';
import constants from '../../constants';

const { colors } = constants;

const EndHarvest = ({navigation}) => {
  return (
    // <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={styles.container}
        colors={[colors.green, colors.greenDeep]}
      >
        <Text style={styles.title}>End Harvest</Text>
        <Text style={styles.question}>Do you want to grow this again?</Text>

        <Button
          title='Yes please, delete'
          coverStyle={{ marginTop: '10%' }}
          gradient={[colors.pink, colors.pinkDeep]}
          onPress={() =>navigation.navigate('') }
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.optOut}>
            No that was a mistake. Take me back!
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  title: {
    marginTop: '45%',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  question: {
    marginTop: '10%',
    color: colors.white,
    fontSize: 30,
    fontWeight: '100',
    textAlign: 'center',
  },
  warning: {
    marginTop: '5%',
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
  optOut: {
    color: colors.white,
    marginTop: '10%',
    fontSize: 16,
  },
});
export default EndHarvest;
