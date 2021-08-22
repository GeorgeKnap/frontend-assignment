import { createFeatureSelector, createSelector } from '@ngrx/store';
import { filter } from 'lodash-es';
import * as fromTodos from './todos.reducer';

export const selectTodosState = createFeatureSelector<fromTodos.State>(fromTodos.todosFeatureKey);

export const getTasks = createSelector(selectTodosState, state => [
    ...filter(state.tasks, t=> !t.completed),
    ...filter(state.tasks, t=> t.completed),
]);
