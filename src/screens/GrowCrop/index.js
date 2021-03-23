import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CropCard from './CropCard';
import DeleteCrop from './DeleteCrop';
import PostJournal from '../Posts/PostForm';

const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const ProfileNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='Post' component={PostJournal} />
      <Screen name='Delete-Crop' component={DeleteCrop} />
      <Screen name='Crop-Card' component={CropCard} />
    </Navigator>
  );
};

export default ProfileNavigator;
