import {
  GET_USER_JOBS,
  LOADING_JOBS,
  GET_CURRENT_GROW_CROPS,
  GET_PAST_HARVEST,
  GET_REMINDERS,
    GET_JOB_HISTORY,
    GET_CURRENT_JOB,
  UPDATING_REMINDER,
} from '../types/';

const initialState = {
  usersJobs: {},
  loadingJobs: false,
  pastHarvest: {},
  userReminders: {},
  currentJob: {},
  jobHistory: {},
  updatingReminder: null,
};

const jobsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_JOBS:
      return {
        ...state,
        loadingJobs: !state.loadingJobs,
      };
    case GET_USER_JOBS:
      return {
        ...state,
        usersJobs: payload,
      };
    case GET_CURRENT_GROW_CROPS:
      return {
        ...state,
        currentGrowCrops: payload,
      };
    case GET_PAST_HARVEST:
      return {
        ...state,
        pastHarvest: payload,
      };
    case GET_REMINDERS:
      return {
        ...state,
        userReminders: payload,
      };
      case GET_CURRENT_JOB:
      return {
        ...state,
        currentJob: payload,
      };
      case GET_JOB_HISTORY:
      return {
        ...state,
        jobHistory: payload,
      };
    case UPDATING_REMINDER:
      return {
        ...state,
        updatingReminder: payload
      }
    default:
      return state;
  }
};

export default jobsReducer;
