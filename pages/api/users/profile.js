import authMiddleware from '@/middleware/authMiddleware';
import { getProfile, updateProfile } from '@/controllers/profileController';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from '@/constants/statusCodes';

const requestHandler = async (req, res) => {
    switch (req.method) {
        case REQUEST_METHODS.GET:
            await authMiddleware(req, res, async () => {
                await getProfile(req, res);
            });
            break;
        case REQUEST_METHODS.PUT:
            await authMiddleware(req, res, async () => {
                await updateProfile(req, res);
            });
            break;
        default:
            res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
            break;
    }
};

const profileHandler = async (req, res) => {
    try {
        await requestHandler(req, res);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export default profileHandler;