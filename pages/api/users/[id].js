import dbMiddleware from '@/middleware/dbMiddleware';
import authMiddleware from '@/middleware/authMiddleware';
import {getUser, updateUser, deleteUser} from '@/controllers/userController';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";


const handler = async (req, res) => {
    if (req.method === REQUEST_METHODS.GET) {
        await authMiddleware(req, res, async () => {
            await getUser(req, res);
        });
    } else if (req.method === REQUEST_METHODS.PUT) {
        await authMiddleware(req, res, async () => {
            await updateUser(req, res);
        });
    } else if (req.method === REQUEST_METHODS.DELETE) {
        await authMiddleware(req, res, async () => {
            await deleteUser(req, res);
        });
    } else {
        res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
    }
};

export default dbMiddleware(handler);