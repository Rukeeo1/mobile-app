import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
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
