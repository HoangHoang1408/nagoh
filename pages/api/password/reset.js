import nextConnect from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { resetPassword } from "../../../controllers/authController";
import globalErrorHandler from "../../../middlewares/error";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler.post(resetPassword);
export default handler;
