import nextConnect from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { getBookingDetails } from "../../../controllers/bookingController";
import { isAuthenticated } from "../../../middlewares/auth";
import globalErrorHandler from "../../../middlewares/error";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();
handler.use(isAuthenticated).get(getBookingDetails);
export default handler;
