import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import { Header, Input, GradientButton } from '../../components';

import constants from '../../constants';

const profileImage =
  'https://images0.westend61.de/0001391125pw/smiling-woman-touching-white-flowers-growing-in-farm-LVVF00015.jpg';

const Settings = ({ navigation }) => {
  const nameOfPerson = 'Garden_of_Riley';
  const [profile, setProfile] = useState({
    name: nameOfPerson,
    bio: '<User bio grow baby grow>',
    location: '🇬🇧 Buckinghamshire',
    profileImageUri: profileImage,
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView>
        <Header
          title='Profile Settings'
          onIconPress={() => navigation.goBack()}
        />
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: profile.profileImageUri }}
            style={styles.image}
          />
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
            secureTextEntry={true}
          />
          <GradientButton
            title='Save'
            gradient={[constants.colors.green, '#83B403']}
            coverStyle={styles.button}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colors.white,
  },
  profileImageContainer: {
    height: '50%',
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
