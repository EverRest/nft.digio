import authMiddleware from '@/middleware/authMiddleware';
import roleMiddleware from '@/middleware/roleMiddleware';
import { getUsers } from '@/controllers/userController';
import REQUEST_METHODS from "@/constants/requestMethods";
import ROLES from "@/constants/roles";
import STATUS_CODES from "@/constants/statusCodes";
import handler from '@/utils/handler';

const requestHandler = async (req, res) => {
    switch (req.method) {
        case REQUEST_METHODS.GET:
            await authMiddleware(req, res, async () => {
                await roleMiddleware([ROLES.USER])(req, res, async () => {
                    await getUsers(req, res);
                });
            });
            break;
        default:
            res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
            break;
    }
};

const usersHandler = (req, res) => handler(requestHandler, req, res);

export default usersHandler;