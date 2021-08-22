import * as fromTodos from './todos.reducer';
import { getTasks, selectTodosState } from './todos.selectors';

describe('Todos Selectors', () => {
  let todosState: fromTodos.State;
  let initialState: fromTodos.State = {
    tasks: []
  };
  beforeEach(() => {
    todosState = selectTodosState({
      [fromTodos.todosFeatureKey]: initialState,
    });
  }),
    it('should select the feature state', () => {
      expect(todosState).toEqual({ tasks: [] });
    });
  it('should select the tasks', () => {
    const todos = getTasks.projector(initialState);
    expect(todos).toEqual([]);
  });
});
