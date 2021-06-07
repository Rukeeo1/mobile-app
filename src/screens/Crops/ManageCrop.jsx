import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import ManageCropContext from '../../context/ManageCropsContext';

import { GradientButton, Text } from '../../components';
import { getUserJobs, getCurrentGrowing } from '../../redux/actions';

import constants from '../../constants';

const { colors } = constants;

const ManageCrops = () => {
  const navigation = useNavigation();

  const { jobs, userId } = useSelector(
    (state) => ({
      jobs: state.jobs?.usersJobs,
      userId: state.auth?.user?.id,
    }),
    shallowEqual
  );

  const manageCropContext = useContext(ManageCropContext);

  const dispatch = useDispatch();

  const [fetchingJobs, setFechingJobs] = useState(false);

  const getCurrentJobs = useCallback(async () => {
    setFechingJobs(true);
    if (userId) {
      // await dispatch(getUserJobs(userId));
      await dispatch(getCurrentGrowing(userId));
    }

    setFechingJobs(false);
  }, []);

  useEffect(() => {
    getCurrentJobs();
  }, [getCurrentJobs]);

  const handleNavigation = (path, details) => () => {
    navigation.navigate(path);

    manageCropContext?.actions?.updateCropToGrowDetails({
      cropName: details?.name,
      monthIndex: new Date(details?.job_date).getMonth(),
      variety: details?.variety,
      cropId: details?.crop_id,
      action: details?.job_type,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* <SafeAreaView> */}
      <ScrollView>
        <View style={[styles.titleContainer]}>
          <Text style={styles.title}>Manage Crops</Text>
        </View>

        <View style={{ paddingHorizontal: '5%' }}>
          <View style={[styles.growCalendarCard]}>
            {jobs?.jobs?.length < 1 && (
              <Text
                style={{
                  ...styles.growText,
                  ...{ paddingRight: 80, paddingLeft: 80, fontSize: 18 },
                }}
              >
                You aren’t growing anything yet!
              </Text>
            )}
            <Text
              style={{
                ...styles.growText,
                ...{ paddingRight: 70, paddingLeft: 70, fontSize: 18 },
              }}
            >
              Add a crop to your{' '}
              <Text fontType='bold' style={{ color: colors.green }}>
                Grow Calendar
              </Text>{' '}
              today
            </Text>

            <GradientButton
              gradient={[colors.green, colors.greenDeep]}
              onPress={() =>
                navigation.navigate('Main-Profile', {
                  //this would be refactored later... when the sideBar component is refactored...
                  indexOfItemToShow: 5,
                })
              }
            >
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 20,
                }}
              >
                <Text style={styles.btnText}>Go to Grow Calendar</Text>
                <Ionicons name='calendar' size={24} color={colors.white} />
              </View>
            </GradientButton>
          </View>
        </View>

        <View style={{ paddingHorizontal: '5%' }}>
          {fetchingJobs ? (
            <ActivityIndicator />
          ) : (
            <View>
              <Text style={styles.growingCrops}>
                {jobs?.jobs?.length > 0 ? 'Current growing' : null}
              </Text>
              {jobs?.jobs?.map((job) => {
                return job.job_type !== 'harvest' ? (
                  <PlantItem
                    job={job}
                    key={job.id}
                    onPress={handleNavigation('Grow-Crop', job)}
                  />
                ) : null;
              })}
            </View>
          )}
          <View>
            <Text style={styles.growingCrops}>
              {' '}
              {jobs?.jobs?.length > 0 ? 'Past Harvest' : null}
            </Text>
            {jobs?.jobs?.map((job) => {
              return job.job_type === 'harvest' ? (
                <PlantItem
                  job={job}
                  key={job.id}
                  onPress={handleNavigation('Grow-Crop', job)}
                />
              ) : null;
            })}
          </View>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </View>
  );
};

const PlantItem = ({ job, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.cropCardContainer}
      onPress={onPress}
    >
      <View style={[styles.cropDetails]}>
        <Image
          style={[styles.cropAvatar]}
          source={require('../../assets/avatarimg.png')}
        />
        <View style={[styles.cropText]}>
          <Text style={styles.cropName}>{job?.name}</Text>
          <Text>{job?.grow_level}</Text>
        </View>
      </View>
      <AntDesign name='right' size={24} color={colors.green} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 70,
    marginBottom: 30,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: '100',
  },
  growCalendarCard: {
    backgroundColor: colors.greenTransparent,
    borderRadius: 50 / 2,
    paddingTop: 30,
  },
  growingCrops: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cropCardContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '98%',
    borderRadius: 100 / 2,
    height: 70,
    paddingRight: 20,
    marginVertical: 10,
    // shadow iOS
    shadowColor: 'grey',
    shadowOffset: {
      width: 0.5,
      height: 0.4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // shadow android
    elevation: 15,
  },
  cropDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cropAvatar: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  cropText: {
    marginLeft: 10,
  },
  cropName: {
    fontSize: 20,
  },
  growText: {
    textAlign: 'center',
    color: colors.green,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  btnText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default ManageCrops;
