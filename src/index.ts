import fastify, { FastifyInstance } from 'fastify';
import { InMemoryTaskRepository } from './infrastructure/inMemoryTaskRepository';
import { TaskService } from './application/taskService';
import { taskRoutes } from './interfaces/taskRoutes';

import cors from '@fastify/cors';

const app: FastifyInstance = fastify({ logger: true });

app.register(cors, {
    origin: true, // Позволяет все источники (или укажите конкретный домен)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Укажите разрешенные методы
});


const taskRepository = new InMemoryTaskRepository();
const taskService = new TaskService(taskRepository);

taskRoutes(app, taskService);

const start = async () => {
    try {
        await app.listen({ port: 3000 });
        app.log.info(`Server is running at http://localhost:3000`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
