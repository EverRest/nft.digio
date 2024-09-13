import Joi from 'joi';
import ROLES from "@/constants/roles";

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    createdAt: Joi.date().default(Date.now),
    wallets: Joi.array().items(Joi.string()).default([]),
    profile: Joi.object({
        firstName: Joi.string().default(''),
        lastName: Joi.string().default(''),
        bio: Joi.string().default(''),
        mood: Joi.string().default(''),
        profileImage: Joi.string().default(''),
        coverImage: Joi.string().default(''),
        socialLinks: Joi.object({
            twitter: Joi.string().default(''),
            instagram: Joi.string().default(''),
            website: Joi.string().default(''),
            discord: Joi.string().default(''),
            telegram: Joi.string().default(''),
        }).default(),
    }).default(),
    verified: Joi.boolean().default(false),
    collections: Joi.array().items(Joi.string()).default([]),
    role: Joi.string().min(3).required().default('user').valid(ROLES.ADMIN, ROLES.USER, ROLES.SELLER, ROLES.BUYER, ROLES.GUEST),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export {registerSchema, loginSchema};