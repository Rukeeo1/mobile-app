import {
  FETCH_ARTICLES,
  LOADING,
  REFRESHING,
  SELECT_ARTICLE,
} from '../types'
import { apiRequest, showApiError } from '../../config/api'

export const getArticles = (refreshing = false) => (dispatch) => {
  dispatch({
    type: refreshing ? REFRESHING : LOADING,
    payload: true,
  })

  apiRequest('/articles/all')
    .then(({ data }) => {
      // console.log('articles', data)

      dispatch({
        type: FETCH_ARTICLES,
        payload: data
      })
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getArticles(refreshing)))
    })
    .finally(() => {
      dispatch({
        type: refreshing ? REFRESHING : LOADING,
        payload: false,
      })
    })
}

export const selectArticle = (payload) => ({
  type: SELECT_ARTICLE,
  payload,
})
