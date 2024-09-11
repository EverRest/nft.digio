import { login } from '@/controllers/authController';
import { loginSchema, validateRequest } from '@/middleware/validationMiddleware';
import STATUS_CODES from '@/constants/statusCodes';
import REQUEST_METHODS from "@/constants/requestMethods";

const handler = async (req, res) => {
    if (req.method === REQUEST_METHODS.POST) {
        return validateRequest(loginSchema)(req, res, async () => {
            try {
                await login(req, res);
            } catch (error) {
                console.error('Error during login:', error);
                res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
            }
        });
    }
    res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
};

export default handler;