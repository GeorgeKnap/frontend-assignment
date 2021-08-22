import { createReducer, on } from '@ngrx/store';
import { Task } from '@todos/api';
import { findIndex, remove } from 'lodash-es';
import * as TodosActions from './todos.actions';

export const todosFeatureKey = 'todos';

export interface State {
  tasks: Array<Task>;
}

export const initialState: State = {
  tasks: [],
};

export const reducer = createReducer(
  initialState,

  on(TodosActions.loadTasks, state => state),
  on(TodosActions.loadTasksSuccess, (state, { tasks }) => {
    return { ...state, tasks };
  }),
  on(TodosActions.createTaskSuccess, (state, { task }) => {
    return { ...state, tasks: [...state.tasks, task] };
  }),
  on(TodosActions.editTaskSuccess, (state, { task }) => {
    let tasks = [...state.tasks];
    const index = findIndex(tasks, { id: task.id });
    tasks.splice(index, 1, task);
    return { ...state, tasks };
  }),
  on(TodosActions.completeTaskSuccess, (state, { task }) => {
    let tasks = [...state.tasks];
    const index = findIndex(tasks, { id: task.id });
    tasks.splice(index, 1, task);
    return { ...state, tasks };
  }),
  on(TodosActions.deleteTaskSuccess, (state, { task }) => {
    const tasks = [...state.tasks];
    remove(tasks, t => t.id === task.id);
    return { ...state, tasks };
  }),
  on(TodosActions.loadTasksFailure, (state, action) => state),
);
