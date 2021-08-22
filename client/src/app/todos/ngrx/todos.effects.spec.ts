import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { TodosEffects } from './todos.effects';


describe('TodosEffects', () => {
  let actions$: Observable<any>;
  let effects: TodosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TodosEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TodosEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
