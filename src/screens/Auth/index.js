import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SocialAuthentication from './SocialAuth';
import ManualAuthentication from './ManualAuth';
import Register from './Register';
import ForgotPassword from "./ForgotPassword";
import ResetPassword from './ResetPassword';
import ValidateOTP from './ValidateOTP';

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
    <Screen name='Forgot-password' component={ForgotPassword} />
    <Screen name='Reset-password' component={ResetPassword} />
    <Screen name='ValidateOTP' component={ValidateOTP} />
  </Navigator>
);

export default AuthNavigator;
