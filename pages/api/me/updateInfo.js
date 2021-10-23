import nextConnect from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { updateProfile } from "../../../controllers/authController";
import { isAuthenticated } from "../../../middlewares/auth";
import globalErrorHandler from "../../../middlewares/error";
import { processSingleFile } from "../../../middlewares/processFile";
const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler.use(isAuthenticated).put(processSingleFile("image"), updateProfile);
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
