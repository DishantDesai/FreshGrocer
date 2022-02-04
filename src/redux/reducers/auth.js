import {
  SIGNIN_SUCCESS,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SIGNOUT_SUCCESS,
} from "../../utils/ActionTypes";

const INIT_STATE = {
  loader: false,
  user: null,
  isLogin: false,
  accessToken: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        user: action.payload,
        isLogin: true,
        loader: false,
      };
    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true,
      };
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false,
      };
    }
    case SIGNOUT_SUCCESS: {
      return {
        ...state,
        user: false,
        isLogin: false,
        accessToken: null,
      };
    }
    default:
      return state;
  }
};
