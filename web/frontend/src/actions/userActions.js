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
      payload: data,
    });

    // Store userInfo in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // Dispatch the type to USER_LOGIN_FAIL if an error occurred
    dispatch({
      type: consts.USER_LOGIN_FAIL,
      payload: error.response ? error.response.data.message : error.response.data.detail,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: consts.USER_LOGOUT });
};

// User register action
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
    console.log(error);
    dispatch({
      type: consts.USER_REGISTER_FAIL,
      payload: error.response ? error.response.data.message : error.response.data.detail,
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
