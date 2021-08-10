import { FETCH_POSTS, SELECT_POST, GET_POST_USER } from "../types";

const initialState = {
  all: null,
  selected: null,
  selectedUser: {
    posts: null,
    growitList: null,
    data: null,
  },
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
      };
    case GET_POST_USER:
      return {
        ...state,
        selectedUser: payload,
      };
    default:
      return state;
  }
};

export default postsReducer;
