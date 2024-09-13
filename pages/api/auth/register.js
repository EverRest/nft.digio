import {register} from '@/controllers/authController';
import {registerSchema} from '@/validations/authValidation';
import validateRequest from '@/validations/requestValidator';
import STATUS_CODES from '@/constants/statusCodes';
import REQUEST_METHODS from "@/constants/requestMethods";

const handler = async (req, res) => {
    if (req.method === REQUEST_METHODS.POST) {
        return validateRequest(registerSchema)(req, res, () => register(req, res));
    }
    res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end();
};

export default handler;