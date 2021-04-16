// import {Api} from '../../config/api';
// import { Alert } from 'react-native';

// import { GET_PHOTOS, GET_SINGLE_PHOTO } from '../types';

// import { handleLoading } from './loadingActions';

// export const getPhotos = (page = 1, itemsPerPage = 10) => async (dispatch) => {
//   dispatch(handleLoading());
//   try {
//     const { data } = await Api.get(
//       `/photos?_page=${page}&_limit=${itemsPerPage}`
//     );
//     dispatch({
//       type: GET_PHOTOS,
//       payload: data,
//     });
//   } catch (error) {
//     Alert.alert(`There was an error getting photos${error?.message}`);
//   }
//   dispatch(handleLoading());
// };

// export const getPhotoById = (photoId) => async (dispatch) => {
//   dispatch(handleLoading());
//   try {
//     const { data } = await Api.get(`/photos/${photoId}`);
//     dispatch({
//       type: GET_SINGLE_PHOTO,
//       payload: data,
//     });
//   } catch (error) {
//     Alert.alert(`There was an error getting photos${error?.message}`);
//   }
//   dispatch(handleLoading());
// };
