import { server } from '@/mocks/server';
import { HttpResponse, http } from 'msw';
import fetchTodos from './fetchTodos';

describe('fetchTodos lib function', () => {
  it('should return the correct number of todo items', async () => {
    const todosArray = await fetchTodos();
    expect(todosArray.length).toBe(3);
  });

  it('should return an empty array with an error', async () => {
    server.use(
      http.get('/todos', () => {
        return HttpResponse.json({}, { status: 400 });
      })
    );

    const todosArray = await fetchTodos();
    expect(todosArray.length).toBe(0);
  });
});
