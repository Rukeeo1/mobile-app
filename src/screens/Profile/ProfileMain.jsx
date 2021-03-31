
import React, { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Notification from '../Notification/Notification';
import Calendar from './AddToCalendar';
import Explore from './Explore';
import FirstView from './FirstView';
import ProfileSideTab from './ProfileSideTab';
import CreatePost from '../Posts/PostForm';
import ProfileBtmSheet from './ProfileBtmSheet';

import constants from '../../constants/index';

const { colors } = constants;

const Main = ({ currentIndex, defaultPostImage }) => {
  return (
    <View style={styles.main}>
      {currentIndex === 0 ? (
        <Notification />
      ) : currentIndex === 1 ? (
        <CreatePost
          defaultPostImage={defaultPostImage}
          currentIndex={currentIndex}
        />
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

const MainProfile = ({ navigation, route }) => {
  const [activeGradient, setActiveGradient] = useState([
    colors.greenDeep,
    colors.green,
  ]);

  const [defaultPostImage, setDefaultPostImage] = useState('');

  const [currentIndex, setCurrentIndex] = useState(0);

  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const { indexOfItemToShow } = route.params;

  //this sets the default sidebar item when comeing from another screen... we need to look for a way to clean it up...
  const handleNavigation = (destination) => {
    navigation.navigate(destination, {
      screen: 'posts-form',
      params: { indexToGoBackTo: currentIndex },
    });
  };

  const toggleBottomSheetVisibility = () =>
    setShowBottomSheet(!showBottomSheet);

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0 }}
    >
      <LinearGradient style={styles.container} colors={activeGradient}>
        <View style={styles.mainContainer}>
          <Main
            currentIndex={currentIndex}
            defaultPostImage={defaultPostImage}
          />
          <ProfileSideTab
            navigation={navigation}
            setActiveGradient={setActiveGradient}
            activeGradient={activeGradient}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            //indexofitemtoshow ==> should be refactored to take itemName instead
            indexOfItemToShow={indexOfItemToShow}
            navigation={navigation}
            setDefaultPostImage={setDefaultPostImage}
            currentIndex={currentIndex}
            handleNavigation={handleNavigation}
            onClickEllipse={toggleBottomSheetVisibility}

          />
        </View>
        <ProfileBtmSheet
          showBottomSheet={showBottomSheet}
          onClose={toggleBottomSheetVisibility}
        />
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
