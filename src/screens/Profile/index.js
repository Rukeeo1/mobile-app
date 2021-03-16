import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Following from './Following';
import ProfileMain from './ProfileMain';
import ProfileSettings from './Settings';


const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const ProfileNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='Profile-Settings' component={ProfileSettings} />
      <Screen name='Main-Profile' component={ProfileMain} />
      <Screen name='Following' component={Following} />
    </Navigator>
  );
};

export default ProfileNavigator;
