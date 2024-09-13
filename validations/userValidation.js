import Joi from 'joi';

const updateUserSchema = Joi.object({
    username: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    createdAt: Joi.date().default(Date.now).optional(),
    wallets: Joi.array().items(Joi.string()).optional(),
    profile: Joi.object({
        firstName: Joi.string().default('').optional(),
        lastName: Joi.string().default('').optional(),
        bio: Joi.string().default('').optional(),
        mood: Joi.string().default('').optional(),
        profileImage: Joi.string().default('').optional(),
        coverImage: Joi.string().default('').optional(),
        socialLinks: Joi.object({
            twitter: Joi.string().default('').optional(),
            instagram: Joi.string().default('').optional(),
            website: Joi.string().default('').optional(),
            discord: Joi.string().default('').optional(),
            telegram: Joi.string().default('').optional(),
        }).default().optional(),
    }).default().optional(),
    verified: Joi.boolean().default(false).optional(),
    collections: Joi.array().items(Joi.string()).optional(),
    role: Joi.string().min(3).optional().default('user').valid(ROLES.ADMIN, ROLES.USER, ROLES.SELLER, ROLES.BUYER, ROLES.GUEST),
});

export { updateUserSchema };