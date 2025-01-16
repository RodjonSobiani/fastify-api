import {FastifyInstance} from "fastify";
import {calculateHandler} from "../handlers/calculate";
import {authMiddleware} from "../../../auth/infrastructure/middleware/auth";

interface CalculationRequest {
    birthDate: string;
}

export default async function calculatorRoutes(fastify: FastifyInstance): Promise<void> {
    fastify.post<{
        Body: CalculationRequest;
    }>(
        '/calculate',
        {preHandler: [authMiddleware]},
        calculateHandler
    );
}