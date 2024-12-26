import { config } from './src/app/config';

export default {
    client: 'pg',
    connection: config.db.DATABASE_URL,
    migrations: {
        directory: './migrations',
    },
};
