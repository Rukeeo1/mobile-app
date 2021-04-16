import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native'
import growthLogo from '../../assets/growth_logo.png'
import { GradientButton, Input, Logo } from '../../components'
import constants from '../../constants'

export const Register = ({ navigation }) => {
  const [authDetails, setAuthDetails] = useState({
    email: '',
    name: '',
    bio: '',
    location: '',
    password: '',
  })

  const handleAuthDetails = (name, value) => {
    setAuthDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const submit = () => {}

  const { colors } = constants

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <SafeAreaView style={styles.safeH}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{ alignItems: 'center' }}>
            <Logo
              source={growthLogo}
              logoStyles={{
                marginTop: '20%',
                marginBottom: '10%',
                display: 'flex',
                justifyContent: 'center',
              }}
            />
          </View>

          <View style={styles.container}>
            <LinearGradient
              style={{
                width: '100%',
                paddingLeft: '5%',
                paddingRight: '5%',
                flex: 1,
                paddingTop: 50,
                height: Dimensions.get("window").height - (0.35*Dimensions.get("window").height),
              }}
              colors={[colors.blueLigth, colors.blue]}
            >
              <Input
                inputStyle={styles.input}
                labelStyle={styles.label}
                labelText="Email"
                value={authDetails.email}
                onChangeText={(text) => handleAuthDetails('email', text)}
                placeholder="Enter your email"
                placeholderTextColor="#fff"
              />
              <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                labelStyle={styles.label}
                labelText="Name"
                value={authDetails.name}
                onChangeText={(text) => handleAuthDetails('name', text)}
                placeholder="Enter your name"
                placeholderTextColor="#fff"
              />
              <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                labelStyle={styles.label}
                labelText="Location"
                value={authDetails.location}
                onChangeText={(text) => handleAuthDetails('location', text)}
                placeholder="Enter your location"
                placeholderTextColor="#fff"
              />
              <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                labelStyle={styles.label}
                labelText="Password"
                value={authDetails.password}
                onChangeText={(text) => handleAuthDetails('password', text)}
                placeholder="Enter your password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
              />

              <GradientButton
                gradient={[colors.green, colors.greenDeep]}
                coverStyle={{ marginBottom: 20, marginTop: 50 }}
                title={'Register'}
                onPress={() => navigation.navigate('Onboarding')}
              />
              <Text
                style={{ textAlign: 'center', color: 'white' }}
                onPress={() => navigation.navigate('ManualAuthentication')}
              >
                Already have an Account? Log in
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                  bottom: 42,
                  left: 0,
                  right: 0,
                  position: 'absolute',
                  fontFamily: 'Hero-New-Medium',
                  fontSize: 16,
                }}
                onPress={() => navigation.navigate("Login")}
              >
                Cancel
              </Text>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  parentContainer: {},
  safeH: {
    height: Dimensions.get("window").height,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constants.colors.white,
  },
  scrollView: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    flex: 1,
  },
  image: {
    marginTop: '25%',
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginTop: 10,
    marginLeft: 0,
    borderBottomColor: constants.colors.greyLight,
    paddingBottom: '2%',
    paddingLeft: 0,
    color: constants.colors.white,
    fontFamily: 'Hero-New-Light',
    fontSize: 16,
    letterSpacing: 0,

  },
  label: {
    color: constants.colors.white,
    fontFamily: 'Hero-New-Medium',
  },
  alignItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
    marginBottom: '5%',
  },
})

export default Register
