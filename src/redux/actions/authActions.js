import axios from "axios";
import { Alert, AsyncStorage } from "react-native";
import { CommonActions } from "@react-navigation/native";

import {
  SAVE_TOKEN,
  SAVE_USER,
  LOADING,
  GET_USER_DATA,
  REFRESHING,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_USER_GROW_LIST,
  GET_USER_POSTS,
  FETCHING_MORE,
  LOG_OUT,
  SET_FORGOT_PASSWORD_DATA,
  RESET_FORGOT_PASSWORD_DATA,
} from "../types";
import { apiRequest, showApiError } from "../../config/api";
import { API_URL } from "../../constants";
import { getPostUser } from "./postsActions";

export const signOut = () => ({
  type: LOG_OUT,
});

export const saveUser = (token, user) => (dispatch) => {
  dispatch({
    type: SAVE_TOKEN,
    payload: token,
  });

  dispatch({
    type: SAVE_USER,
    payload: user,
  });
};

export const login = (user, navigation) => (dispatch) => {
  const { email, password } = user;

  dispatch({
    type: LOADING,
    payload: true,
  });

  apiRequest("/users/signin", "post", { password, auth_id: email })
    .then(({ data }) => {
      dispatch(saveUser(data.token, { ...data.user }));
      // navigation.navigate('Onboarding')
      // navigation.navigate('Splash')

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          key: null,
          routes: [
            {
              name: "Splash",
            },
          ],
        })
      );
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(login(user, navigation)));
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    });
};

export const register = (user, navigation) => async (dispatch) => {
  const deviceToken = await AsyncStorage.getItem("PushNotificationToken");
  dispatch({
    type: LOADING,
    payload: true,
  });

  const postData = {
    auth_id: user.email,
    auth_type: "email",
    password: user.password,
    username: user.name,
    fullname: user.name,
    location: user.location,
    role: 0,
    device_token: deviceToken,
  };

  // console.log("user data", postData);

  apiRequest("/users/signup", "post", postData)
    .then(({ data }) => {
      // console.log("signup", data);
      dispatch(
        login({ email: user.email, password: user.password }, navigation)
      );
      // dispatch(saveUser(data.data.token, { ...data.data }))
      // navigation.navigate('Splash')
      // navigation.navigate('Onboarding')

      // navigation.dispatch(CommonActions.reset({
      //   index: 0,
      //   key: null,
      //   routes: [{
      //     name: 'Splash'
      //   }],
      // }))
    })
    .catch((err) => {
      console.log("register", err?.response ?? err?.message);
      showApiError(err, true, () => dispatch(register(user, navigation)));
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    });
};

export const socialAuth = (user, navigation) => async (dispatch) => {
  const deviceToken = await AsyncStorage.getItem("PushNotificationToken");

  dispatch({
    type: LOADING,
    payload: true,
  });

  apiRequest("/users/social-media", "post", {
    device_token: deviceToken,
    auth_type: "social",
    ...user,
  })
    .then(({ data }) => {
      console.log("social auth", data);
      dispatch(saveUser(data.token, { ...data }));
      // navigation.navigate('Onboarding')
      // navigation.navigate('Splash')

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          key: null,
          routes: [
            {
              name: "Profile-Settings",
            },
          ],
        })
      );
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(socialAuth(user, navigation)));
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    });
};

export const forgotPassword = (email, navigation) => (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });

  apiRequest("/users/forgot_password", "post", { auth_id: email })
    .then(({ data }) => {
      console.log("forgot password", data);

      dispatch({
        type: SET_FORGOT_PASSWORD_DATA,
        payload: { email },
      });

      navigation.navigate("ValidateOTP");

      // Alert.alert('OTP token sent', 'Please check your email for the OTP and further instructions', [
      //   { text: 'Dismiss' }
      // ], {
      //   onDismiss: () => navigation.navigate('ManualAuthentication')
      // })
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(forgotPassword(email)));
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    });
};

export const validateOTP = (otpToken, navigation) => (dispatch, getState) => {
  const {
    forgotPassword: { email },
  } = getState().auth;
  dispatch({
    type: LOADING,
    payload: true,
  });

  apiRequest("/users/password_otp_validation", "post", {
    x_request_auth_id: email,
    x_request_otp_token: otpToken,
  })
    .then(({ data }) => {
      // console.log("validate otp", data);

      if (data.valid) {
        dispatch({
          type: SET_FORGOT_PASSWORD_DATA,
          payload: { email, otpToken },
        });

        navigation.navigate("Reset-password");
      } else {
        Alert.alert("", "Invalid token", [{ text: "Dismiss" }]);
      }
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(forgotPassword(email)));
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    });
};

export const resetPassword = (password, navigation) => (dispatch, getState) => {
  const {
    forgotPassword: { email, otpToken },
  } = getState().auth;
  dispatch({
    type: LOADING,
    payload: true,
  });

  apiRequest("/users/reset_password", "put", {
    auth_id: email,
    x_request_otp_token: otpToken,
    password,
  })
    .then(({ data }) => {
      // console.log("reset password", data);

      Alert.alert("", "Password reset successfully", [{ text: "Dismiss" }], {
        onDismiss: () => navigation.navigate("ManualAuthentication"),
      });

      //   if (data.valid) {
      //     dispatch({
      //       type: SET_FORGOT_PASSWORD_DATA,
      //       payload: { email, otpToken }
      //     })

      //     navigation.navigate('Reset-password')
      //   } else {
      //     Alert.alert('', 'Invalif token', [
      //       { text: 'Dismiss' }
      //     ])
      //   }
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(forgotPassword(email)));
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    });
};

export const updateAvatar = (userData, navigation) => (dispatch, getState) => {
  const { user, token } = getState().auth;

  // console.log("update avatar");

  const { profileImageUri: image } = userData;
  const formData = new FormData();
  formData.append("profileImage", {
    name: image?.split("/").pop(),
    uri: image,
    type: "image/*",
  });
  const url = `${API_URL}/users/${user?.id}/updateAvatar`;

  dispatch({
    type: LOADING,
    payload: true,
  });

  axios
    .put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      // console.log("update avatar", data);

      dispatch(updateProfile(userData, navigation));
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(updateAvatar(image, navigation)));
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    });
};

export const updateProfile = (userData, navigation) => (dispatch, getState) => {
  const { user } = getState().auth;

  // console.log("update profile");

  dispatch({
    type: LOADING,
    payload: true,
  });

  apiRequest(`/users/${user?.id}`, "put", {
    biography: userData.bio,
    fullname: userData.name,
    location: userData.location,
  })
    .then(({ data }) => {
      dispatch({
        type: SAVE_USER,
        payload: { ...user, ...data },
      });

      // dispatch(getUserProfile(true))
      navigation.navigate("Main-Profile", {
        //this would be refactored later... when the sideBar component is refactored...
        indexOfItemToShow: 3,
      });
    })
    .catch((err) => {
      showApiError(err, true, () =>
        dispatch(updateProfile(userData, navigation))
      );
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    });
};

export const getUserProfile =
  (silent = false) =>
  (dispatch, getState) => {
    const { user } = getState().auth;

    if (!silent)
      dispatch({
        type: LOADING,
        payload: true,
      });

    apiRequest(`/users/${user?.id}`)
      .then(({ data }) => {
        // console.log("user profile", data);

        dispatch({
          type: GET_USER_DATA,
          payload: data?.user?.[0],
        });
      })
      .catch((err) => {
        showApiError(err, true, () => dispatch(getUserProfile(silent)));
      })
      .finally(() => {
        dispatch({
          type: LOADING,
          payload: false,
        });
      });
  };

export const getUserFollowing =
  (refreshing = false, silent = false) =>
  (dispatch, getState) => {
    const { user } = getState().auth;

    if (!silent) {
      dispatch({
        type: refreshing ? REFRESHING : LOADING,
        payload: true,
      });
    }

    apiRequest(`/users/${user?.id}/following`)
      .then(({ data }) => {
        dispatch({
          type: GET_FOLLOWING,
          payload: data,
        });
      })
      .catch((err) => {
        showApiError(err, true, () =>
          dispatch(getUserFollowing(refreshing, silent))
        );
      })
      .finally(() => {
        if (!silent) {
          dispatch({
            type: refreshing ? REFRESHING : LOADING,
            payload: false,
          });
        }
      });
  };

export const getUserFollowers =
  (refreshing = false, silent = false) =>
  (dispatch, getState) => {
    const { user } = getState().auth;

    if (!silent) {
      dispatch({
        type: refreshing ? REFRESHING : LOADING,
        payload: true,
      });
    }

    apiRequest(`/users/${user?.id}/followers`)
      .then(({ data }) => {
        dispatch({
          type: GET_FOLLOWERS,
          payload: data,
        });
      })
      .catch((err) => {
        showApiError(err, true, () =>
          dispatch(getUserFollowers(refreshing, silent))
        );
      })
      .finally(() => {
        if (!silent) {
          dispatch({
            type: refreshing ? REFRESHING : LOADING,
            payload: false,
          });
        }
      });
  };

export const followUser =
  (user_id, isMyProfile = true) =>
  (dispatch) => {
    apiRequest("/users/follows", "post", { user_id })
      .then(({ data }) => {
        // console.log("follow user", data);

        if (isMyProfile) dispatch(getUserFollowing(false, true));
        else dispatch(getPostUser(user_id));
      })
      .catch((err) => {
        console.log("follow user error", err?.response ?? err.data);
      });
  };

export const getUserGrowList = () => (dispatch, getState) => {
  const { user } = getState().auth;

  dispatch({
    type: REFRESHING,
    payload: true,
  });

  apiRequest(`/jobs/growlist?user_id=${user?.id}`)
    .then(({ data }) => {
      dispatch({
        type: GET_USER_GROW_LIST,
        payload: data.crops,
      });
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getUserGrowList()));
    })
    .finally(() => {
      dispatch({
        type: REFRESHING,
        payload: false,
      });
    });
};
export const getUserGrowList2 = (userId) => (dispatch, getState) => {
  dispatch({
    type: REFRESHING,
    payload: true,
  });

  apiRequest(`/jobs/growlist?user_id=${userId}`)
    .then(({ data }) => {
      dispatch({
        type: GET_USER_GROW_LIST,
        payload: data.crops,
      });
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getUserGrowList2(userId)));
    })
    .finally(() => {
      dispatch({
        type: REFRESHING,
        payload: false,
      });
    });
};

export const getUserPosts = () => (dispatch, getState) => {
  const { user } = getState().auth;

  dispatch({
    type: FETCHING_MORE,
    payload: true,
  });

  apiRequest(`/users/${user?.id}/posts`)
    .then(({ data }) => {
      dispatch({
        type: GET_USER_POSTS,
        payload: data.posts,
      });
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getUserPosts()));
    })
    .finally(() => {
      dispatch({
        type: FETCHING_MORE,
        payload: false,
      });
    });
};
export const getUserJournals = () => (dispatch, getState) => {
  const { user } = getState().auth;

  dispatch({
    type: FETCHING_MORE,
    payload: true,
  });

  apiRequest(`/journals/personal`)
    .then(({ data }) => {
      dispatch({
        type: GET_USER_POSTS,
        payload: data.posts,
      });
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getUserJournals()));
    })
    .finally(() => {
      dispatch({
        type: FETCHING_MORE,
        payload: false,
      });
    });
};

export const deleteUserPosts = (postId, toast) => (dispatch, getState) => {
  const { posts = [] } = getState().auth;
  const newPosts = posts.filter((post) => post?.id !== postId);

  dispatch({
    type: GET_USER_POSTS,
    payload: newPosts,
  });

  toast.show({
    text1: "Post deleted successfully",
    position: "bottom",
  });

  apiRequest(`/posts/${postId}`, "delete")
    .then(({ data }) => console.log("delete post", data))
    .catch(({ err }) => console.log("delete post error", err?.response));
};
