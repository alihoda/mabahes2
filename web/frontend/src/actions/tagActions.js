import axios from "axios";

import * as consts from "../constants/tagConstants";

/**
 * Retrieve all tags or a single tag with its products
 *
 * @param {string} request The type of request: LIST or DETAIL
 * @param {integer} id If the type is DETAIL, it must be assigned
 */
export const getTagInfo = (request, id) => async (dispatch) => {
  try {
    dispatch({ type: request === "LIST" ? consts.TAG_LIST_REQUEST : consts.TAG_DETAIL_REQUEST });

    // Send the get request based on request type
    const { data } =
      request === "LIST" ? await axios.get("/api/tag") : await axios.get(`/api/tag/${id}`);

    dispatch({
      type: request === "LIST" ? consts.TAG_LIST_SUCCESS : consts.TAG_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: request === "LIST" ? consts.TAG_LIST_FAIL : consts.TAG_DETAIL_FAIL,
      payload: error.response.data.errors
        ? [].concat.apply([], Object.values(error.response.data.errors))
        : error.response.data.message.split(),
    });
  }
};
