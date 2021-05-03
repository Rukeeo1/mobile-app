import { GET_FAVORITE_CROPS_TO_GROW } from '../types/cropTypes';
import { apiRequest, showApiError } from '../../config/api';

export const getCropsFavoriteToGrow = (month) => async (dispatch) => {
  try {
    const {data} = await apiRequest(`/crops/grow/favourites?month=${month}`);
    dispatch({
      type: GET_FAVORITE_CROPS_TO_GROW,
      payload: data
    })
    
  } catch (error) {
    showApiError(error)
  }
};
