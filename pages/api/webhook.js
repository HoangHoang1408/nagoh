import nextConnect from "next-connect";
import dbConnect from "../../config/dbConnect";
import { webhookCheckOut } from "../../controllers/paymentController";
import globalErrorHandler from "../../middlewares/error";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler.post(webhookCheckOut);
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
