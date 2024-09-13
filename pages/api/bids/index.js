import { getBids, createBid } from '@/controllers/bidController';
import authMiddleware from '@/middleware/authMiddleware';
import { bidSchema, validateRequest } from '@/middleware/bidValidationSchema';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";

const requestHandler = async (req, res) => {
    switch (req.method) {
        case REQUEST_METHODS.GET:
            await getBids(req, res);
            break;
        case REQUEST_METHODS.POST:
            await authMiddleware(req, res, async () => {
                validateRequest(bidSchema)(req, res, async () => {
                    await createBid(req, res);
                });
            });
            break;
        default:
            res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
            break;
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