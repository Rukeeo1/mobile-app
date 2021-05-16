import { combineReducers } from 'redux';

import loading from './loadingReducer';
import auth from './authReducer';
import crops from './cropReducer';
import journal from './JournalReducer';

export default combineReducers({
  loading,
  auth,
  crops,
  journal,
});
