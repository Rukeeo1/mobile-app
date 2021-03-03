import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { OnboardingLayout, AuthNavigator, Settings } from '../screens';

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
      <Screen name='Settings' component={Settings} />
      <Screen name='Onboarding' component={OnboardingLayout} />
    </Navigator>
  </NavigationContainer>
);

export default RootNavigator;
