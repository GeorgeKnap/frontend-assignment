import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@todos/shared';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { TodosEffects } from './ngrx/todos.effects';
import * as fromTodos from './ngrx/todos.reducer';
import { TaskCardComponent } from './task-card/task-card.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodosRoutingModule } from './todos-routing.module';



@NgModule({
  declarations: [
    TodoListComponent,
    CreateTaskDialogComponent,
    TaskCardComponent,
    EditTaskDialogComponent
  ],
  imports: [
    SharedModule,
    TodosRoutingModule,
    StoreModule.forFeature(fromTodos.todosFeatureKey, fromTodos.reducer),
    EffectsModule.forFeature([TodosEffects])
  ]
})
export class TodosModule { }
