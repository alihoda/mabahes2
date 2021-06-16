import axios from "axios";
import { PRODUCT_DETAIL_RESET } from "../constants/productConstants";

import * as consts from "../constants/userConstants";

const errors = (dispatch, type, error) => {
  dispatch({
    type: type,
    payload: error.response.data.errors
      ? [].concat.apply([], Object.values(error.response.data.errors))
      : error.response.data.message.split(),
  });
};

export const login = (formData) => async (dispatch) => {
  try {
    dispatch({ type: consts.USER_LOGIN_REQUEST });
    // Create header to the request
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // Send post request and give data
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

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  dispatch({ type: consts.USER_LOGOUT });
};

/**
 * Handler register action.
 * @param regData
 * @returns
 */
export const register = (regData) => async (dispatch) => {
  try {
    dispatch({ type: consts.USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post("/api/user", regData, config);

    dispatch({
      type: consts.USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch(login({ username: regData.get("username"), password: regData.get("password") }));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    errors(dispatch, consts.USER_REGISTER_FAIL, error);
  }
};

// User profile action
export const getUserDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: consts.USER_DETAIL_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/user/${id}`, config);

    dispatch({ type: PRODUCT_DETAIL_RESET });

    dispatch({
      type: consts.USER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    errors(dispatch, consts.USER_DETAIL_FAIL, error);
  }
};

export const updateUserProfile = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: consts.USER_UPDATE_PROFILE_REQUEST,
    });

    // Give token from local storage
    const token = localStorage.getItem("token");

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

    dispatch({
      type: consts.USER_LOGIN_SUCCESS,
      user: data.user,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    errors(dispatch, consts.USER_UPDATE_PROFILE_FAIL, error);
  }
};
