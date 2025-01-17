import fastify from 'fastify';
import routes from '../routes';

export const buildApp = async () => {
    const app = fastify({logger: false});

    await routes(app);

    return app;
};
