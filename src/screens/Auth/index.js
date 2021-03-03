import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SocialAuthentication from './SocialAuth';
import ManualAuthentication from './ManualAuth';
import Register from './Register';

const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const AuthNavigator = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name='Login' component={SocialAuthentication} />
    <Screen name='ManualAuthentication' component={ManualAuthentication} />
    <Screen name='Register' component={Register} />
  </Navigator>
);

export default AuthNavigator;
