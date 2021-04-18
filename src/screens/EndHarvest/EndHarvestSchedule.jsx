import React from 'react';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { GradientButton as Button } from '../../components';
import { GrowCropCalender } from '../GrowCrop/GrowCropCalendar';

import constants from '../../constants';

const { colors } = constants;

const EndHarvestSchedule = ({ navigation }) => {
  const handleNavigation = (destination, params) => () => {
    navigation.navigate(destination, params);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={styles.container}
        colors={[colors.green, colors.greenDeep]}
      >
        <Text style={styles.title}>End Harvest</Text>
        <Text style={styles.question}>
          Let’s get it scheduled in the grow calendar?
        </Text>
        <Text style={styles.suggest}>
          Suggested date is predicted from this harvest
        </Text>
        <GrowCropCalender
          activeItemsContainerStyle={{ top: '80%' }}
          calenderWrapperStyle={{ width: '95%' }}
          textColor={colors.white}
        />

        <Button
          title='Schedule it'
          coverStyle={{ marginTop: '10%' }}
          gradient={[colors.pink, colors.pinkDeep]}
          onPress={handleNavigation('Settings', {
            screen: 'Main-Profile',
            params: {
              indexOfItemToShow: 5,
            },
          })}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Grow-Crop')}>
          <Text style={styles.optOut}>Later</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
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
  suggest: {
    fontSize: 16,
    marginTop: '5%',
    color: colors.white,
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
export default EndHarvestSchedule;
