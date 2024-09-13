import STATUS_CODES from '@/constants/statusCodes';

const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};

export default validateRequest;