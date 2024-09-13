import authMiddleware from '@/middleware/authMiddleware';
import roleMiddleware from '@/middleware/roleMiddleware';
import { getTransactions, createTransaction } from '@/controllers/transactionController';
import REQUEST_METHODS from "@/constants/requestMethods";
import ROLES from "@/constants/roles";
import STATUS_CODES from "@/constants/statusCodes";

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
                    await createTransaction(req, res);
                });
            });
            break;
        default:
            res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
            break;
    }
};

const transactionsHandler = async (req, res) => {
    try {
        await requestHandler(req, res);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export default transactionsHandler;