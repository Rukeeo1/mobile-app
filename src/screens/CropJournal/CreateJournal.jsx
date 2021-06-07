import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import {
  Header,
  Input,
  GradientButton as Button,
  SafeArea,
} from '../../components/';

import ManageCropContext from '../../context/ManageCropsContext';

import { addJournal } from '../../redux/actions';

import constants from '../../constants/';

const { colors } = constants;

const CreateJournal = ({ navigation }) => {
  const dispatch = useDispatch();

  const manageCropContext = useContext(ManageCropContext);
  const { cropToGrowDetails } = manageCropContext?.data;
  const { user, journal } = useSelector((state) => ({
    user: state?.auth.user,
    journal: state?.journal?.journals,
  }));

  const [addingJournal, setAddingJournal] = useState(false);

  const createJournalSchema = Yup.object().shape({
    content: Yup.string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(1000, 'Too Long!'),
  });

  const {
    handleChange,
    handleBlur,
    values,
    isValid,
    errors,
    setFieldValue,
    handleSubmit,
    dirty,
    touched,
  } = useFormik({
    initialValues: {
      content: '',
      user_id: user?.id,
      crop_id: cropToGrowDetails?.cropId,
      post_type: 'private', //public
      isPublic: false,
      journalImageUri: '',
      isCoverImage: false,
    },

    validationSchema: createJournalSchema,
    onSubmit: async (data) => {
      console.log(data)
      
      const { user_id, crop_id, isPublic, content, journalImageUri } = data;

      const journalFormData = new FormData();
      journalFormData.append('user_id', user_id);
      journalFormData.append('crop_id', crop_id);
      journalFormData.append('post_type', isPublic ? 'public' : 'private');
      journalFormData.append('content', content);
      journalFormData.append('thumbnail_url', {
        name: journalImageUri?.split('/').pop(),
        uri: journalImageUri,
        type: 'image/*',
      });
      journalFormData.append('media_url', {
        name: journalImageUri?.split('/').pop(),
        uri: journalImageUri,
        type: 'image/*',
      });

      setAddingJournal(true);
      await dispatch(addJournal(journalFormData, user));
      setAddingJournal(false);
    },

    enableReinitialize: true,
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
      setFieldValue('journalImageUri', result?.uri);
    }
  };
  const disableForm = !isValid || !values.content || !values.journalImageUri;

  return (
    <SafeArea>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ justifyContent: 'space-between' }}
      >
        <Header
          title='Journal entry'
          onIconPress={() => navigation.goBack()}
          containerStyle={styles.headerStyle}
        />
        <View style={styles.postInput}>
          <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
            {values.journalImageUri ? (
              <Image
                source={{ uri: values.journalImageUri }}
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
          <View style={{ flex: 1, height: 150 }}>
            <Input
              placeholder='Write a journal entry…'
              onChangeText={handleChange('content')}
              value={values.content}
              // numberOfLines={4}
              inputStyle={{ flex: 1 }}
              containerStyle={{ flex: 1 }}
              multiline
            />
          </View>
        </View>
        <View style={styles.switchContainer}>
          <Text style={{ fontSize: 16 }}>Add to public profile</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.pink }}
            value={values.isPublic}
            onValueChange={(value) => setFieldValue('isPublic', value)}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={{ fontSize: 16 }}>Make crop cover image</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.pink }}
            value={values.isCoverImage}
            onValueChange={(value) => setFieldValue('isCoverImage', value)}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title='Share'
          gradient={
            disableForm
              ? [colors.grey, colors.grey]
              : [colors.green, colors.greenDeep]
          }
          loading={addingJournal}
          onPress={handleSubmit}
        />
      </View>
    </SafeArea>
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
    justifyContent: 'flex-end',
    marginBottom: '5%',
  },
});

export default CreateJournal;
