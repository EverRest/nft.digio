import connectDB from '@/utils/db';
import { getItems, createItem } from '@/controllers/itemController';
import authMiddleware from '@/middleware/authMiddleware';
import roleMiddleware from '@/middleware/roleMiddleware';
import RequestMethods from "@/constants/requestMethods";
import STATUS_CODES from '@/constants/statusCodes';

await connectDB();

const requestHandler = async (req, res) => {
    switch (req.method) {
        case RequestMethods.GET:
            await getItems(req, res);
            break;
        case RequestMethods.POST:
            await authMiddleware(req, res, async () => {
                await roleMiddleware(['admin', 'seller'])(req, res, async () => {
                    await createItem(req, res);
                });
            });
            break;
        default:
            res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
            break;
    }
};

const itemsHandler = async (req, res) => {
    try {
        await requestHandler(req, res);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export default itemsHandler;