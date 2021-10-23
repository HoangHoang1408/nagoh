import nextConnect from "next-connect";
import {
  deleteAdminRoom,
  getAdminRoom,
  updateAdminRoom,
} from "../../../../controllers/adminController";
import { limitRoles, isAuthenticated } from "../../../../middlewares/auth";
import { processMultiFiles } from "../../../../middlewares/processFile";
import globalErrorHandler from "../../../../middlewares/error";
import dbConnect from "../../../../config/dbConnect";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler
  .use(isAuthenticated, limitRoles("admin"))
  .get(getAdminRoom)
  .put(processMultiFiles("images"), updateAdminRoom)
  .delete(deleteAdminRoom);

export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
