import connectDB from '@/utils/db';
import { getItems, createItem } from '@/controllers/itemController';
import authMiddleware from '@/middleware/authMiddleware';
import roleMiddleware from '@/middleware/roleMiddleware';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from '@/constants/statusCodes';
import validateRequest from '@/validations/requestValidator';
import { storeBidSchema } from '@/validations/bidValidation';
import handler from '@/utils/handler';

await connectDB();

const requestHandler = async (req, res) => {
    switch (req.method) {
        case REQUEST_METHODS.GET:
            await getItems(req, res);
            break;
        case REQUEST_METHODS.POST:
            await authMiddleware(req, res, async () => {
                await roleMiddleware(['admin', 'seller'])(req, res, async () => {
                    validateRequest(storeBidSchema)(req, res, async () => {
                        await createItem(req, res);
                    });
                });
            });
            break;
        default:
            res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
            break;
    }
};

const itemsHandler = (req, res) => handler(requestHandler, req, res);

export default itemsHandler;