import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { TaskListItem } from '../models/task-list-item.model';
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
  tasks$!: Observable<Array<TaskListItem>>;
  private expanded: Set<number> = new Set();

  constructor(private readonly store: Store<fromTodos.State>, private readonly matDialog: MatDialog) {
    this.store.dispatch(loadTasks());
  }

  createTask() {
    this.matDialog.open(CreateTaskDialogComponent, {
      height: '400px',
      width: '400px',
    });
  }

  taskDeleted(taskId: number) {
    this.expanded.delete(taskId);
    this.store.dispatch(deleteTask({ taskId }));
  }

  taskEdit(task: TaskListItem) {
    this.matDialog.open(EditTaskDialogComponent, {
      data: task,
      disableClose: true,
      height: '400px',
      width: '400px',
    });
  }

  taskComplete(task: TaskListItem) {
    this.store.dispatch(completeTask({ task }));
  }

  expansionToggled(task: TaskListItem) {
    task.expanded ? this.expanded.add(task.id) : this.expanded.delete(task.id);
  }

  ngOnInit(): void {
    this.tasks$ = this.store.select(getTasks).pipe(
      map(tasks =>
        tasks.map(t => {
          return {
            ...t,
            expanded: this.expanded.has(t.id),
          };
        }),
      ),
    );
  }
}
