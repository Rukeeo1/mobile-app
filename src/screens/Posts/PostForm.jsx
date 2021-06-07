import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
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
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFormik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import RBSheet from 'react-native-raw-bottom-sheet'
import Autocomplete from 'react-native-autocomplete-input'

import { getCropVarieties, getCrops, addCrop2 } from '../../redux/actions/cropActions'
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
    validationSchema: PostSchema,
    // enableReinitialize: true,
  });

  const [post, setPost] = useState({
    post: '',
    plantName: '',
    plantVariety: '',
    postImageUri: '',
    isPublic: false,
  })
  const [crop, setCrop] = useState(null)
  const [selectModal, setSelectModal] = useState(false)
  const [selecting, setSelecting] = useState(null)
  const [isSelecting, setIsSelecting] = useState(false)

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

  const rbSheet = useRef()

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
    data.append('variety', values.plantVariety)
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
    <View
      style={{ flex: 1 }}
    >
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
              // numberOfLines={4}
              // inputStyle={{ flexWrap: 'wrap' }}
              containerStyle={{ flex: 1 }}
              multiline
            />
          </View>
        </View>
        <View style={styles.postDetails}>
          <Text style={{
            ...styles.labelText,
            fontSize: 18,
            fontWeight: '600',
          }}>
            Plant Name
            </Text>
          <Autocomplete
            // editable={!isLoading}
            autoCorrect={false}
            data={[...(crops?.crops?.filter((crop) => crop?.name?.toLowerCase()?.includes(values?.plantName?.toLowerCase())) ?? []), `Add ${values.plantName} as a new crop`]}
            value={values.plantName}
            onChangeText={handleChange('plantName')}
            placeholder={"Enter Plant Name"}
            hideResults={!isSelecting}
            style={{
              ...styles.inputStyle,
              fontSize: 18,
              color: constants.colors.black,
              fontWeight: '300',
              // paddingHorizontal: 8,
              paddingBottom: 3,
              borderWidth: 0,
            }}
            onFocus={() => setIsSelecting(true)}
            // onBlur={() => {
            //   setIsSelecting(false)
            //   // if (!crop) alert('blur')
            //   // else alert('blur blur')
            // }}
            inputContainerStyle={{ borderWidth: 0 }}
            flatListProps={{
              keyboardShouldPersistTaps: 'always',
              keyExtractor: (item) => item.id,
              renderItem: ({ item }) => (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                  onPress={() => {
                    if (item?.name) {
                      setCrop(item)
                      setFieldValue('plantName', item?.name)
                    } else {
                      dispatch(addCrop2(item, setCrop))
                    }

                    setIsSelecting(false)
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{item?.name ?? item}</Text>
                </TouchableOpacity>
              ),
            }}
            
          />
          {/* <TouchableOpacity
            style={styles.select}
            onPress={() => {
              setSelecting('crop')
              // setSelectModal(true)
              rbSheet.current?.open()
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
              {post.plantName === null ? 'Plant Name e.g Tomatoes' : (
                <>
                  {post.plantName?.name}
                  {' '}
                  {post.plantName?.variety && post.plantName?.variety !== 'N/A' && `(${post.plantName?.variety})`}
                </>
              )}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={{ ...styles.select, marginTop: 10 }}
            onPress={() => {
              setSelecting('variety')
              // setSelectModal(true)
              rbSheet.current?.open()
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
          </TouchableOpacity> */}
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
          /> */}
          <Input
            containerStyle={{ marginTop: 20 }}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelText}
            labelText='Plant variety'
            value={values.plantVariety}
            onChangeText={handleChange('plantVariety')}
            placeholder='Plant variety e.g. Sungold'
          />
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
        </View>
      </ScrollView>
      <RBSheet
        ref={rbSheet}
        height={Dimensions.get('window').height * 0.6}
        duration={500}
        dragFromTopOnly
        closeOnDragDown
        customStyles={{
          container: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
          draggableIcon: {
            width: 50,
            height: 5,
            borderRadius: 100,
            backgroundColor: '#0005',
          },
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
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
                    rbSheet.current?.close()
                    // dispatch(getCropVarieties(crop?.name))
                  }}
                  style={{
                    paddingVertical: 7,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>
                    {crop?.name}
                    {' '}
                    {crop?.variety && crop?.variety !== 'N/A' && `(${crop?.variety})`}
                  </Text>
                </TouchableOpacity>
              )
            })}
            {selecting === 'variety' && cropDetail?.crops?.map((crop) => {
              return (
                <TouchableOpacity
                  key={crop.id}
                  onPress={() => {
                    setPost({ ...post, plantVariety: crop })
                    rbSheet.current?.close()
                  }}
                  style={{
                    paddingVertical: 7,
                  }}
                >
                  <Text style={{ fontSize: 18 }} >{crop.variety}</Text>
                </TouchableOpacity>
              )
            })}
            <View style={{ height: 20 }} />
          </ScrollView>
          <View style={{ paddingHorizontal: 20 }}>
            <Button
              title='Dismiss'
              gradient={[colors.green, colors.greenDeep]}
              //the "settings title for this would be refactored to profile"
              // onPress={() => goBack()}
              onPress={() => rbSheet.current?.close()}
            />
          </View>
        </SafeAreaView>
      </RBSheet>
    </View>
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
    paddingVertical: 22,
    marginTop: 10,
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
