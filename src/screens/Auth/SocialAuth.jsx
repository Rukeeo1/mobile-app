import * as Facebook from 'expo-facebook'
import * as GoogleSignIn from 'expo-google-sign-in'
import * as AppleAuthentication from 'expo-apple-authentication'
import React, { useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import growthLogo from '../../assets/growth_logo.png'
import { Button, Logo, SmallGradientButton } from '../../components'
import { firebaseConfig } from '../../config/firebase'
import constants from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { socialAuth } from '../../redux/actions/authActions'

const { colors } = constants

export const Login = ({ navigation }) => {
  useEffect(() => {
    initGoogleAsync()
  }, [])

  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.loading)

  const getRand = () => {
    return Math.floor(100000 + Math.random() * 900000);
  }

  const FacebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: firebaseConfig.appId,
      })

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      })

      if (type === 'success') {
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=name,email`)
          .then(response => response.json())
          .then(response => {
            const { name: full_name, email } = response
            const username = `${email.split('@')[0]}-${getRand()}`
            dispatch(socialAuth({
              auth_id: email,
              full_name,
              username,
            }, navigation))
          })
      }
    } catch ({ response, message }) {
      console.log(response?.data, message)
    }
  }

  const initGoogleAsync = async () => {
    await GoogleSignIn.initAsync();
  }

  const GoogleSignin = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();

      if (type === 'success') {
        const { email, firstName, lastName } = user
        const username = `${email.split('@')[0]}-${getRand()}`
        dispatch(socialAuth({
          auth_id: email,
          full_name: `${firstName} ${lastName}`,
          username,
        }, navigation))
      } else {
        alert(type)
      }
    } catch ({ message }) {
      let errorMessage = 'An error occurred. Please try again later'
      if (message === GoogleSignIn.ERRORS.SIGN_IN_NETWORK_ERROR
        || message === 'GoogleSignIn.null: NETWORK_ERROR') {
        errorMessage = 'Network error occured. Please check your internt connection and try again';
      }
      Alert.alert(
        '',
        errorMessage,
        [{ text: 'Dismiss' }],
      )
    }
  }

  const AppleSignin = async () => {
    try {
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      console.log('apple', appleCredential)
      const { email, fullName } = appleCredential
      const username = `${email.split('@')[0]}-${getRand()}`
      dispatch(socialAuth({
        auth_id: email,
        full_name: `${fullName.givenName} ${fullName.familyName}`,
        username,
      }, navigation))
    } catch (err) {
      console.log(err)
      if (err.code !== 'ERR_CANCELED') {
        Alert.alert(
          '',
          'Something went wrong. Please try again later',
          [{ text: 'Dismiss' }],
        )
      }
    }
  }

  const authButtons = [
    Platform.OS === 'ios' && {
      title: 'Sign in with Apple',
      coverStyle: styles.appleButton,
      onPress: () => AppleSignin(),
    },
    {
      title: 'Sign in with Facebook',
      coverStyle: styles.faceBookButton,
      onPress: () => FacebookLogin(),
    },
    {
      title: 'Sign in with Google',
      coverStyle: styles.googleButton,
      onPress: () => GoogleSignin(),
    },
  ]
  return (
    <View style={styles.container}>
      <Logo source={growthLogo} />
      <View style={styles.buttonsContainer}>
        {authButtons.map((button, index) => (
          button && (
            <TouchableOpacity
              key={index}
              onPress={button?.onPress}
              style={{ ...styles.genericBtnStyles, ...button?.coverStyle }}>
              <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Hero-New-Regular' }}>{button?.title}</Text>
            </TouchableOpacity>
          )
        ))}

        <SmallGradientButton
          gradient={[colors.green, colors.greenDeep]}
          coverStyle={{}}
          title={'Sign in with Email'}
          onPress={() => navigation.navigate('ManualAuthentication')}
        />
      </View>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            animating
            color={colors.green}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    position: 'relative'
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 100,
    backgroundColor: '#fff5',
  },
  buttonsContainer: {
    width: '80%',
    alignItems: 'center',
  },
  genericBtnStyles: {
    borderRadius: 50,
    width: '100%',
    height: 50,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

  },
  appleButton: {
    color: '#ffffff',
    backgroundColor: 'black',
  },
  faceBookButton: {
    backgroundColor: '#3C5998',
  },
  googleButton: {
    backgroundColor: '#4285F5',
  },
  email: {
    backgroundColor: '#9B9B9B',
  },
})

export default Login
