import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import * as Yup from 'yup';

import { Header, Input, GradientButton as Button } from '../../components/';

import constants from '../../constants/';

const { colors } = constants;

const PostForm = ({ navigation }) => {
  const PostSchema = Yup.object().shape({
    post: Yup.string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(1000, 'Too Long!'),
    postImageUri: Yup.string().required('Required'),
  });
  const {
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    isValid,
    errors,
  } = useFormik({
    initialValues: {
      post: '',
      plantName: '',
      plantVariety: '',
      postImageUri: '',
      isPublic: false,
    },
    validationSchema: PostSchema,
  });

  const [post, setPost] = useState({
    post: '',
    plantName: '',
    plantVariety: '',
    postImageUri: '',
    isPublic: false,
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
      setPost((prevState) => ({
        ...prevState,
        postImageUri: result.uri,
      }));
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps='never'>
        <Header
          title='Post'
          onIconPress={() => navigation.goBack()}
          containerStyle={styles.headerStyle}
        />
        <View style={styles.postInput}>
          <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
            {post.postImageUri ? (
              <Image
                source={{ uri: post.postImageUri }}
                style={{ height: '100%', width: '100%' }}
              />
            ) : (
              <Ionicons
                name='ios-camera-outline'
                size={45}
                color={constants.colors.white}
              />
            )}
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Input
              placeholder='Write a journal entry…'
              onChangeText={handleChange('post')}
              value={values.post}
              numberOfLines={4}
              inputStyle={{ flexWrap: 'wrap' }}
              containerStyle={{ flexWrap: 'wrap' }}
              multiline
            />
          </View>
        </View>
        <View style={styles.postDetails}>
          <Input
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelText}
            labelText='Plant Name'
            value={values.plantName}
            onChangeText={handleChange('plantName')}
            placeholder='Plant Name e.g. Tomatoes '
          />
          <Input
            containerStyle={{ marginTop: 20 }}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelText}
            labelText='Plant variety'
            value={values.plantVariety}
            onChangeText={handleChange('plantVariety')}
            placeholder='Plant variety e.g. Sungold'
          />
        </View>
        <View style={styles.switchContainer}>
          <Text>Add to public profile</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.pink }}
            value={values.isPublic}
            onValueChange={(value) => setFieldValue('isPublic', value)}
          />
        </View>
        <View style={styles.footer}>
          {values.isPublic && values.post && (
            <Button
              title='Share'
              gradient={[colors.green, colors.greenDeep]}
              onPress={() => {}}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  postInput: {
    flexDirection: 'row',
    padding: 22,
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  imageWrapper: {
    backgroundColor: colors.grey100,
    height: 131,
    width: 131,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  postDetails: {
    padding: 22,
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  labelText: {
    color: constants.colors.blueLigth,
  },
  inputStyle: {
    marginTop: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 22,
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  footer: {
    padding: 22,
    // flex: 1,
    justifyContent: 'flex-end',
    marginTop: 'auto',
  },
});

export default PostForm;
