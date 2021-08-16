import React, {
  useEffect,
  useRef,
} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  AsyncStorage,
} from 'react-native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'

import RootNavigator from './src/navigation';

import { ManageCropProvider } from './src/context/ManageCropsContext';

import store from './src/redux';
import constants from './src/constants';

// import { initializeFirebase } from './src/config/';

// initializeFirebase();

const customFonts = {
  'Hero-New-Regular-Italic': require('./src/assets/fonts/Hero-New-Regular-Italic.otf'),
  'Hero-New-Regular': require('./src/assets/fonts/Hero-New-Regular.otf'),
  'Hero-New-Medium': require('./src/assets/fonts/Hero-New-Medium.otf'),
  'Hero-New-Light': require('./src/assets/fonts/Hero-New-Light.otf'),
  'Hero-New-Thin': require('./src/assets/fonts/Hero-New-Thin.otf'),
  'Hero-New-Light-Italic': require('./src/assets/fonts/Hero-New-Light-Italic.otf'),
  'Hero-New-Bold-Italic': require('./src/assets/fonts/Hero-New-Bold-Italic.otf'),
  'Hero-New-Bold': require('./src/assets/fonts/Hero-New-Bold.otf'),
  'Frame-Work-7': require('./src/assets/fonts/Framework-7-Icons-Regular.ttf'),
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      AsyncStorage.setItem('PushNotificationToken', token)
    }
    //  else {
    //   alert('Must use physical device for Push Notifications');
    // }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }

  return (
    fontsLoaded && (
      <Provider store={store}>
        <StatusBar
          backgroundColor={constants.colors.greenDeep}
          barStyle="light-content"
          animated
        />
        {Platform.OS === 'ios' && (
          <View
            style={{
              height: Constants.statusBarHeight,
              width: '100%',
              backgroundColor: constants.colors.greenDeep,
            }}
          />
        )}
        <ManageCropProvider>
          <View style={styles.container}>
            <RootNavigator />
          </View>
        </ManageCropProvider>
      </Provider>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
