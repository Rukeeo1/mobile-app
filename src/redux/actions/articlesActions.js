import {
  FETCH_ARTICLES,
  FETCH_CATEGORIES,
  LOADING,
  REFRESHING,
  SELECT_ARTICLE,
} from "../types";
import { apiRequest, showApiError } from "../../config/api";

export const getCategories =
  (refreshing = false) =>
  (dispatch) => {
    dispatch({
      type: refreshing ? REFRESHING : LOADING,
      payload: true,
    });

    apiRequest("/articles/categories")
      .then(({ data }) => {
        console.log("categories", data);

        dispatch({
          type: FETCH_CATEGORIES,
          payload: data,
        });
      })
      .catch((err) => {
        showApiError(err, true, () => dispatch(getCategories(refreshing)));
      })
      .finally(() => {
        dispatch({
          type: refreshing ? REFRESHING : LOADING,
          payload: false,
        });
      });
  };

export const getArticles =
  (category, refreshing = false) =>
  (dispatch) => {
    dispatch({
      type: refreshing ? REFRESHING : LOADING,
      payload: true,
    });

    dispatch(selectArticle(category));

    apiRequest(`/articles/category/${category}/articles`)
      .then(({ data }) => {
        console.log("articles", data);

        dispatch({
          type: FETCH_ARTICLES,
          payload: {
            id: category,
            articles: data,
          },
        });
      })
      .catch((err) => {
        showApiError(err, true, () => dispatch(getArticles(refreshing)));
      })
      .finally(() => {
        dispatch({
          type: refreshing ? REFRESHING : LOADING,
          payload: false,
        });
      });
  };

export const selectArticle = (payload) => ({
  type: SELECT_ARTICLE,
  payload,
});
