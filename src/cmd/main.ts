import {buildApp} from "../app/core/build-app";
import {config} from "../app/config";
import {checkDbConnections} from "../internal/database/check-db-connections";

const startServer = async () => {
    await checkDbConnections();

    const app = await buildApp();

    try {
        await app.listen({port: config.app.port, host: '0.0.0.0'});
        console.log(`Server running at http://localhost:${config.app.port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

startServer().catch(err => {
    console.error(err);
    process.exit(1);
});