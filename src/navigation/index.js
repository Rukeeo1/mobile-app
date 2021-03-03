import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { default as React } from 'react';
import { OnboardingLayout } from '../screens';
import { Settings } from '../screens/Profile';
import AuthNavigator from '../screens/Auth/';

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
