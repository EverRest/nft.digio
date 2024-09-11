import { getCollection, updateCollection, deleteCollection } from '@/controllers/collectionController';
import RequestMethods from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";

const requestHandler = async (req, res) => {
    if (req.method === RequestMethods.GET) {
        await getCollection(req, res);
    } else if (req.method === RequestMethods.PUT) {
        await updateCollection(req, res);
    } else if (req.method === RequestMethods.DELETE) {
        await deleteCollection(req, res);
    } else {
        res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
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