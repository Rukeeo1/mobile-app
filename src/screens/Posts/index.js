import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostsForm from "./PostForm";

const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const PostsNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="posts-form" component={PostsForm} />
    </Navigator>
  );
};

export default PostsNavigator;
