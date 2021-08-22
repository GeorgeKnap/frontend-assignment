import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from '@todos/api';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { TaskPost } from 'src/app/api/task-post.model';
import { Task } from 'src/app/api/task.model';
import * as TodosActions from './todos.actions';
import * as fromTodos from './todos.reducer';

@Injectable()
export class TodosEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTasks),
      concatMap(() => this.getTasks()),
    ),
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.createTask),
      map(action => action.task),
      concatMap(task => this.createTask(task)),
    ),
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.editTask),
      concatMap(action => this.editTask(action.taskId, action.task)),
    ),
  );

  completeTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.completeTask),
      map(action => action.task),
      concatMap(task => this.completeTask(task)),
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.deleteTask),
      map(action => action.taskId),
      concatMap(taskId => this.deleteTask(taskId)),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiService,
    private readonly store: Store<fromTodos.State>,
  ) {}

  private getTasks() {
    return this.apiService.getTasks().pipe(
      map(tasks => TodosActions.loadTasksSuccess({ tasks })),
      catchError(error => of(TodosActions.loadTasksFailure({ error }))),
    );
  }

  private createTask(task: TaskPost) {
    return this.apiService.postTask(task).pipe(
      map(task => TodosActions.createTaskSuccess({ task })),
      catchError(error => of(TodosActions.createTaskFailure({ error }))),
    );
  }

  private editTask(taskId: number, task: TaskPost) {
    return this.apiService.patchTask(taskId, task).pipe(
      map(task => TodosActions.editTaskSuccess({ task })),
      catchError(error => of(TodosActions.editTaskFailure({ error }))),
    );
  }

  private deleteTask(taskId: number) {
    return this.apiService.deleteTask(taskId).pipe(
      map(task => TodosActions.deleteTaskSuccess({ task })),
      catchError(error => of(TodosActions.deleteTaskFailure({ error }))),
    );
  }

  private completeTask(task: Task) {
    return this.apiService
      .patchTask(task.id, {
        ...task,
        completed: true,
      })
      .pipe(
        map(task => TodosActions.completeTaskSuccess({ task })),
        catchError(error => of(TodosActions.completeTaskFailure({ error }))),
      );
  }
}
