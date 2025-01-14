import { FastifyReply, FastifyRequest } from 'fastify';
import {CalculationService} from "../../application/services/calculateService/calculateService";

interface CalculationRequest {
    birthDate: string;
}

export async function calculateHandler(
    request: FastifyRequest<{ Body: CalculationRequest }>,
    reply: FastifyReply
): Promise<void> {
    try {
        const { birthDate } = request.body;

        if (!/^\d{2}\.\d{2}\.\d{4}$/.test(birthDate)) {
            return reply.status(400).send({ error: 'Invalid birth date format. Use "dd.mm.yyyy"' });
        }

        const result = CalculationService.calculateBirthDateData(birthDate);

        reply.status(200).send(result);
    } catch (error) {
        reply.status(500).send({ error: 'Internal server error' });
    }
}
