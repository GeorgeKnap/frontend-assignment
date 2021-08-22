import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Task } from '@todos/api';
import { BaseComponent } from '@todos/shared';
import { takeUntil } from 'rxjs/operators';
import { editTask, editTaskFailure, editTaskSuccess } from '../ngrx/todos.actions';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskDialogComponent extends BaseComponent implements OnInit, OnDestroy {
  taskForm!: FormGroup;
  validation = {
    title: 80,
    description: 1000,
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
  ) {
    super();
  }

  save() {
    this.store.dispatch(
      editTask({
        taskId: this.data.id,
        task: {
          title: this.taskForm.controls.title.value,
          description: this.taskForm.controls.description.value,
          completed: this.taskForm.controls.completed.value,
        },
      }),
    );
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.data.title, [Validators.required, Validators.maxLength(this.validation.title)]],
      description: [this.data.description, [Validators.maxLength(this.validation.description)]],
      completed: this.data.completed,
    });

    this.actions$
      .pipe(ofType(editTaskSuccess, editTaskFailure), takeUntil(this.subscriptionHandler$))
      .subscribe(action => {
        if (action.type === editTaskSuccess.type) {
          this.dialogRef.close();
        } else {
          // simplified... most likely inform user that something went wrong...
          console.error(action.error);
        }
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
