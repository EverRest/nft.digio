import { login } from '@/controllers/authController';
import REQUEST_METHODS from '@/constants/requestMethods';
import STATUS_CODES from '@/constants/statusCodes';

const requestHandler = async (req, res) => {
    if (req.method === REQUEST_METHODS.POST) {
        await login(req, res);
    } else {
        res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
    }
};

const loginHandler = async (req, res) => {
    try {
        await requestHandler(req, res);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export default loginHandler;