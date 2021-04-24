import { combineReducers } from 'redux';

import loading from './loadingReducer';
import auth from './authReducer'

export default combineReducers({
  loading,
  auth,
});
