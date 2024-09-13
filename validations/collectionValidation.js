import Joi from 'joi';

const storeCollectionSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().default(''),
    createdAt: Joi.date().default(Date.now),
    items: Joi.array().items(Joi.string()).default([]),
});

const updateCollectionSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    createdAt: Joi.date().default(Date.now),
    items: Joi.array().items(Joi.string()).optional(),
});

export { storeCollectionSchema, updateCollectionSchema };