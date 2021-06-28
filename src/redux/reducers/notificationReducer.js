import { GET_NOTIFICATIONS } from '../types';

const initialState = {
  all: null,
};

const notificationsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        all: payload,
      };
    default:
      return state;
  }
};

export default notificationsReducer;
