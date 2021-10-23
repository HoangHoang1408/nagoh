import axios from "axios";
import {
  SEARCH_ROOMS_FAIL,
  SEARCH_ROOMS_REQUEST,
  SEARCH_ROOMS_SUCCESS,
} from "../constants/searchConstants";

export const searchRooms = (text) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_ROOMS_REQUEST,
    });
    const { data } = await axios.post("/api/search", { text });
    dispatch({
      type: SEARCH_ROOMS_SUCCESS,
      payload: data.rooms,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_ROOMS_FAIL,
      payload: error.response.data.messege,
    });
  }
};
