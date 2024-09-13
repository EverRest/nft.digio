import Joi from 'joi';

const storeBidSchema = Joi.object({
    item: Joi.string().required(),
    user: Joi.string().required(),
    amount: Joi.number().required(),
    createdAt: Joi.date().default(Date.now),
});

const updateBidSchema = Joi.object({
    item: Joi.string().optional(),
    user: Joi.string().optional(),
    amount: Joi.number().optional(),
    createdAt: Joi.date().default(Date.now),
});

export { storeBidSchema, updateBidSchema };