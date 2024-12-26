import { FastifyReply, FastifyRequest } from 'fastify';
import {AuthService} from "../../../application/authService";

export async function signInHandler(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as { email: string; password: string };

    const tokens = await AuthService.loginUser(email, password);

    if (!tokens) {
        return reply.code(401).send({ error: 'Invalid email or password' });
    }

    reply.send(tokens);
}
