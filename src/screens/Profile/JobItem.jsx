import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../../components';

import constants from '../../constants';

const { colors, screenHeight, screenWidth } = constants;

//icons
import sowIcon from '../../assets/sow-it-pink.png';
// import completedIcon from '../../assets/completed-job-pink.png';
import jobIndicatorPink from '../../assets/job-indicator-pink.png';
import plantItPink from '../../assets/plant-it-pink.png';
import harvestIcon from '../../assets/harvest-icon-pink.png';

const getIcon = (jobType) => {
  switch (jobType) {
    case 'plant':
      return plantItPink;
    case 'water':
      return jobIndicatorPink;
    case 'harvest':
      return harvestIcon;

    default:
      return sowIcon;
  }
};

export const JobItem = ({ job }) => {
  // const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.jobs]}
      // onPress={() => navigation.navigate('Grow-Crop')}
    >
      <View style={[styles.jobsChild]}>
        <Image
          source={getIcon(job?.job_type)}
          resizeMode='contain'
          style={{ height: screenHeight * 0.06, width: screenWidth * 0.05 }}
        />
        <View style={styles.jobsText}>
          <Text>{job?.title}</Text>
          <Text fontType='bold' style={styles.boldText}>
            {new Date(job.job_date).toDateString()}
          </Text>
        </View>
      </View>

      <AntDesign name='right' size={24} color={colors.green} />
    </TouchableOpacity>
  );
};

export default JobItem;

const styles = StyleSheet.create({
  jobs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 50,
    height: 78,
    backgroundColor: colors.white,
    // shadow iOS
    shadowColor: 'grey',
    shadowOffset: {
      width: 0.5,
      height: 0.4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // shadow android
    elevation: 10,
  },
  jobsChild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: screenWidth * 0.04,
  },
  jobsText: {
    marginLeft: 15,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
