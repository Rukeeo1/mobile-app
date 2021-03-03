import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import constants from '../../constants';
import { Input, Button, GradientButton, Header } from '../../components';

import growthLogo from '../../assets/growth_logo.png';

const ManualAuth = ({ navigation }) => {
  const [authDetails, setAuthDetails] = useState({
    email: '',
    password: '',
  });
  const { colors } = constants;

  const handleAuthDetails = (name, value) => {
    setAuthDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onIconPress={() => navigation.goBack()} />
      <Image source={growthLogo} style={styles.image} />
      <View style={styles.authContainer}>
        <Input
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelText}
          labelText='Email'
          value={authDetails.email}
          onChangeText={(text) => handleAuthDetails('email', text)}
          placeholder='Enter your email'
        />
        <Input
          containerStyle={styles.inputPasswordCont}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelText}
          labelText='Password'
          value={authDetails.password}
          onChangeText={(text) => handleAuthDetails('password', text)}
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
    borderBottomColor: constants.colors.greyLight,
    paddingBottom: '2%',
  },
});

export default ManualAuth;
