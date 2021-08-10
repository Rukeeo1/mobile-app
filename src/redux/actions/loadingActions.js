import { LOADING } from "../types";

export const handleLoading = (payload) => ({
  type: LOADING,
  payload,
});

export default handleLoading;
