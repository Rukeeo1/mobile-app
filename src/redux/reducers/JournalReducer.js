import { GET_JOURNALS } from '../types/';

const initialState = {
  journals: {},
};

const cropsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_JOURNALS:
      return {
        ...state,
        journals: { ...state.journals, ...payload },
      };

    default:
      return state;
  }
};

export default cropsReducer;
