import Joi from 'joi';

const storeTransactionSchema = Joi.object({
    item: Joi.string().required(),
    buyer: Joi.string().required(),
    seller: Joi.string().required(),
    price: Joi.number().required(),
    createdAt: Joi.date().default(Date.now),
});

const updateTransactionSchema = Joi.object({
    item: Joi.string().optional(),
    buyer: Joi.string().optional(),
    seller: Joi.string().optional(),
    price: Joi.number().optional(),
    createdAt: Joi.date().default(Date.now),
});

export { storeTransactionSchema, updateTransactionSchema };