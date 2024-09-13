
import Joi from 'joi';
import STATUS_CODES from '@/constants/statusCodes';

const itemSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().default(''),
    image: Joi.string().required(),
    owner: Joi.string().required(),
    collection: Joi.string().optional(),
    createdAt: Joi.date().default(Date.now),
    price: Joi.number().required(),
    bids: Joi.array().items(Joi.string()).default([]),
});

const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};

export { itemSchema, validateRequest };