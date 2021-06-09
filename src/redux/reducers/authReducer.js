import { AsyncStorage } from 'react-native'
import {
  SAVE_TOKEN,
  SAVE_USER,
  LOG_OUT,
  GET_USER_DATA,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_USER_GROW_LIST,
  GET_USER_POSTS,
  SET_FORGOT_PASSWORD_DATA,
  RESET_FORGOT_PASSWORD_DATA,
} from '../types';

const initialState = {
  user: null,
  token: null,
  userData: null,
  followers: null,
  following: null,
  growList: null,
  posts: null,
  forgotPassword: {
    email: '',
    otpToken: '',
  }
};

const loadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_TOKEN:
      AsyncStorage.setItem('token', payload)

      return {
        ...state,
        token:  payload,
      }
    case SAVE_USER:
      AsyncStorage.setItem('user', JSON.stringify(payload))

      return {
        ...state,
        user: payload,
      }
    case LOG_OUT:
      AsyncStorage.multiRemove(['token', 'user'])

      return {
        user: null,
        token: null,
        userData: null,
      }
    case GET_USER_DATA:
      return {
        ...state,
        userData: payload,
      }
    case GET_FOLLOWERS:
      return {
        ...state,
        followers: payload
      }
    case GET_FOLLOWING:
      return {
        ...state,
        following: payload
      }
    case GET_USER_GROW_LIST:
      return {
        ...state,
        growList: payload
      }
    case GET_USER_POSTS:
      return {
        ...state,
        posts: payload
      }
    case RESET_FORGOT_PASSWORD_DATA:
      return {
        ...state,
        forgotPassword: {
          email: '',
          otpToken: '',
        }
      }
    case SET_FORGOT_PASSWORD_DATA:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          ...payload,
        }
      }
    default:
      return state;
  }
};

export default loadingReducer;
