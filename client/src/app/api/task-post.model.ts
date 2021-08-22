import { Task } from './task.model';

export type TaskPost = Partial<Pick<Task, 'title' | 'description' | 'completed'>>;
