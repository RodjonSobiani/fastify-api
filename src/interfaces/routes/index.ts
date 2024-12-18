import { FastifyInstance } from 'fastify';
import { userRoutes } from './user/user.routes';
import fastifyJwt from "@fastify/jwt";
import {config} from "../../config/config";
import fastifyCors from "@fastify/cors";
import {taskRoutes} from "./task/task.routes";

export function registerRoutes(app: FastifyInstance) {
    app.register(fastifyCors, {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    });
    app.register(fastifyJwt, { secret: config.JWT_SECRET });
    app.register(userRoutes, { prefix: '/api/users' });
    app.register(taskRoutes, { prefix: '/api' });
}
