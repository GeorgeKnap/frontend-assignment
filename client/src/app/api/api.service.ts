import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskPost } from './task-post.model';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  rootUrl = 'http://localhost:1337';
  constructor(private readonly httpClient: HttpClient) {}

  getTasks(): Observable<Array<Task>> {
    return this.httpClient.get<Array<Task>>(`${this.rootUrl}/tasks`);
  }

  getTask(taskId: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.rootUrl}/tasks/${taskId}`);
  }

  postTask(task: TaskPost): Observable<Task> {
    return this.httpClient.post<Task>(`${this.rootUrl}/tasks`, task);
  }

  deleteTask(taskId: number): Observable<never> {
    return this.httpClient.delete<never>(`${this.rootUrl}/tasks/${taskId}`);
  }

  patchTask(taskId: number, task: Partial<TaskPost>): Observable<Task> {
    return this.httpClient.patch<Task>(`${this.rootUrl}/tasks/${taskId}`, task);
  }
}
