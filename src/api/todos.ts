export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/todos?_limit=5`);
  return res.json();
}

export async function addTodo(todo: Omit<Todo, "id">): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
