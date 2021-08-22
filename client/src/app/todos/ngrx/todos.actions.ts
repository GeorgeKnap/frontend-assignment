import { createAction, props } from '@ngrx/store';
import { Task } from '@todos/api';
import { TaskPost } from 'src/app/api/task-post.model';

export const loadTasks = createAction('[Tasks] Load Tasks');
export const loadTasksSuccess = createAction('[Tasks] Load Tasks Success', props<{ tasks: Array<Task> }>());
export const loadTasksFailure = createAction('[Tasks] Load Tasks Failure', props<{ error: any }>());

export const createTask = createAction('[Tasks] Create Task', props<{ task: TaskPost }>());
export const createTaskSuccess = createAction('[Tasks] Create Task Success', props<{ task: Task }>());
export const createTaskFailure = createAction('[Tasks] Create Task Failure', props<{ error: any }>());

export const deleteTask = createAction('[Tasks] Delete Task', props<{ taskId: number }>());
export const deleteTaskSuccess = createAction('[Tasks] Delete Task Success', props<{ task: Task }>());
export const deleteTaskFailure = createAction('[Tasks] Delete Task Failure', props<{ error: any }>());

export const editTask = createAction('[Tasks] Edit Task', props<{ taskId: number; task: TaskPost }>());
export const editTaskSuccess = createAction('[Tasks] Edit Task Success', props<{ task: Task }>());
export const editTaskFailure = createAction('[Tasks] Edit Task Failure', props<{ error: any }>());
