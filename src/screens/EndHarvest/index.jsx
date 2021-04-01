import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EndHarvestWarning from './EndHarvestWarning';
import EndHarvestConfirmation from './EndHarvestConfirmation';
import EndHarvestSchedule from './EndHarvestSchedule';

const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const EndHarvestNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='End-Harvest' component={EndHarvestWarning} />
      <Screen name='End-Harvest-Confirmation' component={EndHarvestConfirmation} />
      <Screen name='End-Harvest-Schedule' component={EndHarvestSchedule} />
    </Navigator>
  );
};

export default EndHarvestNavigator;
