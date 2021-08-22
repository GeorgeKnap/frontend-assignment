import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskListItem } from '../models/task-list-item.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent {
  @Input() task!: TaskListItem;
  @Output() taskDeleted: EventEmitter<number> = new EventEmitter();
  @Output() taskEdit: EventEmitter<TaskListItem> = new EventEmitter();
  @Output() taskComplete: EventEmitter<TaskListItem> = new EventEmitter();
  @Output() expansionToggled: EventEmitter<TaskListItem> = new EventEmitter();
  constructor() {}

  delete() {
    this.taskDeleted.emit(this.task.id);
  }

  edit() {
    this.taskEdit.emit(this.task);
  }

  complete() {
    this.taskComplete.emit(this.task);
  }

  expanded(expanded: boolean) {
    this.task.expanded = expanded;
    this.expansionToggled.emit(this.task);
  }
}
