import { server } from '@/mocks/server';
import updateTodo from './updateTodos';
import { HttpResponse, http } from 'msw';

const todo = {
  userId: 1,
  title: 'A title',
  completed: false,
  id: 1,
};

describe('updateTodo lib function', () => {
  it('should return the updated todo item', async () => {
    const updatedTodo = await updateTodo(todo);
    expect(updatedTodo).toEqual({ ...todo, completed: true });
  });

  it('should fail with an error', async () => {
    server.use(
      http.put('/todos/1', async () => {
        return HttpResponse.json(null, { status: 400 });
      })
    );
    expect.assertions(1);
    try {
      await updateTodo(todo);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe('Failed to update todo');
      }
    }
  });
});
