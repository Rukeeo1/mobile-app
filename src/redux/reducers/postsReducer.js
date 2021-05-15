import { FETCH_POSTS } from '../types';

const initialState = {
  all: null,
};

const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POSTS:
      return {
        ...state,
        all: payload,
      };
    default:
      return state;
  }
};

export default postsReducer;
