import { Task } from './task';

export interface TaskRepository {
    getAll(): Promise<Task[]>;
    getById(id: number): Promise<Task | null>;
    create(task: Task): Promise<void>;
    update(task: Task): Promise<void>;
    delete(id: number): Promise<void>;
}
