import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  ArticleNavigator, AuthNavigator,





  Crops, EndHarvestNavigator, GrowCropNavigator, OnboardingLayout,


  PostsNavigator, ProfileNavigator
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
      <Screen name='AuthNavigator' component={AuthNavigator} />
      <Screen name='Onboarding' component={OnboardingLayout} />
      <Screen name='Settings' component={ProfileNavigator} />
      <Screen name='Article' component={ArticleNavigator} />
      <Screen name='End-Harvest' component={EndHarvestNavigator} />
      <Screen name='Crops' component={Crops} />
      <Screen name='Grow-Crop' component={GrowCropNavigator} />
      <Screen name='Posts' component={PostsNavigator} />
    </Navigator>
  </NavigationContainer>
);

export default RootNavigator;
