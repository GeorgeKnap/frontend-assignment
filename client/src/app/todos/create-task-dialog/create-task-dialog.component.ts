import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BaseComponent } from '@todos/shared';
import { takeUntil } from 'rxjs/operators';
import { createTask, createTaskFailure, createTaskSuccess } from '../ngrx/todos.actions';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent extends BaseComponent implements OnInit, OnDestroy {
  taskForm!: FormGroup;
  validation = {
    title: 80,
    description: 1000
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly dialogRef: MatDialogRef<CreateTaskDialogComponent>,
  ) {
    super();
  }

  save() {
    this.store.dispatch(
      createTask({
        task: {
          title: this.taskForm.controls.title.value,
          description: this.taskForm.controls.description.value,
        },
      }),
    );
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(this.validation.title)]],
      description: [null, [Validators.maxLength(this.validation.description)]],
    });

    this.actions$
      .pipe(ofType(createTaskSuccess, createTaskFailure), takeUntil(this.subscriptionHandler$))
      .subscribe(action => {
        if (action.type === createTaskSuccess.type) {
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
