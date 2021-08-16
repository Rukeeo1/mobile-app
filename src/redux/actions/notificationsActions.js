import { LOADING, REFRESHING, GET_NOTIFICATIONS } from "../types";
import { apiRequest, showApiError } from "../../config/api";

export const getNotifications =
  (refreshing = false) =>
  (dispatch) => {
    dispatch({
      type: refreshing ? REFRESHING : LOADING,
      payload: true,
    });

    apiRequest("/notifications/")
      .then(({ data }) => {
        // console.log("notifications", data);

        dispatch({
          type: GET_NOTIFICATIONS,
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
