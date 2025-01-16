import {FastifyInstance} from 'fastify';
import {signUpHandler} from "../handlers/sign-up";
import {signInHandler} from "../handlers/sign-in";

export default async function authRoutes(app: FastifyInstance) {
    app.post('/register', signUpHandler);
    app.post('/login', signInHandler);
}