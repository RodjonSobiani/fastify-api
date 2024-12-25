import dotenv from 'dotenv';

dotenv.config();

export const config = {
    app: {
        name: process.env.APP_NAME || 'Fastify-API',
        env: process.env.APP_ENV || 'development',
        debug: process.env.APP_DEBUG === 'true',
        port: parseInt(process.env.SERVER_PORT || '8080', 10),
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'fastify-api-secret-key',
        expiration: process.env.JWT_EXPIRATION || '3600',
    },
    db: {
        connection: process.env.DB_CONNECTION || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        database: process.env.DB_DATABASE || 'fastify-api',
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        DATABASE_URL: process.env.DATABASE_URL || '',
    },
};