import nextConnect from "next-connect";
import { limitRoles, isAuthenticated } from "../../../../middlewares/auth";
import globalErrorHandler from "../../../../middlewares/error";
import dbConnect from "../../../../config/dbConnect";
import { adminGetUsers } from "../../../../controllers/adminController";

const handler = nextConnect({ onError: globalErrorHandler });

dbConnect();

handler.use(isAuthenticated, limitRoles("admin")).get(adminGetUsers);
export default handler;
