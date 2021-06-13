import { FETCH_ARTICLES, SELECT_ARTICLE } from '../types';

const initialState = {
  all: null,
  selected: null,
};

const articlesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        all: payload,
      };
    case SELECT_ARTICLE:
      return {
        ...state,
        selected: payload,
      }
    default:
      return state;
  }
};

export default articlesReducer;
