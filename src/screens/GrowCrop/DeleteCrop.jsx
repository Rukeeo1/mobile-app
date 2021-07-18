import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { useManageCropContext } from '../../context/ManageCropsContext';
import { deleteJob } from '../../redux/actions';

import { GradientButton as Button } from '../../components';
import constants from '../../constants';

const { colors } = constants;

const DeleteCrop = ({ navigation }) => {
  const {
    data: { cropToGrowDetails, jobId },
    value,
  } = useManageCropContext();
  console.log({cropToGrowDetails})

  const { user } = useSelector((state) => ({
    user: state.auth.user,
  }));

  const userId = user.id;

  const dispatch = useDispatch();

  const [deletingJob, setDeletingJob] = useState(false);

  const onDelete = async () => {
    setDeletingJob(true);
    const error = await dispatch(
      deleteJob(cropToGrowDetails.jobId, userId, Toast)
    );
    if (!error) {
      navigation.navigate('Settings', {
        screen: 'Main-Profile',
        params: {
          indexOfItemToShow: 5,
        },
      });
    }
    setDeletingJob(false);
  };
  console.log(cropToGrowDetails.jobId, 'this is the jobId');

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <LinearGradient
      style={styles.container}
      colors={[colors.green, colors.greenDeep]}
    >
      <Text style={styles.title}>Delete Crop</Text>
      <Text style={styles.question}>Are you sure?</Text>
      <Text style={styles.warning}>
        You can’t undo this action. This will delete all private journal entries
        and remove this crop from your manage crop list completely.
      </Text>
      <Button
        title='Yes please, delete'
        coverStyle={{ marginTop: '10%' }}
        gradient={[colors.pink, colors.pinkDeep]}
        onPress={onDelete}
        loading={deletingJob}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.optOut}>No that was a mistake. Take me back!</Text>
      </TouchableOpacity>
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
export default DeleteCrop;
