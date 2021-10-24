import nextConnect from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { stripeCheckoutSession } from "../../../controllers/paymentController";
import { isAuthenticated } from "../../../middlewares/auth";
import globalErrorHandler from "../../../middlewares/error";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler.use(isAuthenticated).post(stripeCheckoutSession);

export default handler;
