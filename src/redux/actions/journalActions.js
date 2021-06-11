import { GET_JOURNALS } from '../types';
import axios from 'axios'
import { apiRequest, showApiError } from '../../config/api';

import { API_URL } from '../../constants'

export const getJournals = (userId, pageNumber) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/users/${userId}/posts`);
    dispatch({
      type: GET_JOURNALS,
      payload: data,
    });
  } catch (error) {
    showApiError(error);
  }
};

export const addJournal = (newJournal, userInfo) => async (dispatch) => {

  console.log(userInfo?.token, 'new journal');
  try {

    const response = await axios
      .post(`${API_URL}/posts/newpost`, newJournal, {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      })


    // dispatch({
    //   type: ADD_JOURNAL,
    //   payload: data,
    // });
    // dispatch(getJournals(userId));
    return;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    console.log(error.response);
    showApiError(error);
    return error;
  }
};
