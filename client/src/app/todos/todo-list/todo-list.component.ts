import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Task } from '@todos/api';
import { Observable } from 'rxjs';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { completeTask, deleteTask, loadTasks } from '../ngrx/todos.actions';
import * as fromTodos from '../ngrx/todos.reducer';
import { getTasks } from '../ngrx/todos.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  tasks$!: Observable<Array<Task>>;

  constructor(private readonly store: Store<fromTodos.State>, private readonly matDialog: MatDialog) {
    this.store.dispatch(loadTasks());
  }

  createTask() {
    this.matDialog.open(CreateTaskDialogComponent);
  }

  taskDeleted(taskId: number) {
    this.store.dispatch(deleteTask({ taskId }));
  }

  taskEdit(task: Task) {
    this.matDialog.open(EditTaskDialogComponent, {
      data: task,
      disableClose: true,
      height: '400px',
      width: '400px'
    });
  }

  taskComplete(task: Task) {
    this.store.dispatch(completeTask({ task }));
  }

  ngOnInit(): void {
    this.tasks$ = this.store.select(getTasks);
  }
}
