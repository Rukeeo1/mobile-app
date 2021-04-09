import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { GradientButton, Header, Input, SafeArea } from '../../components';
import constants from '../../constants';

const { colors } = constants;

const Settings = ({ navigation }) => {
  const ProfileSchema = Yup.object().shape({
    name: Yup.string()
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
    profileImageUri: Yup.string().required(),
  });

  const {
    handleChange,
    handleBlur,
    values,
    isValid,
    errors,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
      bio: '',
      location: '',
      profileImageUri: '',
    },

    validationSchema: ProfileSchema,
    onSubmit: (values) => {
      const { bio, location, name } = values;
      const user = {
        bio,
        location,
        name,
      };
      AsyncStorage.setItem('user', user);
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setFieldValue('profileImageUri', result.uri);
      handleBlur('profileImageUri');
    }
  };

  return (
    <SafeArea>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Header
          title='Profile Settings'
          onIconPress={() => navigation.goBack()}
        />
        <View style={styles.profileImageContainer}>
          {values.profileImageUri ? (
            <Image
              source={{ uri: values.profileImageUri }}
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
        <View style={{ paddingLeft: '25%' }}>
          <Text style={{ color: colors.red }}>{errors.profileImageUri}</Text>
        </View>

        <View style={styles.profileDetails}>
          <Input
            value={values.name}
            placeholder='Enter your name'
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            labelText='Name'
            labelStyle={styles.labelText}
            errorMessage={errors.name}
          />
          <Input
            value={values.bio}
            placeholder='Enter your bio'
            onChangeText={handleChange('bio')}
            onBlur={handleBlur('bio')}
            labelText='Bio'
            labelStyle={styles.labelText}
            containerStyle={styles.input}
            errorMessage={errors.bio}
          />
          <Input
            value={values.location}
            placeholder='Enter your Location'
            onChangeText={handleChange('location')}
            onBlur={handleBlur('location')}
            labelText='Location'
            labelStyle={styles.labelText}
            containerStyle={styles.input}
            errorMessage={errors.location}
          />
          <GradientButton
            title='Save'
            onPress={handleSubmit}
            gradient={[constants.colors.green, '#83B403']}
            coverStyle={styles.button}
            onPress={() =>
              navigation.navigate('Main-Profile', {
                //this would be refactored later... when the sideBar component is refactored...
                indexOfItemToShow: 2,
              })
            }
          />
        </View>
      </ScrollView>
    </SafeArea>
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
    height: Dimensions.get('screen').height * 0.4,
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
    marginTop: '6%',
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
