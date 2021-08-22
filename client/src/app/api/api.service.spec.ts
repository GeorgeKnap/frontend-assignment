import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { Task } from './task.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the tasks', () => {
    const mockResponse: Array<Task> = [
      { id: 1, title: 'Mock title', description: 'Moc description', priority: 1, project: null },
    ];
    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(`${service.rootUrl}/tasks`);
    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);
  });

  afterEach(() => {
    httpMock.verify();
});

});
