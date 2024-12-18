import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { TaskService } from '../../../application/services/task/task.service';

interface TaskBody {
    title: string;
    description: string;
}

interface TaskParams {
    id: string;
}

export async function taskRoutes(app: FastifyInstance, taskService: TaskService) {
    app.get('/tasks', async (request: FastifyRequest, reply: FastifyReply) => {
        const tasks = await taskService.getTasks();
        reply.send(tasks);
    });

    app.get('/tasks/:id', async (request: FastifyRequest<{ Params: TaskParams }>, reply: FastifyReply) => {
        const { id } = request.params;
        const task = await taskService.getTaskById(parseInt(id));
        if (task) {
            reply.send(task);
        } else {
            reply.status(404).send({ error: 'Task not found' });
        }
    });

    app.post('/tasks', async (request: FastifyRequest<{ Body: TaskBody }>, reply: FastifyReply) => {
        const { title, description } = request.body;
        const task = await taskService.createTask(title, description);
        reply.status(201).send(task);
    });

    app.put('/tasks/:id', async (request: FastifyRequest<{ Params: TaskParams; Body: TaskBody & { completed: boolean } }>, reply: FastifyReply) => {
        const { id } = request.params;
        const { title, description, completed } = request.body;
        const task = await taskService.updateTask(parseInt(id), title, description, completed);
        if (task) {
            reply.send(task);
        } else {
            reply.status(404).send({ error: 'Task not found' });
        }
    });

    app.delete('/tasks/:id', async (request: FastifyRequest<{ Params: TaskParams }>, reply: FastifyReply) => {
        const { id } = request.params;
        const success = await taskService.deleteTask(parseInt(id));
        if (success) {
            reply.status(204).send();
        } else {
            reply.status(404).send({ error: 'Task not found' });
        }
    });
}
