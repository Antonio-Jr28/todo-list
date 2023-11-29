import React, { useState } from "react";

import { Task } from "./task-list-item-component";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [titleInput, setTitleInput] = useState("");

  const handleAddTask = () => {
    const newTask: Task = {
      title: titleInput,
      status: "pendente",
      id: new Date().getTime(),
      created_at: new Date(),
    };

    onAddTask(newTask);

    setTitleInput("");
  };

  return (
   <>
      <div className="mt-10" />
      <form
        className="mb-4 border-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
      >
        <input
          className="p-2 border w-[320px] md:w-[800px] border-gray-300"
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          placeholder="Digite o título da tarefa"
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded"
          type="submit"
        >
          <i className="fas fa-plus"></i>
        </button>
      </form>
  </>
  );
};
