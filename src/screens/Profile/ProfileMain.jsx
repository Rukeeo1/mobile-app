import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import constants from '../../constants/index';
import ManageCrops from '../Crops/ManageCrop';
import Notification from '../Notification/Notification';
import CreatePost from '../Posts/PostForm';
import Calendar from './AddToCalendar';
import Explore from './Explore';
import FirstView from './FirstView';
import ProfileBtmSheet from './ProfileBtmSheet';
import ProfileSideTab from './ProfileSideTab';

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
        <ManageCrops />
      ) : currentIndex === 5 ? (
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
     const { indexOfItemToShow } = route?.params || 3;

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
    <View
      style={{ flex: 1 }}
      // style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0 }}
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
            indexOfItemToShow={route?.params ? indexOfItemToShow : 3}
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
    </View>
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
