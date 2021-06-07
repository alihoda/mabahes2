import axios from "axios";

import * as consts from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: consts.PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/product");

    dispatch({
      type: consts.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: consts.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.detail : error.message,
    });
  }
};

export const productDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/product/${id}`);

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.detail : error.message,
    });
  }
};
