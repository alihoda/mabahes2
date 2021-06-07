import axios from "axios";

import * as consts from "../constants/userConstants";

export const login = (username, password) => async (dispatch) => {
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
    const { data } = await axios.post(
      "/api/users/login/",
      {
        username: username,
        password: password,
      },
      config
    );
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
      payload:
        error.response && error.response.data.message ? error.response.data.detail : error.message,
    });
  }
};
