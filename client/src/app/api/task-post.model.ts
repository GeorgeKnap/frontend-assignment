import { Task } from './task.model';

export type TaskPost = Pick<Task, 'title' | 'description'>;
