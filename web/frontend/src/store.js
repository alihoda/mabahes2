import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import * as productRed from "./reducers/productReducers";
import * as userRed from "./reducers/userReducers";

const reducer = combineReducers({
  // Product reducers
  productList: productRed.productListReducer,
  productDetails: productRed.productDetailReducer,
  // Auth reducer
  userLogin: userRed.userLoginReducer,
});

// Get userInfo from local storage
const userInfoFromStorage = localStorage.getItem("userInfo");
const userInfo = userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null;

// Initial state
const initialState = {
  userLogin: { userInfo: userInfo },
};
// Middleware
const middleware = [thunk];
// Store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
