import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CropCard from "./CropCard";
import DeleteCrop from "./DeleteCrop";
import KilledCrop from "./KilledCrop";

const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const GrowCropNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Crop-Card" component={CropCard} />
      <Screen name="Delete-Crop" component={DeleteCrop} />
      <Screen name="Killed-Crop" component={KilledCrop} />
    </Navigator>
  );
};

export default GrowCropNavigator;
