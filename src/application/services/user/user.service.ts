import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

const prisma = new PrismaClient();

export const UserService = (app: FastifyInstance) => ({
    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: { email, password: hashedPassword },
        });
    },

    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    },

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return app.jwt.sign({ id: user.id, email: user.email }, {
            expiresIn: '1h',
        });
    },
});