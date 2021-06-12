import * as consts from "../constants/tagConstants";

export const tagListReducer = (state = { tags: null }, action) => {
  switch (action.type) {
    case consts.TAG_LIST_REQUEST:
      return { loading: true, tags: [] };

    case consts.TAG_LIST_SUCCESS:
      return { loading: false, tags: action.payload };

    case consts.TAG_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const tagDetailReducer = (state = { tag: null }, action) => {
  switch (action.type) {
    case consts.TAG_DETAIL_REQUEST:
      return { loading: true, ...state };

    case consts.TAG_DETAIL_SUCCESS:
      return { loading: false, tag: action.payload };

    case consts.TAG_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
