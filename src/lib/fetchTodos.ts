import type { Todo } from '@/types/Todo';
import axios from 'axios';

export default async function fetchTodos() {
  try {
    const res = await axios('/todos');

    const todos: Todo[] = res.data;

    return todos;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    return [];
  }
}
