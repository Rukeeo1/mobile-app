import axios from 'axios'

import {
  GET_FAVORITE_CROPS_TO_GROW,
  GET_CROP_VARIETIES,
  GET_CROP_CYCLE_DETAILS,
  GET_CROP_STEPS,
  GET_SEARCH_RESULTS,
  GET_CROPS,
  LOADING,
} from '../types'
import { apiRequest, showApiError } from '../../config/api'
import { API_URL } from '../../constants'

export const getCropsFavoriteToGrow = (month) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/crops/grow/favourites?month=${month}`);
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
  const formData = new FormData()

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

  const { token } = getState().auth

  dispatch({
    type: LOADING,
    payload: true,
  })

  axios
    .post(`${API_URL}/crops/newCrop`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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


export const getCropSearchResults = (value) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/crops/grow/varieties?crop=${value}`);
  
    dispatch({
      type: GET_SEARCH_RESULTS,
      payload: data,
    });
  } catch (error) {
    showApiError(error);
  }
}
