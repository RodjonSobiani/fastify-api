import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    SERVER_PORT: parseInt(process.env.SERVER_PORT || '8080'),
    DATABASE_URL: process.env.DATABASE_URL || '',
    JWT_SECRET: process.env.JWT_SECRET || 'fastify-api-secret-key',
};