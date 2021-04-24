import { LOADING } from '../types';

const initialState = {
  loading: false,
};

const loadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: payload ?? !state.loading,
      };

    default:
      return state;
  }
};

export default loadingReducer;
