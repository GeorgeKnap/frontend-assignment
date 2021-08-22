import { Task } from '@todos/api';

export type TaskListItem = Task & { expanded: boolean };
