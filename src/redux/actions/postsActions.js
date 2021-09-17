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
        // console.log(data)

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
      // console.log(dzeko2, data);

      dispatch(getPosts(true));
    })
    .catch((err) => {
      // showApiError(err, true, () => dispatch(addPost(formData)))
      // console.log('add post error', err?.response ?? err.message)
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
  // console.log(formData)

  dispatch({
    type: LOADING,
    payload: true,
  });

  // axios
  //   .post(`${API_URL}/posts/newpost`, formData, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
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
      console.log("add post", data);

      dispatch(getPosts(true));
    })
    .catch((err) => {
      // showApiError(err, true, () => dispatch(addPost(formData)))
      // console.log('add post error', err?.response ?? err.message)
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
    // console.log({martinmartins: formData})

    dispatch({
      type: LOADING,
      payload: true,
    });

    // axios
    //   .post(`${API_URL}/posts/newpost`, formData, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
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
        // console.log('add post', data)
        // Alert.alert("", "Post updated successfully", [{ text: "Dismiss" }]);
        //
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
        // console.log('add post error', err?.response ?? err.message)
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
    // console.log({ userPosts })

    // get user growlist
    const userGrowList = (
      await apiRequest(`/jobs/current_growing?user_id=${userId}`)
    ).data;
    console.log({ userGrowList });

    // get user data
    const userData = (await apiRequest(`/users/${userId}`)).data;
    // console.log({ userData })

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
