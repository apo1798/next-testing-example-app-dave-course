import { HttpResponse, http } from 'msw';
type Todo = { id: number; userId: number; title: string; completed: boolean };

export const handlers = [
  http.get('/todos', () => {
    return HttpResponse.json(
      [
        {
          userId: 1,
          id: 1,
          title: 'delectus aut autem',
          completed: false,
        },
        {
          userId: 1,
          id: 2,
          title: 'quis ut nam facilis et officia qui',
          completed: false,
        },
        {
          userId: 1,
          id: 3,
          title: 'Write Code 💻',
          completed: false,
        },
      ],
      { status: 200 }
    );
  }),
  http.post<never, { title: string }>('/todos', async ({ request }) => {
    const { title } = await request.json();
    return HttpResponse.json(
      { userId: 1, title, completed: false, id: 5 },
      { status: 201 }
    );
  }),
  http.put<{ id: string }, Todo>('/todos/:id', async ({ request }) => {
    const { id, userId, title, completed } = await request.json();
    return HttpResponse.json({ id, userId, title, completed }, { status: 200 });
  }),
  http.delete<{ id: string }, Todo>('/todos/:id', async ({ params }) => {
    const { id } = params;

    return HttpResponse.json({ id: Number(id) }, { status: 200 });
  }),
];
