import fastify from 'fastify';
import routes from '../routes';

export const buildApp = async () => {
    const app = fastify({ logger: true });

    await routes(app);

    return app;
};
