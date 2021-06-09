import {
  GET_USER_JOBS,
  LOADING_JOBS,
  GET_CURRENT_GROW_CROPS,
  GET_PAST_HARVEST,
} from '../types/';

const initialState = {
  usersJobs: {},
  loadingJobs: false,
  pastHarvest: {},
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
    case GET_PAST_HARVEST:
      return {
        ...state,
        pastHarvest: payload,
      };

    default:
      return state;
  }
};

export default cropsReducer;
