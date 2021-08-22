import * as fromTodos from './todos.actions';

describe('loadTasks', () => {
  it('should return an action', () => {
    expect(fromTodos.loadTasks().type).toBe('[Tasks] Load Tasks');
  });
});
