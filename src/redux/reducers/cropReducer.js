import {
  GET_FAVORITE_CROPS_TO_GROW,
  GET_CROP_VARIETIES,
  GET_CROP_CYCLE_DETAILS,
  GET_CROP_STEPS,
  GET_SEARCH_RESULTS,
} from '../types/';

const initialState = {
  favoriteCrops: {},
  cropDetail: {},
  cropCycleDetails: [],
  cropSteps: {},
  searchResults: [],
};

const cropsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FAVORITE_CROPS_TO_GROW:
      return {
        ...state,
        favoriteCrops: payload,
      };
    case GET_CROP_VARIETIES:
      return {
        ...state,
        cropDetail: payload,
      };
    case GET_CROP_CYCLE_DETAILS:
      return {
        ...state,
        cropCycleDetails: payload,
      };
    case GET_CROP_STEPS:
      return {
        ...state,
        cropSteps: payload,
      };
    case GET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: payload,
      }
    default:
      return state;
  }
};

export default cropsReducer;
