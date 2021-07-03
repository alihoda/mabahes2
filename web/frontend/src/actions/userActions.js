import axios from "axios";

import * as consts from "../constants/userConstants";

/**
 * Handle errors and convert them to list instead of string
 *
 * @param {dispatch} dispatch
 * @param {constant} type The constant which show the request
 * @param {string} error
 */
const errors = (dispatch, type, error) => {
  dispatch({
    type: type,
    payload: error.response.data.errors
      ? [].concat.apply([], Object.values(error.response.data.errors))
      : error.response.data.message.split(),
  });
};

/**
 * Handle user login
 * @param {Object} formData User inputs for login
 */
export const login = (formData) => async (dispatch) => {
  try {
    dispatch({ type: consts.USER_LOGIN_REQUEST });
    // Request header
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // Send post request
    const { data } = await axios.post("/api/login", formData, config);
    // Dispatch the type to USER_LOGIN_SUCCESS
    dispatch({
      type: consts.USER_LOGIN_SUCCESS,
      message: data.message,
      user: data.user,
    });

    // Store userInfo in local storage
    localStorage.setItem("userInfo", JSON.stringify(data.user));
    // Store token in local storage
    localStorage.setItem("token", data.token);
  } catch (error) {
    errors(dispatch, consts.USER_LOGIN_FAIL, error);
  }
};

/**
 * Handle user logout
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  dispatch({ type: consts.USER_LOGOUT });
};

/**
 * Handler register action.
 * @param {FormData} formData
 */
export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: consts.USER_REGISTER_REQUEST });
    // Request header
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // Send post request
    const { data } = await axios.post("/api/user", formData, config);

    dispatch({
      type: consts.USER_REGISTER_SUCCESS,
      payload: data,
    });
    // Login user
    dispatch(login({ username: formData.get("username"), password: formData.get("password") }));
  } catch (error) {
    errors(dispatch, consts.USER_REGISTER_FAIL, error);
  }
};

/**
 * Get user detail
 * @param {integer} id User id
 */
export const getUserDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: consts.USER_DETAIL_REQUEST });
    // Request header
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // Send get request
    const { data } = await axios.get(`/api/user/${id}`, config);
    // Update userDetails state
    dispatch({
      type: consts.USER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    errors(dispatch, consts.USER_DETAIL_FAIL, error);
  }
};

/**
 * Handle update user profile
 * @param {FormData} formData Form inputs
 */
export const updateUserProfile = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: consts.USER_UPDATE_PROFILE_REQUEST,
    });

    // Give token from local storage
    const token = localStorage.getItem("token");
    // Request header
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`/api/user/${formData.get("id")}`, formData, config);

    dispatch({
      type: consts.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    // Update userLogin state
    dispatch({
      type: consts.USER_LOGIN_SUCCESS,
      user: data.user,
    });
    // Update userInfo in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    errors(dispatch, consts.USER_UPDATE_PROFILE_FAIL, error);
  }
};

/**
 * Handle delete user profile
 * @param {integer} id User id
 */
export const userDeleteProfile = (id) => async (dispatch) => {
  try {
    // Dispatch user_delete_request
    dispatch({ type: consts.USER_DELETE_PROFILE_REQUEST });
    // Get token
    const token = localStorage.getItem("token");
    // Request header
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // Send delete request
    const { data } = await axios.delete(`/api/user/${id}`, config);
    // Dispatch user_delete_success
    dispatch({ type: consts.USER_DELETE_PROFILE_SUCCESS });
    // Reset userDetails state
    dispatch({ type: consts.USER_DETAIL_RESET });
    // Logout user
    dispatch(logout());
  } catch (error) {
    errors(dispatch, consts.USER_DELETE_PROFILE_FAIL, error);
  }
};
