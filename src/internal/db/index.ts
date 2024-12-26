import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import {config} from "../../app/config";

// Нужен ли здесь интерфейс?
interface Database {
    users: {
        id: string;
        email: string;
        password_hash: string;
        created_at: Date;
        updated_at: Date | null;
    };
}

// const pool = new Pool({
//     host: config.db.host,
//     port: config.db.port,
//     user: config.db.username,
//     password: config.db.password,
//     database: config.db.database,
// });

// export const db = new Kysely<Database>({
//     dialect: new PostgresDialect({ pool }),
// });

// Второй вариант, под вопросом
export const db = new Kysely<Database>({
    dialect: new PostgresDialect({
        pool: new Pool({
            connectionString: config.db.DATABASE_URL,
        }),
    }),
});
