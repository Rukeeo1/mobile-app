import { GET_USER_JOBS } from '../types/';

const initialState = {
  usersJobs: {},
};

const cropsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_JOBS:
      return {
        ...state,
        usersJobs: payload,
      };

    default:
      return state;
  }
};

export default cropsReducer;
