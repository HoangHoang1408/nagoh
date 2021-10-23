import nextConnect from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { checkBooking } from "../../../controllers/bookingController";

import globalErrorHandler from "../../../middlewares/error";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler.post(checkBooking);
export default handler;
