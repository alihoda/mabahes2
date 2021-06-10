import axios from "axios";

import * as consts from "../constants/userConstants";

export const login = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: consts.USER_LOGIN_REQUEST,
    });
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
    const errors = [].concat.apply([], Object.values(error.response.data.errors));

    dispatch({
      type: consts.USER_LOGIN_FAIL,
      payload: error.response && errors,
    });
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
    dispatch({
      type: consts.USER_REGISTER_REQUEST,
    });

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

    dispatch({
      type: consts.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errors = [].concat.apply([], Object.values(error.response.data.errors));

    dispatch({
      type: consts.USER_REGISTER_FAIL,
      payload: error.response && errors,
    });
  }
};

// User profile action
export const getUserDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: consts.USER_DETAIL_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/user/${id}`, config);

    dispatch({
      type: consts.USER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: consts.USER_DETAIL_FAIL,
      payload: error.response ? error.response.data.message : error.response.data.detail,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
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

    const { data } = await axios.put(`/api/user/${user.id}`, user, config);
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
    const errors = [].concat.apply([], Object.values(error.response.data.errors));

    dispatch({
      type: consts.USER_UPDATE_PROFILE_FAIL,
      payload: error.response && errors,
    });
  }
};
