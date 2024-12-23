import { FastifyInstance } from 'fastify';
import { userRoutes } from './user/user.routes';
import fastifyJwt from "@fastify/jwt";
import {config} from "../../config/config";
import fastifyCors from "@fastify/cors";

export function registerRoutes(app: FastifyInstance) {
    app.register(fastifyCors, {
        origin: '*',
        methods: ['ALL']
    });
    app.register(fastifyJwt, { secret: config.JWT_SECRET });
    app.register(userRoutes, { prefix: '/auth' });
}
