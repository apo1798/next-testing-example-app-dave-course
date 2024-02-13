import { server } from '@/mocks/server';
import postTodo from './postTodos';
import { HttpResponse, http } from 'msw';

it('should return the posted todo item', async () => {
  const postedTodo = await postTodo('write integration test');
  expect(postedTodo).toMatchObject({
    title: 'write integration test',
    completed: false,
  });
});

it('should fail with an error', async () => {
  server.use(
    http.post('/todos', () => {
      return HttpResponse.json(null, { status: 400 });
    })
  );

  expect.assertions(1);

  try {
    await postTodo('^_^');
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe('Failed to post new todo');
    }
  }
});
