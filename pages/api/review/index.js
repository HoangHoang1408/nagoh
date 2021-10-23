import nextConnect from "next-connect";
import dbConnect from "../../../config/dbConnect";
import {
  createReview,
  updateReview,
  deleteReview,
} from "../../../controllers/reviewController";
import { isAuthenticated } from "../../../middlewares/auth";
import globalErrorHandler from "../../../middlewares/error";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler
  .use(isAuthenticated)
  .post(createReview)
  .put(updateReview)
  .delete(deleteReview);
export default handler;
