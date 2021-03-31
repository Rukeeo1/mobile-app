import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CropCard from './CropCard';
import DeleteCrop from './DeleteCrop';
import EndHarvest from './EndHarvest';

const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const ProfileNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='End-Harvest' component={EndHarvest} />
      {/* <Screen name='Crop-Card' component={CropCard} /> */}
      {/* <Screen name='Delete-Crop' component={DeleteCrop} /> */}
    </Navigator>
  );
};

export default ProfileNavigator;
