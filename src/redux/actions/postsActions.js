import axios from 'axios'

import {
  FETCH_POSTS,
  LOADING,
  REFRESHING,
  SELECT_POST,
} from '../types'
import { apiRequest, showApiError } from '../../config/api'
import { API_URL } from '../../constants'

export const getPosts = (refreshing = false) => (dispatch) => {
  dispatch({
    type: refreshing ? REFRESHING : LOADING,
    payload: true,
  })

  apiRequest('/posts/allposts')
    .then(({ data }) => {
      console.log(data)

      dispatch({
        type: FETCH_POSTS,
        payload: data
      })
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getPosts(refreshing)))
    })
    .finally(() => {
      dispatch({
        type: refreshing ? REFRESHING : LOADING,
        payload: false,
      })
    })
}

export const addPost = (formData) => (dispatch, getState) => {
  const { token } = getState().auth
  console.log(formData)

  dispatch({
    type: LOADING,
    payload: true,
  })

  axios
    .post(`${API_URL}/posts/newpost`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      console.log('add post', data)

      dispatch(getPosts(true))
    })
    .catch((err) => {
      // showApiError(err, true, () => dispatch(addPost(formData)))
      console.log('add post error', err?.response ?? err.message)
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const selectPost = (payload) => ({
  type: SELECT_POST,
  payload,
})
