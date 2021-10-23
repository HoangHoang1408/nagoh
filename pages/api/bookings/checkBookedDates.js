import nextConnect from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { checkBookedDatesOfRoom } from "../../../controllers/bookingController";

import globalErrorHandler from "../../../middlewares/error";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler.get(checkBookedDatesOfRoom);
export default handler;
