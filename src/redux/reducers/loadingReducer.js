import { LOADING, REFRESHING, FETCHING_MORE } from '../types';

const initialState = {
  loading: false,
  refreshing: false,
  fetchingMore: false,
};

const loadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: payload ?? !state.loading,
      };
    case REFRESHING:
      return {
        ...state,
        refreshing: payload ?? !state.refreshing,
      }
    case FETCHING_MORE:
      return {
        ...state,
        fetchingMore: payload ?? !state.fetchingMore,
      }
    default:
      return state;
  }
};

export default loadingReducer;
