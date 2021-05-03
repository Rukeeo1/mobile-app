import { combineReducers } from 'redux';

import loading from './loadingReducer';
import auth from './authReducer';
import crops from './cropReducer';

export default combineReducers({
  loading,
  auth,
  crops,
});
