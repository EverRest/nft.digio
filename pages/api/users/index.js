import authMiddleware from '@/middleware/authMiddleware';
import roleMiddleware from '@/middleware/roleMiddleware';
import {getUsers} from '@/controllers/userController';
import REQUEST_METHODS from "@/constants/requestMethods";
import ROLES from "@/constants/roles";
import STATUS_CODES from "@/constants/statusCodes";

const requestHandler = async (req, res) => {
    if (req.method === REQUEST_METHODS.GET) {
        await authMiddleware(req, res, async () => {
            await roleMiddleware([ROLES.ADMIN])(req, res, async () => {
                await getUsers(req, res);
            });
        });
    } else {
        res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
    }
};

const usersHandler = async (req, res) => {
    try {
        await requestHandler(req, res);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message: 'Internal Server Error'});
    }
};

export default usersHandler;