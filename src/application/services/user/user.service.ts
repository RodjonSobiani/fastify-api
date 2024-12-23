import { FastifyInstance } from 'fastify';

export const UserService = (app: FastifyInstance) => ({
    async register(email: string, password: string) {
    },

    async login(email: string, password: string) {
    },
});