import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '@todos/api';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  @Output() taskDeleted: EventEmitter<number> = new EventEmitter();
  @Output() taskEdit: EventEmitter<Task> = new EventEmitter();
  constructor() {}

  delete() {
    this.taskDeleted.emit(this.task.id);
  }

  edit() {
    this.taskEdit.emit(this.task)
  }

  ngOnInit(): void {
    console.log(this.task);
  }
}
