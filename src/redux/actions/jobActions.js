import {
    GET_USER_JOBS,
    LOADING_JOBS,
    GET_CURRENT_GROW_CROPS,
    GET_FAVORITE_CROPS_TO_GROW,
    GET_PAST_HARVEST,
    GET_REMINDERS,
    LOADING,
    UPDATING_REMINDER, CHECK_EXISTING_JOB,
} from '../types';
import { apiRequest, showApiError } from '../../config/api';

export const getUserJobs = (userId, month="", year="") => (dispatch, getState) => {
  dispatch({
    type: LOADING_JOBS,
  });
  apiRequest(`/jobs/list?user_id=${userId}&month=${month}&year=${year}`)
    .then((response) => {
      console.log(response,'mr president')
      dispatch({
        type: GET_USER_JOBS,
        payload: response.data,
      });
      dispatch({
        type: LOADING_JOBS,
      });
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getUserFollowers(refreshing)));
      dispatch({
        type: LOADING_JOBS,
      });
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
    console.log(data, 'data___error');

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

// export const getCurrentGrowing = (userId) => async (dispatch) => {
//   try {
//     const { data } = await apiRequest(
//       `/jobs/current_growing?user_id=${userId}`
//     );
//     dispatch({
//       type: GET_CURRENT_GROW_CROPS,
//       payload: data,
//     });

//     return;
//   } catch (error) {
//     return showApiError(error);
//   }
// };

export const getPastHarvests = (userId) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/jobs/past_harvest?user_id=${userId}`);
    dispatch({
      type: GET_PAST_HARVEST,
      payload: data,
    });

    return;
  } catch (error) {
    return showApiError(error);
  }
};

export const updateJob = (jobId, jobDetails, toast) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/jobs/${jobId}`, 'put', jobDetails);
    toast.show({
      text1: data?.message || 'successful',
    });

    dispatch(getUserJobs(jobDetails?.user_id));
    return;
  } catch (error) {
    console.log(error, 'from job update');
    return showApiError(error);
  }
};
export const updateJob2 = (jobId, jobDetails) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/jobs/${jobId}`, 'put', jobDetails);


    dispatch(getUserJobs(jobDetails?.user_id));
    return;
  } catch (error) {
    console.log(error, 'from job update');
    return showApiError(error);
  }
};

export const editJobWithPatch =
  (jobId, jobDetails, toast) => async (dispatch) => {
    try {
      const { data } = await apiRequest(`/jobs/${jobId}`, 'patch', jobDetails);
      toast.show({
        text1: data?.message,
      });

      dispatch(getUserJobs(jobDetails?.user_id));
      return;
    } catch (error) {
      console.log(error, 'from job update');
      return showApiError(error);
    }
  };

export const deleteJob = (jobId, userId, toast) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/jobs/${jobId}`, 'delete');

    toast.show({
      text1: data?.message,
    });

    dispatch(getUserJobs(userId));
    return;
  } catch (error) {
    console.log(error, 'from job update');
    return showApiError(error);
  }
};

export const getUserReminders = () => (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });

  apiRequest(`/reminders/`)
    .then(({ data }) => {
      dispatch({
        type: GET_REMINDERS,
        payload: data,
      });
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getUserReminders()));
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    });
};

export const addReminder = (data) => (dispatch, getState) => {
  const {
    user: { id: user_id },
  } = getState().auth;

  dispatch({
    type: LOADING,
    payload: true,
  });

  apiRequest(`/reminders/new`, 'post', { ...data, user_id })
    .then(({ data }) => {
      dispatch(getUserReminders());
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(addReminder(data)));
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: true,
      });
    });
};

export const updateReminder = (reminder, status) => (dispatch) => {
  dispatch({
    type: UPDATING_REMINDER,
    payload: reminder?.id,
  });

  console.log(reminder);

  apiRequest(`/reminders/${reminder?.id}`, 'delete', { ...reminder, status })
    .then(({ data }) => {
      console.log('update rmeminver', data);
      dispatch(getUserReminders());
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getUserReminders()));
    })
    .finally(() => {
      dispatch({
        type: UPDATING_REMINDER,
        payload: null,
      });
    });
};
