import connectDB from '@/utils/db';
import { getItem, updateItem } from '@/controllers/itemController';
import authMiddleware from '@/middleware/authMiddleware';
import roleMiddleware from '@/middleware/roleMiddleware';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from '@/constants/statusCodes';
import { updateItemSchema } from "@/validations/itemValidation";
import validateRequest from '@/validations/requestValidator';
import handler from '@/utils/handler';

await connectDB();

const requestHandler = async (req, res) => {
    switch (req.method) {
        case REQUEST_METHODS.GET:
            await getItem(req, res);
            break;
        case REQUEST_METHODS.PUT:
            await authMiddleware(req, res, async () => {
                await roleMiddleware(['admin', 'seller'])(req, res, async () => {
                    validateRequest(updateItemSchema)(req, res, async () => {
                        await updateItem(req, res);
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