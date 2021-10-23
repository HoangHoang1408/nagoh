import absoluteUrl from "next-absolute-url";
import axios from "axios";
import {
  ALL_BOOKINGS_FAIL,
  ALL_BOOKINGS_REQUEST,
  ALL_BOOKINGS_SUCCESS,
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_SUCCESS,
} from "../constants/bookingConstants";

export const checkBooking = (bookingData) => async (dispatch) => {
  try {
    dispatch({
      type: CHECK_BOOKING_REQUEST,
    });
    const { data } = await axios.post("/api/bookings/check", bookingData);
    dispatch({
      type: CHECK_BOOKING_SUCCESS,
      payload: {
        isAvailable: data.isAvailable,
        message: data.message,
      },
    });
  } catch (err) {
    dispatch({
      type: CHECK_BOOKING_FAIL,
      payload: err.response.data.message,
    });
  }
};
export const getBookedDates = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/bookings/checkBookedDates?roomId=${id}`
    );
    dispatch({
      type: BOOKED_DATES_SUCCESS,
      payload: data.bookedDates,
    });
  } catch (err) {
    dispatch({
      type: BOOKED_DATES_FAIL,
      payload: err.response.data.message,
    });
  }
};
export const getAllBookings =
  ({ cookie, req }) =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);
      dispatch({
        type: ALL_BOOKINGS_REQUEST,
      });
      const { data } = await axios.get(`${origin}/api/bookings/me`, {
        headers: {
          cookie,
        },
      });
      dispatch({
        type: ALL_BOOKINGS_SUCCESS,
        payload: data.bookings,
      });
    } catch (err) {
      dispatch({
        type: ALL_BOOKINGS_FAIL,
        payload: err.response.data.message,
      });
    }
  };
export const getBookingDetails =
  ({ cookie, req, id }) =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);
      const { data } = await axios.get(`${origin}/api/bookings/${id}`, {
        headers: {
          cookie,
        },
      });
      dispatch({
        type: BOOKING_DETAILS_SUCCESS,
        payload: data.booking,
      });
    } catch (err) {
      dispatch({
        type: BOOKING_DETAILS_FAIL,
        payload: err.response.data.message,
      });
    }
  };
