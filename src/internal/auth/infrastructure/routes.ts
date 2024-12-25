import { FastifyInstance } from 'fastify';
import {signUpHandler} from "./handlers/signUpHandler";
import {signInHandler} from "./handlers/signInHandler";

export default async function authRoutes(app: FastifyInstance) {
    app.post('/register', signUpHandler);
    app.post('/login', signInHandler);
}