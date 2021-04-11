import { LOADING } from '../types';
const initialState = {
  loading: false,
};

const loadingReducer = (state = initialState, { type }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: !state.loading,
      };

    default:
      return state;
  }
};

export default loadingReducer;
