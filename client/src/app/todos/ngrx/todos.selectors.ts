import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTodos from './todos.reducer';

export const selectTodosState = createFeatureSelector<fromTodos.State>(fromTodos.todosFeatureKey);

export const getTasks = createSelector(selectTodosState, state => state.tasks);
