import {
  GET_USER_JOBS,
  LOADING_JOBS,
  GET_CURRENT_GROW_CROPS,
  GET_FAVORITE_CROPS_TO_GROW,
  GET_PAST_HARVEST,
  GET_REMINDERS,
  GET_JOB_HISTORY,
  GET_CURRENT_JOB,
  LOADING,
  UPDATING_REMINDER,
  GET_JOURNALS,
} from "../types";
import { apiRequest, showApiError } from "../../config/api";
import ManageCropContext from "../../context/ManageCropsContext";
import { getCropCycleDetails, getCropSteps } from "./cropActions";
import { API_URL } from "../../constants";

export const getUserJobs =
  (userId, month = "", year = "") =>
  (dispatch, getState) => {
    dispatch({
      type: LOADING_JOBS,
    });
    apiRequest(`/jobs/list?user_id=${userId}`)
      .then((response) => {
        dispatch({
          type: GET_USER_JOBS,
          payload: response.data,
        });
        dispatch({
          type: LOADING_JOBS,
        });
      })
      .catch((err) => {
        showApiError(err, true, () =>
          dispatch(getUserJobs(userId, month, year))
        );
        dispatch({
          type: LOADING_JOBS,
        });
      });
  };

export const growCrop = (cropDetails, toast) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/jobs/growit`, "post", cropDetails);
    const { id } = data.data;

    if (data) {
      ManageCropContext?.actions?.updateCropToGrowDetails({
        variety: data?.data?.variety,
        cropName: data?.data?.name,
        jobId: id,
      });

      await dispatch(getCropCycleDetails(data?.data?.crop_id));
      await dispatch(getCropSteps(data?.data?.crop_id));
      await dispatch(getUserJobs(data?.data?.user_id));
      await dispatch(getCurrentJob(id));
      return id;
    }
  } catch (error) {
    console.log(error, "data___error");

    showApiError(error);
    return error;
  }
};

export const plantCrop = (cropDetails, toast) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/jobs/plantit`, "post", cropDetails);
    toast.show({
      text1: data?.message,
    });
    dispatch(getUserJobs(cropDetails?.user_id));
  } catch (error) {
    showApiError(error);
    return error;
  }
};

export const harvestCrop = (cropDetails, toast) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/jobs/harvestit`, "post", cropDetails);
    toast.show({
      text1: data?.message,
    });
    dispatch(getUserJobs(cropDetails?.user_id));
  } catch (error) {
    return showApiError(error);
  }
};
//
// export const getCurrentGrowing = (userId) => async (dispatch) => {
//   try {
//     const { data } = await apiRequest(
//       `/jobs/current_growing?user_id=${userId}`
//     );
//     dispatch({
//       type: GET_CURRENT_GROW_CROPS,
//       payload: data,
//     });
//
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
  } catch (error) {
    return showApiError(error);
  }
};

export const updateJob = (jobId, jobDetails, toast) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/jobs/${jobId}`, "put", jobDetails);
    toast.show({
      text1: data?.message || "successful",
    });

    if (data) {
      ManageCropContext?.actions?.updateCropToGrowDetails({
        variety: data.data.variety,
        crop_variety: data.data.crop_variety,
        cropName: data.data.name,
        // jobId: data.data?.id,
        sowItDate: data.data.sow_date && true ? data.data.sow_date : "",
        plantItDate: data.data.plant_date && true ? data.data.plant_date : "",
        harvestItStartDate:
          data.data.harvest_start_date && true
            ? data.data.harvest_start_Date
            : "",
        harvestItEndDate:
          data.data.harvest_end_date && true ? data.data.harvest_end_Date : "",
      });

      await dispatch(getCropCycleDetails(data?.data?.crop_id));
      await dispatch(getCropSteps(data?.data?.crop_id));
      await dispatch(getCurrentJob(data?.data?.id));
      await dispatch(getUserJobs(data?.data?.user_id));
    }
    //
    // dispatch(getUserJobs(jobDetails?.user_id));
  } catch (error) {
    return showApiError(error);
  }
};
export const updateJob2 = (jobId, jobDetails) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/jobs/${jobId}`, "put", jobDetails);

    dispatch(getUserJobs(jobDetails?.user_id));
  } catch (error) {
    return showApiError(error);
  }
};

export const editJobWithPatch =
  (jobId, jobDetails, toast) => async (dispatch) => {
    try {
      const { data } = await apiRequest(`/jobs/${jobId}`, "patch", jobDetails);
      toast.show({
        text1: data?.message,
      });

      dispatch(getUserJobs(jobDetails?.user_id));
    } catch (error) {
      console.log(error, "from job update");
      return showApiError(error);
    }
  };

export const deleteJob = (jobId, userId, toast) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/jobs/${jobId}`, "delete");

    toast.show({
      text1: data?.message,
    });

    dispatch(getUserJobs(userId));
  } catch (error) {
    console.log(error, "from job update");
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
export const getUserOldJobs = () => async (dispatch, getState) => {
  const { user, token } = getState().auth;
  dispatch({
    type: LOADING,
    payload: true,
  });

  try {
    apiRequest(`/jobs/user_history`, "get").then(({ data }) => {
      console.log("xdemolartt", data);
      dispatch({
        type: GET_JOB_HISTORY,
        payload: data,
      });

      // return data.data
    });
    // const { data } = await fetch(`${API_URL}/jobs/user_history`, {
    //     method: 'GET',
    //     headers: new Headers({
    //         'Cache-Control': 'no-cache, no-store, must-revalidate',
    //         'Authorization': `Bearer ${token}`,
    //         'Pragma': 'no-cache',
    //         'Expires': 0,
    //     }),
    //  });

    // console.log({xdemolarppp: {data}});
    // if(data){
    //     // console.log({xdemolarx: {data}});
    //     dispatch({
    //         type: GET_JOB_HISTORY,
    //         payload: data,
    //     });
    //     return data
    // }
  } catch (error) {
    showApiError(error);
  }

  dispatch({
    type: LOADING,
    payload: false,
  });
};

export const getCurrentJob = (jobId) => async (dispatch) => {
  console.log("atlanta12", jobId);
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    const { data } = await apiRequest(`/jobs/${jobId}`);
    console.log("atlanta2", data);
    if (data) {
      dispatch({
        type: GET_CURRENT_JOB,
        payload: data,
      });
      console.log("atlanta3", data);
    }
    //
    // dispatch(getUserJobs(jobDetails?.user_id));
  } catch (error) {
    console.log(err, "from get current Job");
    return showApiError(error);
  }
  dispatch({
    type: LOADING,
    payload: false,
  });
  // apiRequest(`/jobs/${jobId}`)
  //   .then(({data}) => {
  //     if(data){
  //         dispatch({
  //             type: GET_CURRENT_JOB,
  //             payload: data,
  //         });
  //         console.log('atlanta', data)
  //     }
  //
  //       console.log('atlanta 2', data)
  //   })
  //   .catch((err) => {
  //     console.log(err, "from get current Job");
  //       // showApiError(err, true, () => dispatch(getCurrentJob(jobId)));
  //   })
  //   .finally(() => {
  //     dispatch({
  //       type: LOADING,
  //       payload: false,
  //     });
  //   });
};

export const addReminder = (data) => (dispatch, getState) => {
  const {
    user: { id: user_id },
  } = getState().auth;

  dispatch({
    type: LOADING,
    payload: true,
  });

  apiRequest(`/reminders/new`, "post", { ...data, user_id })
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
//
// export const getJobHistory = () => (dispatch) => {
//   dispatch({
//     type: LOADING,
//     payload: true,
//   });
//
//   apiRequest(`/jobs/user_history`)
//     .then(({ data }) => {
//       dispatch({
//         type: GET_JOB_HISTORY,
//         payload: data,
//       });
//     })
//     .catch((err) => {
//       showApiError(err, true, () => dispatch(getJobHistory()));
//     })
//     .finally(() => {
//       dispatch({
//         type: LOADING,
//         payload: false,
//       });
//     });
// };

export const updateReminder = (reminder, status) => (dispatch) => {
  dispatch({
    type: UPDATING_REMINDER,
    payload: reminder?.id,
  });

  // console.log(reminder);

  apiRequest(`/reminders/${reminder?.id}`, "put", { ...reminder, status })
    .then(({ data }) => {
      // console.log("update reminder", data);
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
