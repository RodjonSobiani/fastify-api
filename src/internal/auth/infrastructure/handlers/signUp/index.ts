import { FastifyReply, FastifyRequest } from 'fastify';
import {AuthService} from "../../../application/authService";

export async function signUpHandler(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as { email: string; password: string };

    try {
        await AuthService.registerUser(email, password);
        reply.code(201).send({ message: 'User registered successfully' });
    } catch (error) {
        reply.code(500).send({ error: 'Registration failed' });
    }
}
