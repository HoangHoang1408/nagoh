import nextConnect from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { getRoomReviews } from "../../../controllers/reviewController";
import { isAuthenticated } from "../../../middlewares/auth";
import globalErrorHandler from "../../../middlewares/error";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler.use(isAuthenticated).get(getRoomReviews);
export default handler;
