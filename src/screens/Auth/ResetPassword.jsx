import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import growthLogo from '../../assets/growth_logo.png'
import { GradientButton, Input, Logo } from '../../components'
import constants from '../../constants'

export const ResetPassword = ({ navigation }) => {
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
      <SafeAreaView>
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
                paddingBottom: 30,
                paddingTop: 50,
              }}
              colors={[colors.blueLigth, colors.blue]}
            >
              <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                labelStyle={styles.label}
                labelText="Old Password"
                value={authDetails.password}
                onChangeText={(text) => handleAuthDetails('password', text)}
                placeholder="Enter your password"
                secureTextEntry={true}
              />
              <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                labelStyle={styles.label}
                labelText="New Password"
                value={authDetails.password}
                onChangeText={(text) => handleAuthDetails('password', text)}
                placeholder="Enter your password"
                secureTextEntry={true}
              />

              <GradientButton
                gradient={[colors.green, colors.greenDeep]}
                coverStyle={{ marginBottom: 20, marginTop: 50 }}
                title={'Reset now'}
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
                  marginTop: '30%',
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
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constants.colors.white,
  },
  scrollView: {
    width: '100%',
    alignSelf: 'center',
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
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
    borderBottomColor: constants.colors.greyLight,
    paddingBottom: '2%',
    color: constants.colors.white,
  },
  label: {
    color: constants.colors.white,
  },
  alignItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
})

export default ResetPassword
