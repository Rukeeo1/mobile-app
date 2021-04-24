import {
 SAVE_TOKEN,
 SAVE_USER,
 LOADING,
 
} from '../types'
import { apiRequest, showApiError } from '../../config/api'

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
    username: user.username,
    fullname: user.fullname,
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
