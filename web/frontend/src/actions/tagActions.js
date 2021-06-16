import axios from "axios";

import * as consts from "../constants/tagConstants";

export const getTagInfo = (request, id) => async (dispatch) => {
  try {
    dispatch({ type: request === "LIST" ? consts.TAG_LIST_REQUEST : consts.TAG_DETAIL_REQUEST });

    const { data } =
      request === "LIST" ? await axios.get("/api/tag") : await axios.get(`/api/tag/${id}`);

    dispatch({
      type: request === "LIST" ? consts.TAG_LIST_SUCCESS : consts.TAG_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errors = [].concat.apply([], Object.values(error.response.data.errors));

    dispatch({
      type: request === "LIST" ? consts.TAG_LIST_FAIL : consts.TAG_DETAIL_FAIL,
      payload: errors,
    });
  }
};
