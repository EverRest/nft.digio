import dbMiddleware from '@/middleware/dbMiddleware';
import authMiddleware from '@/middleware/authMiddleware';
import { getProfile, updateProfile } from '@/controllers/profileController';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";

const handler = async (req, res) => {
    if (req.method === REQUEST_METHODS.GET) {
        await authMiddleware(req, res, async () => {
            await getProfile(req, res);
        });
    } else if (req.method === REQUEST_METHODS.PUT) {
        await authMiddleware(req, res, async () => {
            await updateProfile(req, res);
        });
    } else {
        res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
    }
};

export default dbMiddleware(handler);