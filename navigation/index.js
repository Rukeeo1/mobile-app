// root navigation...
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Signup, Login } from '../screens';

/**
 * This is a sketch... would set up properly/refactor after having meetings on the design...
 */

const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const RootNavigator = () => (
  <NavigationContainer>
    <Navigator>
      <Screen name="Login" component={Login} />
      <Screen name="Signup" component={Signup} />
    </Navigator>
  </NavigationContainer>
);

export default RootNavigator;
