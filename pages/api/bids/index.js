import { getBids, createBid } from '@/controllers/bidController';
import authMiddleware from '@/middleware/authMiddleware';
import { storeBidSchema } from '@/validations/bidValidation';
import validateRequest from '@/validations/requestValidator';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";
import handler from '@/utils/handler';

const requestHandler = async (req, res) => {
    switch (req.method) {
        case REQUEST_METHODS.GET:
            await getBids(req, res);
            break;
        case REQUEST_METHODS.POST:
            await authMiddleware(req, res, async () => {
                validateRequest(storeBidSchema)(req, res, async () => {
                    await createBid(req, res);
                });
            });
            break;
        default:
            res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
            break;
    }
};

const bidsHandler = (req, res) => handler(requestHandler, req, res);

export default bidsHandler;