import authMiddleware from '@/middleware/authMiddleware';
import roleMiddleware from '@/middleware/roleMiddleware';
import { getTransactions, createTransaction } from '@/controllers/transactionController';
import REQUEST_METHODS from "@/constants/requestMethods";
import ROLES from "@/constants/roles";
import STATUS_CODES from "@/constants/statusCodes";
import { storeTransactionSchema } from "@/validations/transactionValidation";
import validateRequest from '@/validations/requestValidator';
import handler from '@/utils/handler';

const requestHandler = async (req, res) => {
    switch (req.method) {
        case REQUEST_METHODS.GET:
            await authMiddleware(req, res, async () => {
                await roleMiddleware([ROLES.USER])(req, res, async () => {
                    await getTransactions(req, res);
                });
            });
            break;
        case REQUEST_METHODS.POST:
            await authMiddleware(req, res, async () => {
                await roleMiddleware([ROLES.USER])(req, res, async () => {
                    validateRequest(storeTransactionSchema)(req, res, async () => {
                        await createTransaction(req, res);
                    });
                });
            });
            break;
        default:
            res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
            break;
    }
};

const transactionsHandler = (req, res) => handler(requestHandler, req, res);

export default transactionsHandler;