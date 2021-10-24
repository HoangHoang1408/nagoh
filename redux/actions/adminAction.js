import axios from "axios";
import {
  ADIMIN_CREATE_ROOM_FAIL,
  ADIMIN_CREATE_ROOM_REQUEST,
  ADIMIN_CREATE_ROOM_RESET,
  ADIMIN_CREATE_ROOM_SUCCESS,
  ADIMIN_ROOMS_FAIL,
  ADIMIN_ROOMS_REQUEST,
  ADIMIN_ROOMS_SUCCESS,
  ADMIN_DELETE_BOOKING_FAIL,
  ADMIN_DELETE_BOOKING_REQUEST,
  ADMIN_DELETE_BOOKING_SUCCESS,
  ADMIN_DELETE_REVIEW_FAIL,
  ADMIN_DELETE_REVIEW_REQUEST,
  ADMIN_DELETE_REVIEW_SUCCESS,
  ADMIN_DELETE_ROOM_FAIL,
  ADMIN_DELETE_ROOM_REQUEST,
  ADMIN_DELETE_ROOM_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_GET_BOOKINGS_FAIL,
  ADMIN_GET_BOOKINGS_REQUEST,
  ADMIN_GET_BOOKINGS_SUCCESS,
  ADMIN_GET_BOOKING_FAIL,
  ADMIN_GET_BOOKING_REQUEST,
  ADMIN_GET_BOOKING_SUCCESS,
  ADMIN_GET_REVIEWS_FAIL,
  ADMIN_GET_REVIEWS_REQUEST,
  ADMIN_GET_REVIEWS_SUCCESS,
  ADMIN_GET_ROOM_FAIL,
  ADMIN_GET_ROOM_REQUEST,
  ADMIN_GET_ROOM_SUCCESS,
  ADMIN_GET_USERS_FAIL,
  ADMIN_GET_USERS_REQUEST,
  ADMIN_GET_USERS_SUCCESS,
  ADMIN_UPDATE_ROOM_FAIL,
  ADMIN_UPDATE_ROOM_REQUEST,
  ADMIN_UPDATE_ROOM_RESET,
  ADMIN_UPDATE_ROOM_SUCCESS,
} from "../constants/adminConstants";

export const adminRooms = () => async (dispatch) => {
  try {
    dispatch({
      type: ADIMIN_ROOMS_REQUEST,
    });
    const { data } = await axios.get("/api/admin/rooms");
    dispatch({
      type: ADIMIN_ROOMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADIMIN_ROOMS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const adminCreateRoom = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADIMIN_CREATE_ROOM_REQUEST,
    });
    await axios.post("/api/admin/rooms", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: ADIMIN_CREATE_ROOM_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADIMIN_CREATE_ROOM_FAIL,
      payload: error.response.data.message,
    });
  } finally {
    dispatch({
      type: ADIMIN_CREATE_ROOM_RESET,
    });
  }
};
export const adminGetRoom = (roomId) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_GET_ROOM_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/rooms/${roomId}`);
    dispatch({
      type: ADMIN_GET_ROOM_SUCCESS,
      payload: data.room,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const adminUpdateRoom = (roomId, formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_ROOM_REQUEST,
    });
    await axios.put(`/api/admin/rooms/${roomId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: ADMIN_UPDATE_ROOM_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_ROOM_FAIL,
      payload: error.response.data.message,
    });
  } finally {
    dispatch({
      type: ADMIN_UPDATE_ROOM_RESET,
    });
  }
};
export const adminDeleteRoom = (roomId) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_DELETE_ROOM_REQUEST,
    });
    await axios.delete(`/api/admin/rooms/${roomId}`);
    dispatch({
      type: ADMIN_DELETE_ROOM_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const adminGetBookings = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_GET_BOOKINGS_REQUEST,
    });
    const { data } = await axios.get("/api/admin/bookings");
    dispatch({
      type: ADMIN_GET_BOOKINGS_SUCCESS,
      payload: data.bookings,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_BOOKINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const adminDeleteBooking = (bookingId) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_DELETE_BOOKING_REQUEST,
    });
    await axios.delete(`/api/admin/bookings/${bookingId}`);
    dispatch({
      type: ADMIN_DELETE_BOOKING_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const adminGetBooking = (bookingId) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_GET_BOOKING_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/bookings/${bookingId}`);
    dispatch({
      type: ADMIN_GET_BOOKING_SUCCESS,
      payload: data.booking,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminGetReviews = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_GET_REVIEWS_REQUEST,
    });
    const { data } = await axios.get("/api/admin/reviews");
    dispatch({
      type: ADMIN_GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const adminDeleteReview = (reviewId) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_DELETE_REVIEW_REQUEST,
    });
    await axios.delete(`/api/admin/reviews/${reviewId}`);
    dispatch({
      type: ADMIN_DELETE_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminGetUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_GET_USERS_REQUEST,
    });
    const { data } = await axios.get("/api/admin/users");
    dispatch({
      type: ADMIN_GET_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const adminDeleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_DELETE_USER_REQUEST,
    });
    await axios.delete(`/api/admin/users/${userId}`);
    dispatch({
      type: ADMIN_DELETE_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
