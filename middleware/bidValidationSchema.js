import Joi from 'joi';
import STATUS_CODES from '@/constants/statusCodes';

const bidSchema = Joi.object({
    item: Joi.string().required(),
    user: Joi.string().required(),
    amount: Joi.number().required(),
    createdAt: Joi.date().default(Date.now),
});

const validateRequest = (schema) => (req, res, next) => {
    console.log('validateRequest', req);
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};

export { bidSchema, validateRequest };