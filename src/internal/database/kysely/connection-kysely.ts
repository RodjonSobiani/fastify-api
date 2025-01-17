import {config} from "../../../app/config";
import {Kysely, PostgresDialect} from "kysely";
import {Pool} from "pg";
import {Database} from "./kysely-schema";
import {logger} from "../../shared/logger";

// Настройка диалекта для подключения к Postgres
const SqlDialectConfig = new PostgresDialect({
    pool: new Pool({
        host: config.db.host,
        port: config.db.port,
        user: config.db.username,
        password: config.db.password,
        database: config.db.database,
    })

    // pool: new Pool({
    //     connectionString: config.db.DATABASE_URL,
    // }),
});

const db = new Kysely<Database>({
    dialect: SqlDialectConfig,
    log(event) {
        if (process.env.DB_LOGGER_LEVEL === "debug" && event.level === "query") {
            logger.debug({
                durationMs: `${event.queryDurationMillis.toFixed(2)} ms`,
                sql: event.query.sql
            }, "[SQL]");
        }

        if ((process.env.DB_LOGGER_LEVEL === "error" || process.env.DB_LOGGER_LEVEL === "debug") && event.level === "error") {
            logger.error({
                ...event
            }, "[SQL Error]");
        }
    }
});

import {types} from "pg";

types.setTypeParser(types.builtins.INT8, (val: string) => {
    if (val !== undefined && val !== null) {
        return Number(BigInt(val));
    }
    return val;
});

export default db;
