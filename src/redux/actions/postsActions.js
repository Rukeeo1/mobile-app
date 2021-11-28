import axios from "axios";
import { Alert } from "react-native";

import {
  FETCH_POSTS,
  LOADING,
  REFRESHING,
  SELECT_POST,
  GET_POST_USER,
  GET_USER_POSTS,
} from "../types";
import { apiRequest, showApiError } from "../../config/api";
import { API_URL } from "../../constants";
import { getUserPosts } from "./authActions";

export const getPosts =
  (refreshing = false) =>
  (dispatch) => {
    dispatch({
      type: refreshing ? REFRESHING : LOADING,
      payload: true,
    });

    apiRequest("/posts/public")
      .then(({ data }) => {
        dispatch({
          type: FETCH_POSTS,
          payload: data,
        });
      })
      .catch((err) => {
        showApiError(err, true, () => dispatch(getPosts(refreshing)));
      })
      .finally(() => {
        dispatch({
          type: refreshing ? REFRESHING : LOADING,
          payload: false,
        });
      });
  };

export const addPost = (formData) => (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch({
    type: LOADING,
    payload: true,
  });
  fetch(`${API_URL}/posts/newpost`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    body: formData,
  })
    .then(({ data }) => {
      dispatch(getPosts(true));
    })
    .catch((err) => {
      // showApiError(err, true, () => dispatch(addPost(formData)))
      console.log("add post error", err?.response ?? err.message);
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
      dispatch(getPosts(true));
    });
};
export const addAltPost = (formData) => (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch({
    type: LOADING,
    payload: true,
  });
  fetch(`${API_URL}/posts/new_alternate_post`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    body: formData,
  })
    .then(({ data }) => {
      dispatch(getPosts(true));
    })
    .catch((err) => {
      // showApiError(err, true, () => dispatch(addPost(formData)))
      console.log("add post error", err?.response ?? err.message);
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
      dispatch(getPosts(true));
    });
};

export const editPost =
  (formData, postId, navigation) => (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch({
      type: LOADING,
      payload: true,
    });

    fetch(`${API_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      method: "PUT",
      body: formData,
    })
      .then(({ data }) => {
        if (data) {
          dispatch(getUserPosts());
          dispatch(getPosts(true));
        }
        if (navigation) {
          navigation?.goBack();
        }
      })
      .catch((err) => {
        showApiError(err, true, () => dispatch(addPost(formData)));
      })
      .finally(() => {
        dispatch({
          type: LOADING,
          payload: false,
        });
      });
  };

export const selectPost = (payload) => ({
  type: SELECT_POST,
  payload,
});

export const getPostUser = (userId) => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });

  try {
    // get user posts
    const userPosts = (await apiRequest(`/users/${userId}/posts`)).data;

    // get user growlist
    const userGrowList = (
      await apiRequest(`/jobs/current_growing?user_id=${userId}`)
    ).data;

    // get user data
    const userData = (await apiRequest(`/users/${userId}`)).data;

    dispatch({
      type: GET_POST_USER,
      payload: {
        posts: userPosts?.posts,
        growitList: userGrowList?.crops,
        data: userData?.user?.[0],
      },
    });
  } catch (err) {
    showApiError(err, true, () => dispatch(getPosts(refreshing)));
  } finally {
    dispatch({
      type: LOADING,
      payload: false,
    });
  }
};
