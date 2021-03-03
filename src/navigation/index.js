import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Settings } from '../screens/Profile';
import AuthNavigator from '../screens/Auth/';

/**
 * This is a sketch... would set up properly/refactor after having meetings on the design...
 */

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
    </Navigator>
  </NavigationContainer>
);

export default RootNavigator;

{
  /* <Screen name='Login' component={Login} /> */
}
