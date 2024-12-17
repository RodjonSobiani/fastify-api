import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { UserService } from "../../application/services/user/user.service";

export async function userRoutes(app: FastifyInstance) {
    const userService = UserService(app);

    app.post('/register', async (req, reply) => {
        const schema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        });

        const { email, password } = schema.parse(req.body);

        const existingUser = await userService.findByEmail(email);
        if (existingUser) {
            return reply.status(400).send({ error: 'Email already exists' });
        }

        const user = await userService.register(email, password);
        reply.status(201).send({ id: user.id, email: user.email });
    });

    app.post('/login', async (req, reply) => {
        const schema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        });

        const { email, password } = schema.parse(req.body);

        const token = await userService.login(email, password);
        if (!token) {
            return reply.status(401).send({ error: 'Invalid credentials' });
        }

        reply.send({ token });
    });
}