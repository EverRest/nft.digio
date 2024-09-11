import dbMiddleware from "@/middleware/dbMiddleware";
import {getBid, updateBid, deleteBid} from '@/controllers/bidController';
import authMiddleware from '@/middleware/authMiddleware';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";

const handler = async (req, res) => {
    if (req.method === REQUEST_METHODS.GET) {
        await getBid(req, res);
    } else if (req.method === REQUEST_METHODS.PUT) {
        await authMiddleware(req, res, async () => {
            await updateBid(req, res);
        });
    } else if (req.method === REQUEST_METHODS.DELETE) {
        await authMiddleware(req, res, async () => {
            await deleteBid(req, res);
        });
    } else {
        res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
    }
};

export default dbMiddleware(handler);