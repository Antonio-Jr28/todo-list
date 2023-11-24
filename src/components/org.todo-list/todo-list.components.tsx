import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="flex items-center">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Adicione uma tarefa..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Adicionar
        </button>
      </div>

      <ul className="mt-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between p-2 border-b ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="text-red-500"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
