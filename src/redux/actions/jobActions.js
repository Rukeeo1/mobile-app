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
