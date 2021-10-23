import nextConnect from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { registerUser } from "../../../controllers/authController";
import globalErrorHandler from "../../../middlewares/error";
import { processSingleFile } from "../../../middlewares/processFile";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler.post(processSingleFile("image"), registerUser);
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
