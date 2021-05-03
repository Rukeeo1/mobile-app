import React from 'react';
import { AsyncStorage } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  ArticleNavigator,
  AuthNavigator,
  Crops,
  EndHarvestNavigator,
  CropJournalNavigator,
  GrowCropNavigator,
  OnboardingLayout,
  PostsNavigator,
  ProfileNavigator,
  SplashScreen,
} from '../screens';
import Launch from './AuthLoading';

const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const RootNavigator = () => {
  const isAuthenticated = async () => {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');

    return !!token && !!user;
  };

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          // would extract screen options to a seperate file depending on how it grows
          headerShown: false,
          headerTransparent: true,
          headerTitle: false,
        }}
      >
        <Screen name='Launch' component={Launch} />
        <Screen name='AuthNavigator' component={AuthNavigator} />
        <Screen name='Onboarding' component={OnboardingLayout} />
        <Screen name='Crops' component={Crops} />
        <Screen name='Grow-Crop' component={GrowCropNavigator} />
        <Screen name='Crop-Journal' component={CropJournalNavigator} />
        <Screen name='End-Harvest' component={EndHarvestNavigator} />
        <Screen name='Splash' component={SplashScreen} />
        <Screen name='Settings' component={ProfileNavigator} />
        <Screen name='Article' component={ArticleNavigator} />
        <Screen name='Posts' component={PostsNavigator} />
      </Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
