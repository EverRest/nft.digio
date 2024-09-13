import {getBid, updateBid} from '@/controllers/bidController';
import authMiddleware from '@/middleware/authMiddleware';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";
import {updateBidSchema} from "@/validations/bidValidation";
import validateRequest from "@/validations/requestValidator";
import handler from '@/utils/handler';

const requestHandler = async (req, res) => {
    switch (req.method) {
        case REQUEST_METHODS.GET:
            await getBid(req, res);
            break;
        case REQUEST_METHODS.PUT:
            await authMiddleware(req, res, async () => {
                validateRequest(updateBidSchema)(req, res, async () => {
                    await updateBid(req, res);
                });
                await updateBid(req, res);
            });
            break;
        default:
            res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
            break;
    }
};

const bidsHandler = (req, res) => handler(requestHandler, req, res);

export default bidsHandler;