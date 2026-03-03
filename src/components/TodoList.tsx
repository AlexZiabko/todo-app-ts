import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, Todo, deleteTodo } from "../api/todos";
import AddTodoForm from "./AddTodoForm";

const TodoList: React.FC = () => {
  const queryClient = useQueryClient();

  // Получаем задачи
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // Мутация для добавления задачи
  const addMutation = useMutation<Todo, unknown, Omit<Todo, "id">>({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // сразу добавляем задачу в кэш
      if (previousTodos) {
        queryClient.setQueryData<Todo[]>(
          ["todos"],
          [
            ...previousTodos,
            { ...newTodo, id: Date.now() }, // временный id
          ],
        );
      }

      return { previousTodos };
    },
    onError: (err, newTodo, context: any) => {
      // откатываем в случае ошибки
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  // Мутация для удаления задачи
  const deleteMutation = useMutation<void, unknown, number>({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // сразу добавляем задачу в кэш
      if (previousTodos) {
        queryClient.setQueryData<Todo[]>(
          ["todos"],
          [...previousTodos.filter((t) => t.id !== id)],
        );
      }

      return { previousTodos };
    },
    onError: (context: any) => {
      // откатываем в случае ошибки
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  if (isLoading) return <p className="text-center mt-4">Загрузка...</p>;
  if (isError)
    return <p className="text-center mt-4 text-red-500">Ошибка загрузки</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Список задач</h2>

      <AddTodoForm
        onSubmit={(title: string) =>
          addMutation.mutate({ title, completed: false })
        }
      />

      {todos && todos.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {todos.map((todo: Todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-2 border rounded"
            >
              <span>{todo.title}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteMutation.mutate(todo.id)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center mt-4 text-gray-500">Задачи отсутствуют</p>
      )}
    </div>
  );
};

export default TodoList;
