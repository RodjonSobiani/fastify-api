import { Task } from '../domain/task';
import { TaskRepository } from '../domain/taskRepository';

export class TaskService {
    constructor(private repository: TaskRepository) {}

    async getTasks(): Promise<Task[]> {
        return this.repository.getAll();
    }

    async getTaskById(id: number): Promise<Task | null> {
        return this.repository.getById(id);
    }

    async createTask(title: string, description: string): Promise<Task> {
        const task = new Task(0, title, description);
        await this.repository.create(task);
        return task;
    }

    async updateTask(id: number, title: string, description: string, completed: boolean): Promise<Task | null> {
        const task = await this.repository.getById(id);
        if (!task) return null;

        task.title = title;
        task.description = description;
        task.completed = completed;
        await this.repository.update(task);
        return task;
    }

    async deleteTask(id: number): Promise<boolean> {
        const task = await this.repository.getById(id);
        if (!task) return false;

        await this.repository.delete(id);
        return true;
    }
}
