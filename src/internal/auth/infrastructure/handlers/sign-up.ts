import {FastifyReply, FastifyRequest} from 'fastify';
import {joiRegisterUserSchema, ZodRegisterUserInput, zodRegisterUserSchema} from "../validation/sign-up";
import {AuthService} from "../../application/services/auth";

export async function signUpHandler(request: FastifyRequest, reply: FastifyReply) {
    const {error, value} = joiRegisterUserSchema.validate(request.body);

    if (error) {
        reply.status(400).send({error: error.details[0].message});
        return;
    }

    const data: ZodRegisterUserInput = zodRegisterUserSchema.parse(value);

    console.log('Received data:', data);

    // try {
    await AuthService.registerUser(data.email, data.password);
    reply.status(201).send({message: 'User registered successfully'});
    // } catch (err) {
    //     reply.status(500).send({error: 'Internal server error'});
    // }
}