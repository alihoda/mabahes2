import axios from "axios";

import * as consts from "../constants/productConstants";

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
 * Retrieve all products
 */
export const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: consts.PRODUCT_LIST_REQUEST });
    // Send get request
    const { data } = await axios.get("/api/product");
    // Update productList state
    dispatch({
      type: consts.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    errors(dispatch, consts.PRODUCT_LIST_FAIL, error);
  }
};

/**
 * Retrieve product
 * @param {integer} id Product id
 */
export const productDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: consts.PRODUCT_DETAIL_REQUEST });
    // Send get request
    const { data } = await axios.get(`/api/product/${id}`);
    // Update productDetail state
    dispatch({
      type: consts.PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    errors(dispatch, consts.PRODUCT_DETAIL_FAIL, error);
  }
};

/**
 * Update Product
 * @param {FormData} formData form inputs
 * @param {string} request CREATE or UPDATE
 */
export const updateProduct = (formData, request) => async (dispatch) => {
  try {
    dispatch({
      type: consts.PRODUCT_UPDATE_REQUEST,
    });
    // Get token from local storage
    const token = localStorage.getItem("token");
    // Request header
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // Send request based on request type
    const { data } =
      request === "CREATE"
        ? await axios.post("/api/product", formData, config)
        : await axios.post(`/api/product/${formData.get("id")}`, formData, config);

    // Update productUpdate state
    dispatch({ type: consts.PRODUCT_UPDATE_SUCCESS, payload: data.product });
  } catch (error) {
    errors(dispatch, consts.PRODUCT_UPDATE_FAIL, error);
  }
};

/**
 * Delete product
 * @param {integer} id Product id
 */
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: consts.PRODUCT_DELETE_REQUEST });
    // Get token from local storage
    const token = localStorage.getItem("token");
    // Request header
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // Send delete request
    const { data } = await axios.delete(`/api/product/${id}`, config);

    // Update productDelete state
    dispatch({
      type: consts.PRODUCT_DELETE_SUCCESS,
      message: data,
    });
  } catch (error) {
    errors(dispatch, consts.PRODUCT_DELETE_FAIL, error);
  }
};
