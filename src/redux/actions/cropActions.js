import {
  GET_FAVORITE_CROPS_TO_GROW,
  GET_CROP_VARIETIES,
  GET_CROP_CYCLE_DETAILS,
  GET_CROP_STEPS,
  GET_SEARCH_RESULTS,
  GET_CROPS,
} from '../types/cropTypes';
import { apiRequest, showApiError } from '../../config/api';

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

export const getCropSearchResults = (value) => async (dispatch) => {
  try {
    const { data } = await apiRequest(`/crops/grow/varieties?crop=${value}`);
    console.log('get search results', data)
    dispatch({
      type: GET_SEARCH_RESULTS,
      payload: data,
    });
  } catch (error) {
    showApiError(error);
  }
}
