import { FastifyReply, FastifyRequest } from 'fastify';
import {joiRegisterUserSchema, ZodRegisterUserInput, zodRegisterUserSchema} from "../../validation/signUp";
import {AuthService} from "../../../application/services/authService";

export async function signUpHandler(request: FastifyRequest, reply: FastifyReply) {
    const { error, value } = joiRegisterUserSchema.validate(request.body);
    const data = zodRegisterUserSchema.parse(request.body) as ZodRegisterUserInput;
    await AuthService.registerUser(data.email, data.password);

    if (error) {
        reply.status(400).send({ error: error.details[0].message });
        return;
    }

    const { email, password } = value;

    try {
        await AuthService.registerUser(email, password);
        reply.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
        reply.status(500).send({ error: 'Internal server error' });
    }
}
