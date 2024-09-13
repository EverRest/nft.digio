import Joi from 'joi';
import STATUS_CODES from '@/constants/statusCodes';

const collectionSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().default(''),
    createdAt: Joi.date().default(Date.now),
    items: Joi.array().items(Joi.string()).default([]),
});

const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log('error:', error);
    if (error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};

export { collectionSchema, validateRequest };