import nextConnect from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { getAllRooms, newRoom } from "../../../controllers/roomController";
import globalErrorHandler from "../../../middlewares/error";

const handler = nextConnect({ onError: globalErrorHandler });
dbConnect();
handler.get(getAllRooms).post(newRoom);
export default handler;
