import React, { useEffect } from 'react'
import {
  AsyncStorage,
  ImageBackground,
  View,
} from 'react-native'
import { useDispatch } from 'react-redux'

import { saveUser } from '../redux/actions/authActions'
import Constants from '../constants'

const Launch = ({ navigation }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // AsyncStorage.clear()
    redirect()
  }, [])

  const redirect = async () => {
    try {
      const user = await AsyncStorage.getItem('user')
      const token = await AsyncStorage.getItem('token')

      if (token && user) {
        dispatch(saveUser(token, JSON.parse(user)))
        navigation.navigate('Splash')
      } else navigation.navigate('AuthNavigator')
    } catch (err) {
      console.log('launch error', err)
      navigation.navigate('AuthNavigator')
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/splash.gif')}
        resizeMode="contain"
        style={{ flex: 1, backgroundColor: Constants.colors.green }}
      />
    </View>
  )
}

export default Launch
