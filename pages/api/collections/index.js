import dbMiddleware from '@/middleware/dbMiddleware';
import { getCollections, createCollection } from '@/controllers/collectionController';
import RequestMethods from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";

const handler = async (req, res) => {
    if (req.method === RequestMethods.GET) {
        await getCollections(req, res);
    } else if (req.method === RequestMethods.POST) {
        await createCollection(req, res);
    } else {
        res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
    }
};

export default dbMiddleware(handler);