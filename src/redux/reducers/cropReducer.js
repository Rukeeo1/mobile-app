import { GET_FAVORITE_CROPS_TO_GROW } from '../types/';

const initialState = {
  favoriteCrops: {},
};

const cropsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FAVORITE_CROPS_TO_GROW:
      return {
        ...state,
        favoriteCrops: payload,
      };
    case 'rukee':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default cropsReducer;
