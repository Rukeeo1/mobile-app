import axios from 'axios'

import {
  GET_FAVORITE_CROPS_TO_GROW,
  GET_CROP_VARIETIES,
  GET_CROP_CYCLE_DETAILS,
  GET_CROP_STEPS,
  GET_SEARCH_RESULTS,
  GET_CROPS,
  LOADING,
  GET_CURRENT_GROW_CROPS
} from '../types'
import { apiRequest, showApiError } from '../../config/api'
import { API_URL } from '../../constants'
import ManageCropContext from "../../context/ManageCropsContext";
import {updateAvatar} from "./authActions";

export const getCropsFavoriteToGrow = (month) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/crops/grow/favourites?month=${month}`);
    console.log(data,'RO: thisisdada')
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
    const { data } = await apiRequest(`/crops/${cropId}`);
    dispatch({
      type: GET_CROP_CYCLE_DETAILS,
      payload: data,
    });
  } catch (error) {
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



export const addCrop = (cropData, navigation) => (dispatch, getState) => {
  let formData = new FormData();

  formData.append('name', cropData.name)
  formData.append('grow_level', cropData.level)
  formData.append('variety', cropData.variety)

  if (cropData.image) {
    formData.append('media_url', {
      name: cropData.image?.split('/').pop(),
      uri: cropData.image,
      type: 'image/*',
    })

    formData.append('thumbnail_url', {
      name: cropData.image?.split('/').pop(),
      uri: cropData.image,
      type: 'image/*',
    })
  }


    // formData = JSON.stringify(formData);
    // console.log('timz', formData)

  const { token } = getState().auth

  dispatch({
    type: LOADING,
    payload: true,
  })

  // axios
  //   .post(`${API_URL}/crops/newCrop`, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
    fetch(`${API_URL}/crops/newCrop`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: formData
    })
    .then(({ data }) => {
      console.log('update crop', data)

      ManageCropContext?.actions?.updateCropToGrowDetails({
        variety: cropData.variety,
        cropName: cropData.name,
        cropId: data?.id,
      });
      navigation.navigate('Success');
      // dispatch(updateProfile(userData, navigation))
      // navigation.navigate('Crop-selection', { cropName: cropData?.name, growLevel: cropData?.level, sowTip: data?.sow_tip })
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(updateAvatar(image, navigation)))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const addCrop2 = (name, setCrop) => (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  })

  apiRequest('/crops/newCrop', 'post', { name })
    .then(({ data }) => {
      console.log('new crop', data)
      setCrop(data?.data)
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(addCrop2(name, setCrop)))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const getCropSearchResults = (value, month='') => async (dispatch) => {
  try {
    const url = month
      ? `/crops/grow/favourites?crop=${value}${month ? `&month=${month}` : ''}`
      : `/crops?crop=${value}`

    dispatch({
      type: LOADING,
      payload: true
    })

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
      payload: false
    })
  }
}

export const getCurrentGrowing = (userId) => async (dispatch) => {
  try {
    const { data } = await apiRequest(
      `/jobs/current_growing?user_id=${userId}`
    );

    dispatch({
      type: GET_CURRENT_GROW_CROPS,
      payload: data,
    });

    return;
  } catch (error) {
    return showApiError(error);
  }
};

