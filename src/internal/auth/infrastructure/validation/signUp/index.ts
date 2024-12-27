import Joi from 'joi';
import { z } from 'zod';

export const joiRegisterUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(64).required(),
});

export const zodRegisterUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(64),
});

export type ZodRegisterUserInput = z.infer<typeof zodRegisterUserSchema>;
