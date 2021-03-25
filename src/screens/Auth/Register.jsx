import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Button, Header, Input, Logo } from '../../components';

import growthLogo from '../../assets/growth_logo.png';

import constants from '../../constants';

export const Register = ({ navigation }) => {
  const [authDetails, setAuthDetails] = useState({
    email: '',
    name: '',
    bio: '',
    location: '',
    password: '',
  });

  const handleAuthDetails = (name, value) => {
    setAuthDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = () => {};

  const { colors } = constants;

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
      <Header onIconPress={() => navigation.goBack()} />
      <Logo
        source={growthLogo}
        logoStyles={{ marginTop: '10%', marginBottom: '10%' }}
      />
        <View style={styles.container}>
          <Input
            inputStyle={styles.input}
            labelStyle={styles.label}
            labelText='Email'
            value={authDetails.email}
            onChangeText={(text) => handleAuthDetails('email', text)}
            placeholder='Enter your email'
          />
          <Input
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            labelStyle={styles.label}
            labelText='Name'
            value={authDetails.name}
            onChangeText={(text) => handleAuthDetails('password', text)}
            placeholder='Enter your name'
            secureTextEntry={true}
          />
          <Input
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            labelStyle={styles.label}
            labelText='Bio'
            value={authDetails.bio}
            onChangeText={(text) => handleAuthDetails('password', text)}
            placeholder='Enter your bio'
            secureTextEntry={true}
          />
          <Input
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            labelStyle={styles.label}
            labelText='Location'
            value={authDetails.location}
            onChangeText={(text) => handleAuthDetails('password', text)}
            placeholder='Enter your location'
            secureTextEntry={true}
          />
          <Input
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            labelStyle={styles.label}
            labelText='Password'
            value={authDetails.password}
            onChangeText={(text) => handleAuthDetails('password', text)}
            placeholder='Enter your password'
            secureTextEntry={true}
          />

          <View style={styles.alignItem}>
            <Text>Already have an Account?</Text>
            <Button
              title='Log In'
              onPress={() => navigation.navigate('ManualAuthentication')}
              coverStyle={{
                backgroundColor: colors.greenDeep,
                marginTop: '8%',
                width: '20%',
              }}
              color={colors.white}
            />
          </View>
          <Button
            title='Sign Up'
            onPress={() => console.log('joejoe')}
            coverStyle={{
              backgroundColor: colors.greenDeep,
              marginTop: '8%',
            }}
            color={colors.white}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constants.colors.white,
    paddingBottom: 50,
  },
  scrollView: {
    height: '20%',
    width: '100%',
    margin: 5,
    alignSelf: 'center',
    padding: 5,
  },
  container: {
    width: '100%',
    paddingHorizontal:'5%'
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
  },
  label: {
    color: constants.colors.blueLigth,
  },
  alignItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
});

export default Register;
