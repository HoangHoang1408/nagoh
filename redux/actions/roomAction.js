import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  CLEAR_ERRORS,
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_SUCCESS,
} from "../constants/roomConstants";

// get all rooms
export const getAllRooms = (req, query) => async (dispatch) => {
  try {
    const { host } = absoluteUrl(req);
    const { location, numOfBeds, category } = query;
    const res = await axios.get(
      `http://${host}/api/rooms/?page=${query.page}` +
        (location ? `&location=${location}` : "") +
        (numOfBeds ? `&numOfBeds=${numOfBeds}` : "") +
        (category ? `&category=${category}` : "")
    );
    const data = res.data;
    dispatch({
      type: ALL_ROOMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ROOMS_FAIL,
      payload: error.response.data.messege,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// get Room detail
export const getRoomDetails = (req, id) => async (dispatch) => {
  try {
    const { host } = absoluteUrl(req);
    const { data } = await axios.get(`http://${host}/api/rooms/${id}`);
    dispatch({
      type: ROOM_DETAILS_SUCCESS,
      payload: data.room,
    });
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAIL,
      payload: error.response.data.messege,
    });
  }
};
