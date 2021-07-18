import {GET_JOURNALS, LOADING} from '../types';
import axios from 'axios'
import { apiRequest, showApiError } from '../../config/api';

import { API_URL } from '../../constants'
import {getPosts} from "./postsActions";

export const getJournals = (crop_id) => async (dispatch) => {
  try {
    // const { data } = await apiRequest(`/users/${userId}/posts`);
    const { data } = await apiRequest(`/journals/crop_id=${crop_id}`);
    dispatch({
      type: GET_JOURNALS,
      payload: data,
    });
  } catch (error) {
    showApiError(error);
  }
};

export const addJournal = (newJournal, userInfo) => (dispatch) => {

  // console.log(userInfo?.token, 'new journal');


    fetch(`${API_URL}/posts/newpost`, {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: newJournal
    })
        .then(({ data }) => {
            // console.log('add post', data)

            dispatch(getPosts(true))
        })
        .catch((err) => {
            // showApiError(err, true, () => dispatch(addPost(formData)))
            // console.log('add post error', err?.response ?? err.message)
        })
        .finally(() => {
            dispatch({
                type: LOADING,
                payload: false,
            })
        })
  // try {
  //
  //   const response = await axios
  //     .post(`${API_URL}/posts/newpost`, newJournal, {
  //       headers: {
  //         Authorization: `Bearer ${userInfo?.token}`,
  //       },
  //     })
  //
  //
  //   // dispatch({
  //   //   type: ADD_JOURNAL,
  //   //   payload: data,
  //   // });
  //   // dispatch(getJournals(userId));
  //   return;
  // } catch (error) {
  //   console.log(error);
  //   console.log(error.message);
  //   console.log(error.response);
  //   showApiError(error);
  //   return error;
  // }
};
