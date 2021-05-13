import { GET_FAVORITE_CROPS_TO_GROW, GET_CROP_DETAILS } from '../types/';

const initialState = {
  favoriteCrops: {},
  cropDetail: {},
};

const cropsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FAVORITE_CROPS_TO_GROW:
      return {
        ...state,
        favoriteCrops: payload,
      };
    case GET_CROP_DETAILS:
      return {
        ...state,
        cropDetail: payload,
      };

    default:
      return state;
  }
};

export default cropsReducer;
