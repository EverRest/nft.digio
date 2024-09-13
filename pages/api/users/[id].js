// pages/api/users/[id].js
import authMiddleware from '@/middleware/authMiddleware';
import { getUser, updateUser, deleteUser } from '@/controllers/userController';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";
import { updateUserSchema } from "@/validations/userValidation";
import handler from '@/utils/handler';
import validateRequest from "@/validations/requestValidator";

const requestHandler = async (req, res) => {
    switch (req.method) {
        case REQUEST_METHODS.GET:
            await authMiddleware(req, res, async () => {
                await getUser(req, res);
            });
            break;
        case REQUEST_METHODS.PUT:
            await authMiddleware(req, res, async () => {
                validateRequest(updateUserSchema)(req, res, async () => {
                    await updateUser(req, res);
                });
            });
            break;
        case REQUEST_METHODS.DELETE:
            await authMiddleware(req, res, async () => {
                await deleteUser(req, res);
            });
            break;
        default:
            res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
            break;
    }
};

const userHandler = (req, res) => handler(requestHandler, req, res);

export default userHandler;