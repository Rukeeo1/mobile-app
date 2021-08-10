import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Following from "./Following";
import Followers from "./Followers";
import ProfileMain from "./ProfileMain";
import ProfileSettings from "./Settings";
import GrowItCalendar from "./AddToCalendar";
import Articles from "../Articles/ArticleGuide";
import ArticleContent from "../Articles/ArticleContent";
import UserDetails from "./UserDetails";
import Logout from "./Logout";
import SinglePost from "./SinglePost";
import Explore from "./Explore";

const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const ProfileNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Main-Profile" component={ProfileMain} />
      <Screen name="Explore" component={Explore} />
      <Screen name="Following" component={Following} />
      <Screen name="Followers" component={Followers} />
      <Screen name="GrowItCalendar" component={GrowItCalendar} />
      <Screen name="Article-guide" component={Articles} />
      <Screen name="ArticleContent" component={ArticleContent} />
      <Screen name="User-details" component={UserDetails} />
      <Screen name="Single-Post" component={SinglePost} />
      <Screen name="Profile-Settings" component={ProfileSettings} />
      <Screen name="Logout" component={Logout} />
    </Navigator>
  );
};

export default ProfileNavigator;
