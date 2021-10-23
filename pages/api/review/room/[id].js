import nextConnect from "next-connect";
import { getRoomReviews } from "../../../../controllers/reviewController";
import dbConnect from "../../../../config/dbConnect";
import globalErrorHandler from "../../../../middlewares/error";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler.post(getRoomReviews);
export default handler;
