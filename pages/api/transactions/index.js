import dbMiddleware from '@/middleware/dbMiddleware';
import { getTransactions, createTransaction } from '@/controllers/transactionController';
import RequestMethods from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";

const handler = async (req, res) => {
    if (req.method === RequestMethods.GET) {
        await getTransactions(req, res);
    } else if (req.method === RequestMethods.POST) {
        await createTransaction(req, res);
    } else {
        res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
    }
};

export default dbMiddleware(handler);