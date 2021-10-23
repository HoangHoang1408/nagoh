import nextConnect from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { getUserInfo } from "../../../controllers/authController";
import { isAuthenticated } from "../../../middlewares/auth";
import globalErrorHandler from "../../../middlewares/error";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler.use(isAuthenticated).get(getUserInfo);
export default handler;
