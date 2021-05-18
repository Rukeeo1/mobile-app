import { combineReducers } from 'redux';

import loading from './loadingReducer';
import auth from './authReducer';
import crops from './cropReducer';
import journal from './JournalReducer';
import posts from './postsReducer';
import jobs from './jobReducer';

export default combineReducers({
  loading,
  auth,
  crops,
  journal,
  posts,
  jobs,
});
