import nextConnect from "next-connect";
import dbConnect from "../../../config/dbConnect";
import {
  deleteRoom,
  getRoom,
  updateRoom,
} from "../../../controllers/roomController";
import globalErrorHandler from "../../../middlewares/error";

const handler = nextConnect({ onError: globalErrorHandler });
dbConnect();
handler.get(getRoom).patch(updateRoom).delete(deleteRoom);

export default handler;
