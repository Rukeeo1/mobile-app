import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CropJournalList from './CropJournalLists';
import CreateJournal from './CreateJournal'

const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const CropJournalNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='Crop-Journal' component={CropJournalList} />
      <Screen name='Create-Journal' component={CreateJournal} />
    </Navigator>
  );
};

export default CropJournalNavigator;
