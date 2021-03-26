import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Search from "./CropSearch"
import CropSelection from "./CropSelection"
import ManageCrop from "./ManageCrop"
import NewCrop from "./NewCrop"

const Stack = createStackNavigator()

const { Navigator, Screen } = Stack

const Crops = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Crop-search" component={Search} />
      <Screen name="Crop-selection" component={CropSelection} />
      <Screen name="Manage-crop" component={ManageCrop} />
      <Screen name="New-crop" component={NewCrop} />
    </Navigator>
  )
}

export default Crops;