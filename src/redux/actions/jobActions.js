import { GET_USER_JOBS } from '../types';
import { apiRequest, showApiError } from '../../config/api';

export const getUserJobs = (userId) => (dispatch, getState) => {
  apiRequest(`/jobs/list?user_id=${userId}`)
    .then(({ data }) => {
      dispatch({
        type: GET_USER_JOBS,
        payload: data,
      });
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getUserFollowers(refreshing)));
    });
};

export const growCrop = (cropDetails, toast) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/jobs/growit`, 'post', cropDetails);
    toast.show({
      text1: data?.message,
    });
    dispatch(getUserJobs(cropDetails?.user_id));
    return;
  } catch (error) {
    showApiError(error);
    return error;
  }
};

export const plantCrop = (cropDetails, toast) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/jobs/plantit`, 'post', cropDetails);
    toast.show({
      text1: data?.message,
    });
    dispatch(getUserJobs(cropDetails?.user_id));
    return;
  } catch (error) {
    showApiError(error);
    return error;
  }
};

export const harvestCrop = (cropDetails, toast) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/jobs/harvestit`, 'post', cropDetails);
    toast.show({
      text1: data?.message,
    });
    dispatch(getUserJobs(cropDetails?.user_id));
    return;
  } catch (error) {
    return showApiError(error);
  }
};
