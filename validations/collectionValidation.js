import Joi from 'joi';

const storeCollectionSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().default(''),
    createdAt: Joi.date().default(Date.now),
    items: Joi.array().items(Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().uri().required(),
        owner: Joi.string().allow(null),
        collection: Joi.string().allow(null),
        createdAt: Joi.date().required(),
        price: Joi.number().required(),
        bids: Joi.array().items(Joi.any()).default([]),
        __v: Joi.number().required()
    })).default([]),
});

const updateCollectionSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    createdAt: Joi.date().default(Date.now),
    items: Joi.array().items(Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        image: Joi.string().uri().optional(),
        owner: Joi.string().allow(null).optional(),
        collection: Joi.string().allow(null).optional(),
        createdAt: Joi.date().optional(),
        price: Joi.number().optional(),
        bids: Joi.array().items(Joi.any()).optional(),
        __v: Joi.number().optional()
    })).optional(),
});

export { storeCollectionSchema, updateCollectionSchema };