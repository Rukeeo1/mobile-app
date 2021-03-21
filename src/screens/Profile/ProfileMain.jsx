import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Calendar from './AddToCalendar';
import Explore from './Explore';
import FirstView from './FirstView';
import ProfileSideTab from './ProfileSideTab';

import constants from '../../constants/index';

const { colors } = constants;

const Main = ({ currentIndex }) => {
  return (
    <View style={styles.main}>
      {currentIndex === 0 ? (
        <View />
      ) : currentIndex === 1 ? (
        <View>
          <Text>1</Text>
        </View>
      ) : currentIndex === 2 ? (
        <FirstView />
      ) : currentIndex === 3 ? (
        <Explore />
      ) : currentIndex === 4 ? (
        <Calendar />
      ) : null}
    </View>
  );
};

const MainProfile = ({ navigation }) => {
  const [activeGradient, setActiveGradient] = useState([
    colors.greenDeep,
    colors.green,
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0 }}
    >
      <LinearGradient style={styles.container} colors={activeGradient}>
        <View style={styles.mainContainer}>
          <Main currentIndex={currentIndex} />
          <ProfileSideTab
            navigation={navigation}
            setActiveGradient={setActiveGradient}
            activeGradient={activeGradient}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main: {
    backgroundColor: colors.white,
    width: '80%',
    overflow: 'hidden',
    flex: 1,
    borderTopRightRadius: 40,
  },
});

export default MainProfile;
