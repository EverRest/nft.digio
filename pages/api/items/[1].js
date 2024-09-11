import connectDB from '@/utils/db';
import { getItem, updateItem, deleteItem } from '@/controllers/itemController';
import authMiddleware from '@/middleware/authMiddleware';
import roleMiddleware from '@/middleware/roleMiddleware';
import REQUEST_METHODS from "@/constants/requestMethods";
import dbMiddleware from "@/middleware/dbMiddleware";
import STATUS_CODES from "@/constants/statusCodes";

await connectDB();

const handler = async (req, res) => {
    if (req.method === REQUEST_METHODS.GET) {
        await getItem(req, res);
    } else if (req.method === REQUEST_METHODS.PUT) {
        await authMiddleware(req, res, async () => {
            await roleMiddleware(['admin', 'seller'])(req, res, async () => {
                await updateItem(req, res);
            });
        });
    } else if (req.method === REQUEST_METHODS.DELETE) {
        await authMiddleware(req, res, async () => {
            await roleMiddleware(['admin'])(req, res, async () => {
                await deleteItem(req, res);
            });
        });
    } else {
        res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
    }
};

export default dbMiddleware(handler);