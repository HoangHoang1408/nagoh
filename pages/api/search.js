import nextConnect from "next-connect";
import dbConnect from "../../config/dbConnect";
import { textSearchRooms } from "../../controllers/roomController";
import globalErrorHandler from "../../middlewares/error";

const handler = nextConnect({ onError: globalErrorHandler });
dbConnect();
handler.post(textSearchRooms);
export default handler;
