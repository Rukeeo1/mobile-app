import axios from 'axios'

import {
  SAVE_TOKEN,
  SAVE_USER,
  LOADING,
  GET_USER_DATA,
  REFRESHING,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_USER_GROW_LIST,
} from '../types'
import { apiRequest, showApiError } from '../../config/api'
import { API_URL } from '../../constants'

export const signOut = () => ({
  type: SIGN_OUT,
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
      console.log('login', data)

      dispatch(saveUser(data.token, { ...data.user }))
      navigation.navigate('Onboarding')
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
      console.log('register', data)

      dispatch(saveUser(data.data.token, { ...data.data }))
      navigation.navigate('Onboarding')
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

  const { profileImageUri: image } = userData
  const formData = new FormData()
  formData.append('profileImage', {
    name: image?.split('/').pop(),
    uri: image,
    type: 'image/*',
  })
  const url = `${API_URL}/users/${user?.id}/updateAvatar`
  console.log(url)

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
      console.log('upload avatar', data)
      dispatch(updateProfile(userData, navigation))
    })
    .catch((err) => {
      console.log('api', err.response ?? err)
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
      console.log('update profile', data)

      dispatch({
        type: SAVE_USER,
        payload: { ...user, ...data },
      })

      dispatch(getUserProfile(null, true))
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
      console.log('user profile', data)

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
      console.log('user following', data)

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
      console.log('user followers', data)

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
      console.log('user growlist', data)

      // dispatch({
      //   type: GET_USER_GROW_LIST,
      //   payload: data,
      // })
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
