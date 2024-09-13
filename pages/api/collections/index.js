import authMiddleware from '@/middleware/authMiddleware';
import roleMiddleware from '@/middleware/roleMiddleware';
import { getCollection, createCollection } from '@/controllers/collectionController';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";
import { storeCollectionSchema } from "@/validations/collectionValidation";
import { validateRequest } from "@/validations/requestValidator";
import handler from '@/utils/handler';

const requestHandler = async (req, res) => {
    switch (req.method) {
        case REQUEST_METHODS.GET:
            await authMiddleware(req, res, async () => {
                await getCollection(req, res);
            });
            break;
        case REQUEST_METHODS.POST:
            await authMiddleware(req, res, async () => {
                await roleMiddleware(['admin'])(req, res, async () => {
                    validateRequest(storeCollectionSchema)(req, res, async () => {
                        await createCollection(req, res);
                    });
                });
            });
            break;
        default:
            res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
            break;
    }
};

const collectionHandler = (req, res) => handler(requestHandler, req, res);

export default collectionHandler;