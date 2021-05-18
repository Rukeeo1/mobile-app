import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Modal,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFormik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'

import { getCropVarieties, getCrops } from '../../redux/actions/cropActions'
import { addPost } from '../../redux/actions/postsActions'

import { GradientButton as Button, Header, Input } from '../../components/';
import constants from '../../constants/';

const { colors } = constants;

const PostForm = ({
  navigation,
  route,
  defaultPostImage = '',
  currentIndex,
}) => {
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
    postImageUri,
  } = useFormik({
    initialValues: {
      post: '',
      plantName: '',
      plantVariety: '',
      postImageUri: defaultPostImage || '',
      isPublic: false,
    },
    // validationSchema: PostSchema,
    // enableReinitialize: true,
  });

  const [post, setPost] = useState({
    post: '',
    plantName: null,
    plantVariety: null,
    postImageUri: '',
    isPublic: false,
  });

  const [selectModal, setSelectModal] = useState(false)
  const [selecting, setSelecting] = useState(null)

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
        postImageUri: result?.uri,
      }));
      // setFieldValue('postImageUri', result?.uri);
    }
  };

  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.loading)
  const { crops, cropDetail } = useSelector((state) => state.crops)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getCrops())
  }, [])

  useEffect(() => {
    if (defaultPostImage) {
      setFieldValue('postImageUri', defaultPostImage);
      setPost((prevState) => ({
        ...prevState,
        postImageUri: defaultPostImage,
      }));
    }
    // pickImage();
  }, [defaultPostImage, currentIndex]);

  const goBack = () => {
    navigation.navigate('Settings', {
      screen: 'Main-Profile',
      params: {
        indexOfItemToShow: 3,
      },
    });
  };

  const submit = () => {
    const data = new FormData()

    data.append('title', values.post)
    data.append('content', values.post)
    data.append('post_type', post.isPublic ? 'public' : 'private')
    data.append('crop_id', post.plantName?.id)
    data.append('user_id', user?.id)
    data.append('thumbnail_url', {
      name: post.postImageUri?.split('/').pop(),
      uri: post.postImageUri,
      type: 'image/*',
    })
    data.append('media_url', {
      name: post.postImageUri?.split('/').pop(),
      uri: post.postImageUri,
      type: 'image/*',
    })

    dispatch(addPost(data))
    // navigation.goBack()
    goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps='never'>
        <Header
          title='Post'
          onIconPress={() => goBack()}
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
          <TouchableOpacity
            style={styles.select}
            onPress={() => {
              setSelecting('crop')
              setSelectModal(true)
            }}
          >
            <Text style={{
              ...styles.labelText,
              fontSize: 18,
              fontWeight: '600',
            }}>
              Plant Name
            </Text>
            <Text style={{
              fontSize: 18,
              color: constants.colors.greyDark,
              fontWeight: '300',
              marginVertical: 5
            }}>
              {post.plantName === null ? 'Plant Name e.g Tomatoes' : post.plantName?.name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.select, marginTop: 10 }}
            onPress={() => {
              setSelecting('variety')
              setSelectModal(true)
            }}
          >
            <Text style={{
              ...styles.labelText,
              fontSize: 18,
              fontWeight: '600',
            }}>
              Plant Variety
            </Text>
            <Text style={{
              fontSize: 18,
              color: constants.colors.greyDark,
              fontWeight: '300',
              marginVertical: 5
            }}>
              {post.plantVariety === null ? 'Plant variety' : post.plantVariety?.variety}
            </Text>
          </TouchableOpacity>
          {/* <Input
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelText}
            labelText='Plant Name'
            value={values.plantName}
            onChangeText={handleChange('plantName')}
            // onBlur={() => dispatch(getCropVarieties(values.plantName))}
            onFocus={() => {
              setSelecting('crop')
              setSelectModal(true)
            }}
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
          /> */}
        </View>
        <View style={styles.switchContainer}>
          <Text>Add to public profile</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.pink }}
            value={post.isPublic}
            onValueChange={(value) => {
              setPost((prevState) => ({
                ...prevState,
                isPublic: value,
              }));
            }}
          />
        </View>
        <View style={styles.footer}>
          <Button
            title='Share'
            gradient={[colors.green, colors.greenDeep]}
            //the "settings title for this would be refactored to profile"
            // onPress={() => goBack()}
            onPress={submit}
          />
        </View>
      </ScrollView>
      <Modal
        visible={selectModal}
        animationType="fade"
        onDismiss={() => setSelectModal(false)}
        onRequestClose={() => setSelectModal(false)}
        transparent
      >
        <View style={{
          flex: 1,
          backgroundColor: '#0005',
          padding: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 16,
            height: '75%',
          }}>
            <ScrollView
              refreshControl={(
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => null}
                  colors={[constants.colors.green]}
                  tintColor={constants.colors.green}
                />
              )}
              style={{ padding: 20 }}
            >
              {selecting === 'crop' && crops?.crops?.map((crop) => {
                return (
                  <TouchableOpacity
                    key={crop.id}
                    onPress={() => {
                      setPost({ ...post, plantName: crop })
                      setSelectModal(false)
                      dispatch(getCropVarieties(crop?.name))
                    }}
                    style={{
                      paddingVertical: 5,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{crop.name}</Text>
                  </TouchableOpacity>
                )
              })}
              {selecting === 'variety' && cropDetail?.crops?.map((crop) => {
                return (
                  <TouchableOpacity
                    key={crop.id}
                    onPress={() => {
                      setPost({ ...post, plantVariety: crop })
                      setSelectModal(false)
                    }}
                    style={{
                      paddingVertical: 5,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{crop.variety}</Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
            <TouchableOpacity
              style={{ alignItems: 'center', paddingVertical: 15 }}
              onPress={() => setSelectModal(false)}
            >
              <Text style={{ color: 'red', fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'flex-end',
    marginTop: 'auto',
  },
});

export default PostForm;
