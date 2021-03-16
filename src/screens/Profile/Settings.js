import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Header, Input, GradientButton } from '../../components';

import constants from '../../constants';

const { colors } = constants;

const Settings = ({ navigation }) => {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    location: '',
    profileImageUri: '',
  });

  const ProfileSchema = Yup.object().shape({
    email: Yup.string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(1000, 'Too Long!'),
    bio: Yup.string()
      .required('Required')
      .min(3, 'Too Short!')
      .max(100, 'Too Long!'),
    location: Yup.string()
      .required('Required')
      .min(3, 'Too Short!')
      .max(10000, 'Too Long!'),
  });

  // to refactor argument to take object instead
  const handleChange = (name, text) => {
    setProfile((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  };

  const handleBlur = (name) => {
    if (!profile[name]) {
      handleChange(name, nameOfPerson);
    }
  };

  console.log(profile, 'RO: profile');
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setProfile((prevState) => ({
        ...prevState,
        profileImageUri: result.uri,
      }));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: '5%' }}>
        <Header
          title='Profile Settings'
          onIconPress={() => navigation.goBack()}
        />
        <View style={styles.profileImageContainer}>
          {profile.profileImageUri ? (
            <Image
              source={{ uri: profile.profileImageUri }}
              style={styles.image}
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                height: '100%',
                backgroundColor: colors.grey100,
              }}
            >
              <Ionicons
                name='ios-person-outline'
                size={45}
                color={colors.white}
              />
            </View>
          )}
          <TouchableOpacity style={styles.cameraContainer} onPress={pickImage}>
            <Ionicons
              name='ios-camera-outline'
              size={30}
              color={constants.colors.green}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profileDetails}>
          <Input
            value={profile.name}
            placeholder='Enter your name'
            onChangeText={(text) => handleChange('name', text)}
            onBlur={() => handleBlur('name')}
            labelText='Name'
            labelStyle={styles.labelText}
          />
          <Input
            value={profile.bio}
            placeholder='Enter your bio'
            onChangeText={(text) => handleChange('bio', text)}
            onBlur={() => handleBlur('bio')}
            labelText='Bio'
            labelStyle={styles.labelText}
            containerStyle={styles.input}
          />
          <Input
            value={profile.location}
            placeholder='Enter your Location'
            onChangeText={(text) => handleChange('location', text)}
            onBlur={() => handleBlur('location')}
            labelText='Location'
            labelStyle={styles.labelText}
            containerStyle={styles.input}
          />
          <GradientButton
            title='Save'
            gradient={[constants.colors.green, '#83B403']}
            coverStyle={styles.button}
            onPress={() => navigation.navigate('Main-Profile')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: constants.colors.white,
  },
  profileImageContainer: {
    height: '50%',
    backgroundColor: colors.grey100,
  },
  image: { height: '100%', width: '100%' },
  cameraContainer: {
    alignItems: 'center',
    backgroundColor: constants.colors.white,
    borderRadius: 30,
    bottom: -10,
    elevation: 3,
    height: 60,
    justifyContent: 'center',
    left: 20,
    position: 'absolute',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    width: 60,
  },
  profileDetails: {
    marginTop: '5%',
    paddingHorizontal: '5%',
  },
  labelText: {
    color: constants.colors.blueLigth,
  },
  input: {
    marginTop: '8%',
  },
  button: {
    marginTop: '10%',
  },
});

export default Settings;
