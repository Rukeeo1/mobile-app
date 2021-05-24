import { FETCH_POSTS, SELECT_POST } from '../types';

const initialState = {
  all: null,
  selected: null,
};

const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POSTS:
      return {
        ...state,
        all: payload,
      };
    case SELECT_POST:
      return {
        ...state,
        selected: payload,
      }
    default:
      return state;
  }
};

export default postsReducer;
