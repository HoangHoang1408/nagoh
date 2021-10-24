import axios from "axios";
import {
  GET_CHECKOUT_FAIL,
  GET_CHECKOUT_REQUEST,
  GET_CHECKOUT_SUCCESS,
} from "../constants/paymentConstants";

export const getStripeCheckout =
  ({ checkInDate, checkOutDate, roomId }) =>
  async (dispatch) => {
    try {
      console.log(checkInDate, checkOutDate, roomId);
      dispatch({
        type: GET_CHECKOUT_REQUEST,
      });
      const { data } = await axios.post(`/api/checkout_session/${roomId}`, {
        checkInDate,
        checkOutDate,
      });
      dispatch({
        type: GET_CHECKOUT_SUCCESS,
        payload: data.session,
      });
    } catch (err) {
      dispatch({
        type: GET_CHECKOUT_FAIL,
        payload: err.response.data.message,
      });
    }
  };
