import dbMiddleware from '@/middleware/dbMiddleware';
import { getTransaction } from '@/controllers/transactionController';
import RequestMethods from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";

const handler = async (req, res) => {
    if (req.method === RequestMethods.GET) {
        await getTransaction(req, res);
    } else {
        res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
    }
};

export default dbMiddleware(handler);