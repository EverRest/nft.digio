import { getBids, createBid } from '@/controllers/bidController';
import authMiddleware from '@/middleware/authMiddleware';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";

const requestHandler = async (req, res) => {
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

const bidsHandler = async (req, res) => {
    try {
        await requestHandler(req, res);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export default bidsHandler;