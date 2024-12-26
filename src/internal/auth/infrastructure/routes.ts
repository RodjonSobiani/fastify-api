import { FastifyInstance } from 'fastify';
import {signUpHandler} from "./handlers/signUp";
import {signInHandler} from "./handlers/signIn";

export default async function authRoutes(app: FastifyInstance) {
    app.post('/register', signUpHandler);
    app.post('/login', signInHandler);
}