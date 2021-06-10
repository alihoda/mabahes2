import * as consts from "../constants/userConstants";

// Reducer for login
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case consts.USER_LOGIN_REQUEST:
    case consts.USER_LOGIN_RESET:
    case consts.USER_LOGOUT:
      return {};

    case consts.USER_LOGIN_SUCCESS:
      return {
        message: action.message,
        userInfo: action.user,
      };

    case consts.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// Register reducer
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case consts.USER_REGISTER_REQUEST:
      return { loading: true };

    case consts.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case consts.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case consts.USER_LOGOUT:
    case consts.USER_REGISTER_RESET:
      return {};

    default:
      return state;
  }
};

// Profile reducer
export const userDetailReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case consts.USER_DETAIL_REQUEST:
      return { ...state, loading: true };

    case consts.USER_DETAIL_SUCCESS:
      return { loading: false, user: action.payload };

    case consts.USER_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    case consts.USER_DETAIL_RESET:
      return { user: null };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case consts.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };

    case consts.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };

    case consts.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case consts.USER_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};
