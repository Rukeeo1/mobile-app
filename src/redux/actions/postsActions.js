import axios from 'axios'

import {
  FETCH_POSTS,
  LOADING,
  REFRESHING,
  SELECT_POST,
  GET_POST_USER,
} from '../types'
import { apiRequest, showApiError } from '../../config/api'
import { API_URL } from '../../constants'

export const getPosts = (refreshing = false) => (dispatch) => {
  dispatch({
    type: refreshing ? REFRESHING : LOADING,
    payload: true,
  })

  apiRequest('/posts/public')
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

export const getPostUser = (userId) => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  })

  try {
    // get user posts
    const userPosts = (await apiRequest(`/users/${userId}/posts`)).data
    console.log({ userPosts })

    // get user growlist
    const userGrowList = (await apiRequest(`/jobs/growlist?user_id=${userId}`)).data
    console.log({ userGrowList })

    // get user data
    const userData = (await apiRequest(`/users/${userId}`)).data
    console.log({ userData })

    dispatch({
      type: GET_POST_USER,
      payload: {
        posts: userPosts?.posts,
        growitList: userGrowList?.crops,
        data: userData?.user?.[0],
      }
    })
  } catch (err) {
    showApiError(err, true, () => dispatch(getPosts(refreshing)))
  } finally {
    dispatch({
      type: LOADING,
      payload: false,
    })
  }
}
