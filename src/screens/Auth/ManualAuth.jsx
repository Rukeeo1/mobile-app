import { LinearGradient } from 'expo-linear-gradient'
import { useFormik } from 'formik'
import React from 'react'
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import * as Yup from 'yup'
import growthLogo from '../../assets/growth_logo.png'
import { GradientButton, Header, Input, Logo } from '../../components'
import constants from '../../constants'

const { colors } = constants

const ManualAuth = ({ navigation }) => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is not valid')
      .required('Required')
      .min(2, 'Too Short!')
      .max(1000, 'Too Long!'),
    password: Yup.string()
      .required('Required')
      .min(6, 'Too Short!')
      .max(100, 'Too Long!'),
  })

  const { handleChange, handleBlur, values, errors, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: LoginSchema,
    onSubmit: (values) => {
      // const valid =
      // values.email === 'Testuser@tmail.com' && values.password === 'test01!';
      // if (valid) {
      // setTimeout(() => {
      navigation.navigate('Onboarding')
      // }, 500);
      // }
    },
  })

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Header onIconPress={() => navigation.goBack()} />
          <Logo
            source={growthLogo}
            logoStyles={{ marginTop: '10%', marginBottom: '10%' }}
          />
          <View style={styles.authContainer}>
            <Input
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelText}
              labelText="Email"
              value={values.email}
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              placeholder="Enter your email"
              errorMessage={errors.email}
            />
            <Input
              containerStyle={styles.inputPasswordCont}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelText}
              labelText="Password"
              value={values.password}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              placeholder="Enter your password"
              secureTextEntry={true}
            />

            <View style={{ marginTop: 25 }}>
              <GradientButton
                gradient={[colors.green, colors.greenDeep]}
                coverStyle={{}}
                title={'Log in'}
                onPress={handleSubmit}
              />
              <Text style={{ textAlign: 'center', marginTop: 25 }}>
                Forgotten Password?
              </Text>
            </View>
          </View>

          <View
            style={[
              {
                width: '100%',
                marginTop: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: 'hidden',
              },
            ]}
          >
            <LinearGradient
              style={{
                width: '100%',
                height: 305,
                paddingLeft: '8%',
                paddingRight: '8%',
              }}
              colors={[colors.blueLigth, colors.blue]}
            >
              <Text
                style={{
                  color: colors.white,
                  textAlign: 'center',
                  marginTop: 40,
                  marginBottom: 10,
                }}
              >
                Not got an account?
              </Text>
              <GradientButton
                gradient={[colors.green, colors.greenDeep]}
                coverStyle={{ marginBottom: 20 }}
                title={'Register'}
                onPress={() => navigation.navigate('Register')}
              />

              <Text
                style={{
                  position: 'absolute',
                  bottom: 40,
                  left: 0,
                  right: 0,
                  color: colors.white,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
                onPress={() => navigation.goBack()}
              >
                Cancel
              </Text>
            </LinearGradient>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingBottom: '5%',
  },
  scrollContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    marginTop: '10%',
  },
  labelText: {
    color: constants.colors.blueLigth,
  },
  authContainer: {
    width: '85%',
    justifyContent: 'center',
    marginTop: '5%',
  },
  inputPasswordCont: {
    marginTop: '10%',
  },
  forgottenPasswordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  inputStyle: {
    borderBottomWidth: 1,
    marginTop: 10,
    borderBottomColor: constants.colors.greyLight,
    paddingBottom: '2%',
  },
})

export default ManualAuth
