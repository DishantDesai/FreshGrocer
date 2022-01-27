import {
  SIGNIN_SUCCESS,
  ON_SHOW_LOADER,
  ON_HIDE_LOADER,
  SIGNOUT_SUCCESS,
} from "../../utils/ActionTypes";

export const signInSuccess = (authUser) => {
  console.log("authUser", authUser);
  return {
    type: SIGNIN_SUCCESS,
    payload: authUser,
  };
};

export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER,
  };
};

export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER,
  };
};
export const signOutSuccess = () => {
  return {
    type: SIGNOUT_SUCCESS,
  };
};
