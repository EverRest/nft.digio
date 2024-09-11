import connectDB from '@/utils/db';
import { getItems, createItem } from '@/controllers/itemController';
import authMiddleware from '@/middleware/authMiddleware';
import roleMiddleware from '@/middleware/roleMiddleware';
import RequestMethods from "@/constants/requestMethods";
import dbMiddleware from "@/middleware/dbMiddleware";

await connectDB();

const handler = async (req, res) => {
    if (req.method === RequestMethods.GET) {
        await getItems(req, res);
    } else if (req.method === RequestMethods.POST) {
        await authMiddleware(req, res, async () => {
            await roleMiddleware(['admin', 'seller'])(req, res, async () => {
                await createItem(req, res);
            });
        });
    } else {
        res.status(405).end();
    }
};

export default dbMiddleware(handler);