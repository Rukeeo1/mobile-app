import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ArticleView from './ArticleViews';

const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const Article = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='Article' component={ArticleView} />
    </Navigator>
  );
};

export default Article;
