import authMiddleware from '@/middleware/authMiddleware';
import roleMiddleware from '@/middleware/roleMiddleware';
import { getCollection, updateCollection, deleteCollection } from '@/controllers/collectionController';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";

const requestHandler = async (req, res) => {
    switch (req.method) {
        case REQUEST_METHODS.GET:
            await authMiddleware(req, res, async () => {
                await getCollection(req, res);
            });
            break;
        case REQUEST_METHODS.PUT:
            await authMiddleware(req, res, async () => {
                await roleMiddleware(['admin', 'editor'])(req, res, async () => {
                    await updateCollection(req, res);
                });
            });
            break;
        case REQUEST_METHODS.DELETE:
            await authMiddleware(req, res, async () => {
                await roleMiddleware(['admin'])(req, res, async () => {
                    await deleteCollection(req, res);
                });
            });
            break;
        default:
            res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
            break;
    }
};
const collectionHandler = async (req, res) => {
    try {
        await requestHandler(req, res);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export default collectionHandler;