import nextConnect from "next-connect";

import { limitRoles, isAuthenticated } from "../../../../middlewares/auth";
import globalErrorHandler from "../../../../middlewares/error";
import dbConnect from "../../../../config/dbConnect";
import { adminDeleteBooking } from "../../../../controllers/adminController";
import { getBookingDetails } from "../../../../controllers/bookingController";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler
  .use(isAuthenticated, limitRoles("admin"))
  .get(getBookingDetails)
  .delete(adminDeleteBooking);

export default handler;
