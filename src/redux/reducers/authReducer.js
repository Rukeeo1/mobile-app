import { AsyncStorage } from 'react-native'
import {
  SAVE_TOKEN,
  SAVE_USER,
  LOG_OUT,
} from '../types';

const initialState = {
  user: null,
  token: null,
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
      }
    default:
      return state;
  }
};

export default loadingReducer;
