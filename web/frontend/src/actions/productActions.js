import axios from "axios";

import * as consts from "../constants/productConstants";

const errors = (dispatch, type, error) => {
  dispatch({
    type: type,
    payload: error.response.data.errors
      ? [].concat.apply([], Object.values(error.response.data.errors))
      : error.response.data.message.split(),
  });
};

export const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: consts.PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/product");

    dispatch({
      type: consts.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    errors(dispatch, consts.PRODUCT_LIST_FAIL, error);
  }
};

export const productDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: consts.PRODUCT_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/product/${id}`);

    dispatch({
      type: consts.PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    errors(dispatch, consts.PRODUCT_DETAIL_FAIL, error);
  }
};

export const updateProduct = (formData, request) => async (dispatch) => {
  try {
    dispatch({
      type: consts.PRODUCT_UPDATE_REQUEST,
    });
    // Give token from local storage
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } =
      request === "CREATE"
        ? await axios.post("/api/product", formData, config)
        : await axios.post(`/api/product/${formData.get("id")}`, formData, config);

    dispatch({ type: consts.PRODUCT_UPDATE_SUCCESS, payload: data.product });
  } catch (error) {
    errors(dispatch, consts.PRODUCT_UPDATE_FAIL, error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: consts.PRODUCT_DELETE_REQUEST });

    // Give token from local storage
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/product/${id}`, config);

    dispatch({
      type: consts.PRODUCT_DELETE_SUCCESS,
      message: data,
    });
  } catch (error) {
    errors(dispatch, consts.PRODUCT_DELETE_FAIL, error);
  }
};
