import { GET_USER_JOBS, LOADING_JOBS, GET_CURRENT_GROW_CROPS } from '../types/';

const initialState = {
  usersJobs: {},
  loadingJobs: false,
};

const cropsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_JOBS:
      return {
        ...state,
        loadingJobs: !state.loadingJobs,
      };
    case GET_USER_JOBS:
      return {
        ...state,
        usersJobs: payload,
      };
    case GET_CURRENT_GROW_CROPS:
      return {
        ...state,
        currentGrowCrops: payload,
      };

    default:
      return state;
  }
};

export default cropsReducer;
