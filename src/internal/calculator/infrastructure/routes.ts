import { FastifyInstance } from "fastify";
import { calculateHandler } from "./handlers/calculateHandler";

export default async function calculateRoutes(app: FastifyInstance): Promise<void> {
    app.post("/calculate", calculateHandler);
}
