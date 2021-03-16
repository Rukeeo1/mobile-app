import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import constants from '../../constants';
import { Input, Button, Header } from '../../components';

import growthLogo from '../../assets/growth_logo.png';


const { colors } = constants;

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
  });

  const {
    handleChange,
    handleBlur,
    values,
    isValid,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const valid =
        values.email === 'Testuser@tmail.com' && values.password === 'test01!';
      if (valid) {
        setTimeout(() => {
          navigation.navigate('Onboarding');
        }, 500);
      }
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header onIconPress={() => navigation.goBack()} />
      <Image source={growthLogo} style={styles.image} />
      <View style={styles.authContainer}>
        <Input
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelText}
          labelText='Email'
          value={values.email}
          onBlur={handleBlur('email')}
          onChangeText={handleChange('email')}
          placeholder='Enter your email'
          errorMessage={errors.email}
        />
        <Input
          containerStyle={styles.inputPasswordCont}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelText}
          labelText='Password'
          value={values.password}
          onBlur={handleBlur('password')}
          onChangeText={handleChange('password')}
          placeholder='Enter your password'
          secureTextEntry={true}
        />
        <View style={styles.forgottenPasswordRow}>
          <Text>Forgotten Password?</Text>
          <Button
            title='Sign up'
            onPress={() => navigation.navigate('Register')}
            coverStyle={{
              backgroundColor: colors.greenDeep,
              width: '30%',
            }}
            color={colors.white}
          />
        </View>
        <View>
          <Button
            title='Log In'
            onPress={handleSubmit}
            coverStyle={{
              backgroundColor: colors.greenDeep,
              marginTop: '8%',
            }}
            color={colors.white}
          />
          <Button
            title='Cancel'
            coverStyle={{
              backgroundColor: colors.greyDark,
              marginTop: '8%',
            }}
            color={colors.white}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    marginTop: '25%',
  },
  labelText: {
    color: constants.colors.blueLigth,
  },
  authContainer: {
    width: '80%',
    justifyContent: 'center',
    marginTop: '10%',
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
});

export default ManualAuth;
