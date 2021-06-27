import { FETCH_ARTICLES, SELECT_ARTICLE, FETCH_CATEGORIES } from '../types';

const initialState = {
  categories: null,
  all: {},
  selected: null,
};

const articlesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: payload,
      }
    case FETCH_ARTICLES:
      return {
        ...state,
        all: {
          ...state.all,
          [payload.id]: payload.articles,
        },
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
