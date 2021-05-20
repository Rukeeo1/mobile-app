import axios from 'axios'
import { CommonActions } from '@react-navigation/native'

import {
  SAVE_TOKEN,
  SAVE_USER,
  LOADING,
  GET_USER_DATA,
  REFRESHING,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_USER_GROW_LIST,
  GET_USER_POSTS,
  FETCHING_MORE,
  LOG_OUT,
} from '../types'
import { apiRequest, showApiError } from '../../config/api'
import { API_URL } from '../../constants'

export const signOut = () => ({
  type: LOG_OUT,
})

export const saveUser = (token, user) => (dispatch) => {
  dispatch({
    type: SAVE_TOKEN,
    payload: token,
  })

  dispatch({
    type: SAVE_USER,
    payload: user,
  })
}

export const login = (user, navigation) => (dispatch) => {
  const { email, password } = user

  dispatch({
    type: LOADING,
    payload: true,
  })

  apiRequest('/users/signin', 'post', { password, auth_id: email })
    .then(({ data }) => {
      dispatch(saveUser(data.token, { ...data.user }))
      // navigation.navigate('Onboarding')
      // navigation.navigate('Splash')

      navigation.dispatch(CommonActions.reset({
        index: 0,
        key: null,
        routes: [{
          name: 'Splash'
        }],
      }))
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(login(user, navigation)))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const register = (user, navigation) => (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  })

  apiRequest('/users/signup', 'post', {
    auth_id: user.email,
    auth_type: 'email',
    password: user.password,
    username: user.name,
    fullname: user.fullname,
    location: user.location,
    role: 0,
  })
    .then(({ data }) => {
      console.log('signup', data)
      dispatch(saveUser(data.data.token, { ...data.data }))
      // navigation.navigate('Splash')
      // navigation.navigate('Onboarding')

      navigation.dispatch(CommonActions.reset({
        index: 0,
        key: null,
        routes: [{
          name: 'Splash'
        }],
      }))
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(register(user, navigation)))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const updateAvatar = (userData, navigation) => (dispatch, getState) => {
  const { user, token } = getState().auth

  console.log('update avatar')

  const { profileImageUri: image } = userData
  const formData = new FormData()
  formData.append('profileImage', {
    name: image?.split('/').pop(),
    uri: image,
    type: 'image/*',
  })
  const url = `${API_URL}/users/${user?.id}/updateAvatar`

  dispatch({
    type: LOADING,
    payload: true,
  })

  axios
    .put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      console.log('update avatar', data)

      dispatch(updateProfile(userData, navigation))
    })
    .catch((err) => {  
      showApiError(err, true, () => dispatch(updateAvatar(image, navigation)))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const updateProfile = (userData, navigation) => (dispatch, getState) => {
  const { user } = getState().auth

  console.log('update profile')

  dispatch({
    type: LOADING,
    payload: true,
  })

  apiRequest(`/users/${user?.id}`, 'put', {
    biography: userData.bio,
    fullname: userData.name,
    location: userData.location,
  })
    .then(({ data }) => {

      dispatch({
        type: SAVE_USER,
        payload: { ...user, ...data },
      })

      // dispatch(getUserProfile(true))
      navigation.navigate('Main-Profile', {
        //this would be refactored later... when the sideBar component is refactored...
        indexOfItemToShow: 2,
      })
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(updateProfile(userData, navigation)))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const getUserProfile = (silent = false) => (dispatch, getState) => {
  const { user } = getState().auth

  if (!silent) dispatch({
    type: LOADING,
    payload: true,
  })

  apiRequest(`/users/${user?.id}`)
    .then(({ data }) => {
  

      dispatch({
        type: GET_USER_DATA,
        payload: data.details,
      })
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getUserProfile(silent)))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const getUserFollowing = (refreshing = false) => (dispatch, getState) => {
  const { user } = getState().auth

  dispatch({
    type: refreshing ? REFRESHING : LOADING,
    payload: true,
  })

  apiRequest(`/users/${user?.id}/following`)
    .then(({ data }) => {
      dispatch({
        type: GET_FOLLOWING,
        payload: data,
      })
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getUserFollowing(refreshing)))
    })
    .finally(() => {
      dispatch({
        type: refreshing ? REFRESHING : LOADING,
        payload: false,
      })
    })
}

export const getUserFollowers = (refreshing = false) => (dispatch, getState) => {
  const { user } = getState().auth

  dispatch({
    type: refreshing ? REFRESHING : LOADING,
    payload: true,
  })

  apiRequest(`/users/${user?.id}/followers`)
    .then(({ data }) => {
      dispatch({
        type: GET_FOLLOWERS,
        payload: data,
      })
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getUserFollowers(refreshing)))
    })
    .finally(() => {
      dispatch({
        type: refreshing ? REFRESHING : LOADING,
        payload: false,
      })
    })
}

export const getUserGrowList = () => (dispatch, getState) => {
  const { user } = getState().auth

  dispatch({
    type: REFRESHING,
    payload: true,
  })

  apiRequest(`/jobs/growlist?user_id=${user?.id}`)
    .then(({ data }) => {

      dispatch({
        type: GET_USER_GROW_LIST,
        payload: data.crops,
      })
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getUserGrowList()))
    })
    .finally(() => {
      dispatch({
        type: REFRESHING,
        payload: false,
      })
    })
}

export const getUserPosts = () => (dispatch, getState) => {
  const { user } = getState().auth

  dispatch({
    type: FETCHING_MORE,
    payload: true,
  })

  apiRequest(`/users/${user?.id}/posts`)
    .then(({ data }) => {

      dispatch({
        type: GET_USER_POSTS,
        payload: data.posts,
      })
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getUserPosts()))
    })
    .finally(() => {
      dispatch({
        type: FETCHING_MORE,
        payload: false,
      })
    })
}

export const deleteUserPosts = (postId, toast) => (dispatch, getState) => {
  const { posts = [] } = getState().auth
  const newPosts = posts.filter((post) => post?.id !== postId)

  dispatch({
    type: GET_USER_POSTS,
    payload: newPosts,
  })

  toast.show({
    text1: 'Post deleted successfully',
    position: 'bottom'
  });

  apiRequest(`/posts/${postId}`, 'delete')
    .then(({ data }) => console.log('delete post', data))
    .catch(({ err }) => console.log('delete post error', err?.response))
}
