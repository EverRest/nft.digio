import { getCollections, createCollection } from '@/controllers/collectionController';
import RequestMethods from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";

const requestHandler = async (req, res) => {
    if (req.method === RequestMethods.GET) {
        await getCollections(req, res);
    } else if (req.method === RequestMethods.POST) {
        await createCollection(req, res);
    } else {
        res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
    }
};

const collectionsHandler = async (req, res) => {
    try {
        await requestHandler(req, res);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export default collectionsHandler;