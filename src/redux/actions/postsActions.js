import {
  FETCH_POSTS,
  LOADING,
  REFRESHING,
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
