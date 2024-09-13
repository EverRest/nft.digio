import Joi from 'joi';
import STATUS_CODES from '@/constants/statusCodes';

const transactionSchema = Joi.object({
    item: Joi.string().required(),
    buyer: Joi.string().required(),
    seller: Joi.string().required(),
    price: Joi.number().required(),
    createdAt: Joi.date().default(Date.now),
});

const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};

export { transactionSchema, validateRequest };