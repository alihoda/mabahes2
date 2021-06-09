import * as consts from "../constants/userConstants";

// Reducer for login
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case consts.USER_LOGIN_REQUEST:
      return { loading: true };

    case consts.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case consts.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case consts.USER_LOGOUT:
      return {};

    case consts.USER_LOGIN_RESET:
      return {};

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
      return {};

    case consts.USER_REGISTER_RESET:
      return {};

    default:
      return state;
  }
};
