import Fastify from 'fastify';
import { registerRoutes } from './interfaces/routes';
import { config } from './config/config';

const startServer = async () => {
    const app = Fastify();

    registerRoutes(app);

    try {
        await app.listen({ port: config.SERVER_PORT, host: '0.0.0.0' });
        console.log(`Server running at http://localhost:${config.SERVER_PORT}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

startServer().catch(err => {
    console.error(err);
    process.exit(1);
});