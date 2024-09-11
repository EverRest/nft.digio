import { getBids, createBid } from '@/controllers/bidController';
import authMiddleware from '@/middleware/authMiddleware';
import dbMiddleware from '@/middleware/dbMiddleware';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";

const handler = async (req, res) => {
    if (req.method === REQUEST_METHODS.GET) {
        await getBids(req, res);
    } else if (req.method === REQUEST_METHODS.POST) {
        await authMiddleware(req, res, async () => {
            await createBid(req, res);
        });
    } else {
        res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
    }
};

export default dbMiddleware(handler);