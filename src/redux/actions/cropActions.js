import axios from "axios";

import {
  GET_FAVORITE_CROPS_TO_GROW,
  GET_CROP_VARIETIES,
  GET_CROP_CYCLE_DETAILS,
  GET_CROP_STEPS,
  GET_SEARCH_RESULTS,
  GET_CROPS,
  LOADING,
  GET_CURRENT_GROW_CROPS,
} from "../types";
import { apiRequest, showApiError } from "../../config/api";
import { API_URL } from "../../constants";
import ManageCropContext from "../../context/ManageCropsContext";
import { updateAvatar } from "./authActions";
import {getCurrentJob, getUserJobs, growCrop} from "./jobActions";

export const getCropsFavoriteToGrow = (month) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/crops/grow/favourites?month=${month}`);
    // console.log(data, "RO: thisisdada");
    dispatch({
      type: GET_FAVORITE_CROPS_TO_GROW,
      payload: data,
    });

    return;
  } catch (error) {
    showApiError(error);
    return;
  }
};

export const getCrops = (crop) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/crops/`);
    dispatch({
      type: GET_CROPS,
      payload: data,
    });
  } catch (error) {
    showApiError(error);
  }
};

export const getCropVarieties = (crop) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/crops/grow/varieties?crop=${crop}`);

    dispatch({
      type: GET_CROP_VARIETIES,
      payload: data,
    });
  } catch (error) {
    showApiError(error);
  }
};

export const getCropCycleDetails = (cropId) => async (dispatch) => {
  try {
    console.log({mbappe2: cropId});
    const { data } = await apiRequest(`/crops/${cropId}`);

      console.log({mbappe4: data});
    dispatch({
      type: GET_CROP_CYCLE_DETAILS,
      payload: data,
    });
  } catch (error) {
    // console.log({mbappe3: cropId});
    // console.log({mbappe: error})
    showApiError(error);
  }
};

export const getCropSteps = (cropId) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/crop_steps/by_crop/${cropId}`);
    dispatch({
      type: GET_CROP_STEPS,
      payload: data,
    });
  } catch (error) {
    showApiError(error);
  }
};

export const addCrop = (cropData) => async (dispatch, getState) => {
    const { token } = getState().auth;

  dispatch({
    type: LOADING,
    payload: true,
  });
const {grow_level, name, variety, user_id, job_date} = cropData;
    // console.log("dzeko", cropData);

    const jobInfo2 = {
        name,
        life_cycle: "",
        variety,
        grow_level,
        user_id,
        job_date
    };
    let jobInfo5;

    try {
        const { data } = await apiRequest(`/crops/newCrop`, 'post', jobInfo2 );
        console.log("rotexxxy344", data);
        // console.log("rotexxxy3", cropData);
        if (data && data?.data?.id !== '') {
            //  jobInfo5 = {
            //                 name,
            //                 crop_id: data?.data.id,
            //                 user_id: user_id,
            //                 job_date,
            //                 title: "PENDING",
            //                 status: "PENDING",
            //                 job_type: "PENDING",
            //                 variety,
            //                 crop_type: '',
            //
            //             };
            //       const myCropGrown =  await dispatch(growCrop(jobInfo5, false))
            // if(myCropGrown) {
            //     return dispatch(getCurrentJob(myCropGrown))
            //     // return console.log({elishasha: myCropGrown})
            // }
            // dispatch(getCropCycleDetails(data?.data.id));
            // dispatch(getCropSteps(data?.data.id));
        //
            return data?.data?.id;
        }

        dispatch({
            type: LOADING,
            payload: false,
        });
    } catch (error) {
        console.log(error, "data___error");
        // console.log('');

        showApiError(error);

        dispatch({
            type: LOADING,
            payload: false,
        });
        return error;
    }
return

  // fetch(`${API_URL}/crops/newCrop`, {
  //   headers: {
  //       Authorization: `${token}`,
  //     // Authorization: token ? `Bearer ${token}` : null,
  //     Accept: "application/json",
  //     "Content-Type": "multipart/form-data",
  //   },
  //   method: "POST",
  //   body: cropData,
  // })
  //   .then(({data}) => {
  //     console.log("agunbiade", data);
  //
  //     if(data){
  //         const jobInfo = {
  //             name: name,
  //             crop_id: data.data.cropId,
  //             user_id: user_id,
  //             job_date: job_date,
  //             status: "PENDING",
  //             job_type: "PENDING",
  //             // variety: variety,
  //             crop_type: '',
  //         };
  //         dispatch(growCrop(jobInfo, false))
  //         dispatch(getCropCycleDetails(data.data.cropId));
  //         dispatch(getCropSteps(data.data.cropId));
  //     }
  //
  //     ManageCropContext?.actions?.updateCropToGrowDetails({
  //       // variety: cropData.variety,
  //       cropName: name,
  //       cropId: data?.data.id,
  //       month: "",
  //       crop_variety: "", //user variety
  //       monthIndex: 0,
  //       fromJobs: false,
  //       category: "",
  //       jobId: "",
  //       jobDate: "",
  //       jobStatus: "PENDING",
  //       currentlySetToRemind: false,
  //       currentlySetToRemindStage: "PENDING",
  //       growItStarted: "PENDING",
  //       sowItDate: "",
  //       plantItDate: "",
  //       harvestItStartDate: "",
  //       harvestItEndDate: "",
  //       editCropName: false,
  //       stageOneComplete: false,
  //       stageTwoComplete: false,
  //       stageThreeComplete: false,
  //       notNewCalendar: false,
  //     });
  //     // // navigation.navigate("Success");
  //     // // dispatch(updateProfile(userData, navigation))
  //
  //   })
  //   .catch((err) => {
  //     // showApiError(err, true, () => dispatch(updateAvatar(image, navigation)));
  //   })
  //   .finally(() => {
  //     dispatch({
  //       type: LOADING,
  //       payload: false,
  //     });
  //   });
  //   return
};

export const addCrop2 = (name, setCrop) => (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
    // console.log({dzeko: formData})


    apiRequest("/crops/newCrop", "post", { name })
    .then(({ data }) => {
      // console.log("new crop", data);
      setCrop(data?.data);
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(addCrop2(name, setCrop)));
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    });
};

export const getCropSearchResults =
  (value, month = "") =>
  async (dispatch) => {
    try {
      const url = month
        ? `/crops/grow/favourites?crop=${value}${
            month ? `&month=${month}` : ""
          }`
        : `/crops?crop=${value}`;

      dispatch({
        type: LOADING,
        payload: true,
      });

      const { data } = await apiRequest(url);

      dispatch({
        type: GET_SEARCH_RESULTS,
        payload: data,
      });
    } catch (error) {
      showApiError(error);
    } finally {
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };

export const getCurrentGrowing = (userId) => async (dispatch) => {
  try {
    const { data } = await apiRequest(
      `/jobs/current_growing?user_id=${userId}`
    );

    dispatch({
      type: GET_CURRENT_GROW_CROPS,
      payload: data,
    });


  } catch (error) {
    return showApiError(error);
  }
};
