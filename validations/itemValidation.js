import Joi from 'joi';

const storeItemSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().default(''),
    image: Joi.string().required(),
    owner: Joi.string().required(),
    collection: Joi.string().optional(),
    createdAt: Joi.date().default(Date.now),
    price: Joi.number().required(),
    bids: Joi.array().items(Joi.string()).default([]),
    tokenId: Joi.string().required(),
    metadata: Joi.object().optional(),
});

const updateItemSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    image: Joi.string().optional(),
    owner: Joi.string().optional(),
    collection: Joi.string().optional(),
    createdAt: Joi.date().default(Date.now),
    price: Joi.number().optional(),
    bids: Joi.array().items(Joi.string()).optional(),
    tokenId: Joi.string().optional(),
    metadata: Joi.object().optional(),
});

export { storeItemSchema, updateItemSchema };