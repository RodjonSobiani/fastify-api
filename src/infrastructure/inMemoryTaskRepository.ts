import { Task } from '../domain/task';
import { TaskRepository } from '../domain/taskRepository';

export class InMemoryTaskRepository implements TaskRepository {
    private tasks: Task[] = [];
    private currentId = 1;

    async getAll(): Promise<Task[]> {
        return this.tasks;
    }

    async getById(id: number): Promise<Task | null> {
        return this.tasks.find(task => task.id === id) || null;
    }

    async create(task: Task): Promise<void> {
        task.id = this.currentId++;
        this.tasks.push(task);
    }

    async update(task: Task): Promise<void> {
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
            this.tasks[index] = task;
        }
    }

    async delete(id: number): Promise<void> {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }
}
