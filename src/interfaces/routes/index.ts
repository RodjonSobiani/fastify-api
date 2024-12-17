import { FastifyInstance } from 'fastify';
import { userRoutes } from './user.routes';
import fastifyJwt from "@fastify/jwt";
import {config} from "../../config/config";
import fastifyCors from "@fastify/cors";

export function registerRoutes(app: FastifyInstance) {
    app.register(fastifyCors);
    app.register(userRoutes, { prefix: '/api/users' });
    app.register(fastifyJwt, { secret: config.JWT_SECRET });
}