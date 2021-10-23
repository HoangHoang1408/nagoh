import nextConnect from "next-connect";
import {
  adminCreateRoom,
  getAdminRooms,
} from "../../../../controllers/adminController";
import { limitRoles, isAuthenticated } from "../../../../middlewares/auth";
import globalErrorHandler from "../../../../middlewares/error";
import {
  processMultiFiles,
} from "../../../../middlewares/processFile";
import dbConnect from "../../../../config/dbConnect";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler
  .use(isAuthenticated, limitRoles("admin"))
  .get(getAdminRooms)
  .post(processMultiFiles("images"), adminCreateRoom);
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
