import React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { GradientButton as Button, Text } from '../../components';
import { GrowCropCalender } from '../GrowCrop/GrowCropCalendar';

import constants from '../../constants';

const { colors } = constants;

const EndHarvestConfirmation = ({ navigation }) => {
  const handleNavigation = (destination, params) => () => {
    navigation.navigate(destination, params);
  };

  return (
    // <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={styles.container}
        colors={[colors.green, colors.greenDeep]}
      >
        <Text style={styles.title} fontType='bold'>
          End Harvest
        </Text>
        <Text style={styles.question} fontType='thin'>
          Do you want to grow this again?
        </Text>
       
        <Button
          title='YES!'
          coverStyle={{ marginTop: '10%' }}
          gradient={[colors.pink, colors.pinkDeep]}
          onPress={handleNavigation('End-Harvest-Schedule')}
        />
        <TouchableOpacity
          onPress={handleNavigation('Settings', {
            screen: 'Main-Profile',
            params: {
              indexOfItemToShow: 5,
            },
          })}
        >
          <Text style={styles.optOut} fontType='bold'>
            No thanks
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
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
export default EndHarvestConfirmation;
