import * as consts from "../constants/productConstants";

export const productListReducer = (state = { products: null }, action) => {
  switch (action.type) {
    case consts.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };

    case consts.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case consts.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailReducer = (state = { product: null }, action) => {
  switch (action.type) {
    case consts.PRODUCT_DETAIL_REQUEST:
      return { loading: true, ...state };

    case consts.PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload };

    case consts.PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case consts.PRODUCT_UPDATE_REQUEST:
      return { loading: true };

    case consts.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case consts.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case consts.PRODUCT_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case consts.PRODUCT_DELETE_REQUEST:
      return { loading: true };

    case consts.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case consts.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    case consts.PRODUCT_DELETE_RESET:
      return {};

    default:
      return state;
  }
};
