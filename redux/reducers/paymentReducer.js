import {
  GET_CHECKOUT_FAIL,
  GET_CHECKOUT_REQUEST,
  GET_CHECKOUT_RESET,
  GET_CHECKOUT_SUCCESS,
} from "../constants/paymentConstants";

export const getCheckoutReducer = (state = null, action) => {
  switch (action.type) {
    case GET_CHECKOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CHECKOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_CHECKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        session: action.payload,
      };
    case GET_CHECKOUT_RESET:
      return {
        ...state,
        loading: null,
        error: null,
        session: null,
      };
    default:
      return { ...state };
  }
};
