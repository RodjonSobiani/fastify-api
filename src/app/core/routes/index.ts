import { FastifyInstance } from 'fastify';
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import {config} from "../../config";
import authRoutes from "../../../internal/auth/infrastructure/routes";

export default async function routes(app: FastifyInstance) {
    app.register(fastifyCors, {
        origin: '*',
        methods: ['ALL']
    });
    app.register(fastifyJwt, { secret: config.jwt.secret });
    app.register(authRoutes, { prefix: '/auth' });
}
