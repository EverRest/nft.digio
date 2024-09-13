import authMiddleware from '@/middleware/authMiddleware';
import { getTransaction, updateTransaction, deleteTransaction } from '@/controllers/transactionController';
import REQUEST_METHODS from "@/constants/requestMethods";
import STATUS_CODES from "@/constants/statusCodes";
import { updateTransactionSchema } from "@/validations/transactionValidation";
import handler from '@/utils/handler';
import validateRequest from "@/validations/requestValidator";

const requestHandler = async (req, res) => {
    switch (req.method) {
        case REQUEST_METHODS.GET:
            await authMiddleware(req, res, async () => {
                await getTransaction(req, res);
            });
            break;
        case REQUEST_METHODS.PUT:
            await authMiddleware(req, res, async () => {
                validateRequest(updateTransactionSchema)(req, res, async () => {
                    await updateTransaction(req, res);
                });
            });
            break;
        case REQUEST_METHODS.DELETE:
            await authMiddleware(req, res, async () => {
                await deleteTransaction(req, res);
            });
            break;
        default:
            res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
            break;
    }
};

const transactionHandler = (req, res) => handler(requestHandler, req, res);

export default transactionHandler;