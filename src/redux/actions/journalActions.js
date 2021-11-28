import { GET_JOURNALS, LOADING } from "../types";
import axios from "axios";
import { apiRequest, showApiError } from "../../config/api";

import { API_URL } from "../../constants";
import { getPosts } from "./postsActions";

export const getJournals = (crop_id) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/journals/${crop_id}/posts`);
    // const { data } = await apiRequest(`/journals/crop_id=${crop_id}`);
    dispatch({
      type: GET_JOURNALS,
      payload: data,
    });
  } catch (error) {
    showApiError(error);
  }
};

export const addJournal = (newJournal, userInfo) => (dispatch) => {
  fetch(`${API_URL}/posts/newpost`, {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    body: newJournal,
  })
    .then(({ data }) => {
      dispatch(getPosts(true));
    })
    .catch((err) => {
      // showApiError(err, true, () => dispatch(addPost(formData)))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    });
};
