import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { GradientButton as Button } from '../../components';
import constants from '../../constants';
import { Dimensions } from 'react-native';

const { colors } = constants;

const Logout = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={styles.container}
        colors={[colors.green, colors.greenDeep]}
      >
        <Text style={styles.title}>Logout</Text>
        <Text style={styles.question}>Are you sure?</Text>
        <Text style={styles.warning}>
          You can cancel this action. and try growing some crops, don't you think?.
        </Text>
        <Button
          title='Yes please, Log me out!'
          coverStyle={{ marginTop: '10%' }}
          gradient={[colors.pink, colors.pinkDeep]}
          onPress={() => navigation.navigate('Login')}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack('End-Harvest-Schedule')}
        >
          <Text style={styles.optOut}>
            No that was a mistake. Take me back!
          </Text>
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
  toolTip: {
    marginTop: '10%',
    backgroundColor: colors.white,
    borderRadius: 17,
    height: Dimensions.get('screen').height * 0.2,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  toolTipTitle: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.green,
    fontWeight: 'bold',
  },
  toolTipTitleContent: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: '5%',
    fontWeight: '200',
  },
});
export default Logout;
