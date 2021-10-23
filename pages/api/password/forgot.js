import nextConnect from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { forgotPassword } from "../../../controllers/authController";
import globalErrorHandler from "../../../middlewares/error";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler.post(forgotPassword);
export default handler;
