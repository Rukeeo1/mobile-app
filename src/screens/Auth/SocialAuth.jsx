import * as Facebook from 'expo-facebook'
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import growthLogo from '../../assets/growth_logo.png'
import { Button, Logo, SmallGradientButton } from '../../components'
import { firebaseConfig } from '../../config/firebase'
import constants from '../../constants'




const { colors } = constants

export const Login = ({ navigation }) => {
  const FacebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: firebaseConfig.appId,
      })

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      })
      if (type === 'success') {
        navigation.navigate('Settings')
      }
    } catch ({ response, message }) {
      console.log(response?.data, message)
    }
  }
  const authButtons = [
    {
      title: 'Sign in with Apple',
      coverStyle: styles.appleButton,
      onPress: () => alert('Apple sign in was clicked'),
    },
    {
      title: 'Sign in with Facebook',
      coverStyle: styles.faceBookButton,
      onPress: () => FacebookLogin(),
    },
    {
      title: 'Sign in with Google',
      coverStyle: styles.googleButton,
      onPress: () => {},
    },
  ]
  return (
    <View style={styles.container}>
      <Logo source={growthLogo} />
      <View style={styles.buttonsContainer}>
        {authButtons.map((button, index) => (
            
          <TouchableOpacity 
          key={index} 
          onPress={button.onPress} 
          style={{ ...styles.genericBtnStyles,  ...button.coverStyle}}>
              <Text style={{fontSize:18, color: 'white', fontFamily: 'Hero-New-Regular'}}>{button.title}</Text>
          </TouchableOpacity>
                      
        ))}

        <SmallGradientButton
          gradient={[colors.green, colors.greenDeep]}
          coverStyle={{}}
          title={'Sign in with Email'}
          onPress={() => navigation.navigate('ManualAuthentication')}
        />
      </View>
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
