import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

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

const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const RootNavigator = () => (
  <NavigationContainer>
    <Navigator
      screenOptions={{
        // would extract screen options to a seperate file depending on how it grows
        headerShown: false,
      }}
    >
      {/* <Screen name='AuthNavigator' component={AuthNavigator} />
      <Screen name='Onboarding' component={OnboardingLayout} /> */}
      <Screen name='Grow-Crop' component={GrowCropNavigator} />
      <Screen name='Crop-Journal' component={CropJournalNavigator} />
      <Screen name='End-Harvest' component={EndHarvestNavigator} />
      <Screen name='Splash' component={SplashScreen} />
      <Screen name='Settings' component={ProfileNavigator} />

      <Screen name='Article' component={ArticleNavigator} />
      <Screen name='Posts' component={PostsNavigator} />
      <Screen name='Crops' component={Crops} />
    </Navigator>
  </NavigationContainer>
);

export default RootNavigator;
