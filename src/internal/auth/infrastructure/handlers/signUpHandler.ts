import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../../application/authService';
import { UserRepository } from '../../../../external/database/repositories/userRepo';

export const signUpHandler = async (req: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = req.body as { email: string; password: string };

    const authService = new AuthService(new UserRepository());
    const tokens = await authService.register(email, password);

    reply.send(tokens);
};