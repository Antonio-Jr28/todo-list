import React, { useState } from "react";
import { TaskForm } from "./task-form.components";
import { Task } from "./task-list-item-component";
import { TaskList } from "./task-list.component";

export const TaskListContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (task: Task) => {
    setTasks(tasks.filter((t) => t !== task));
  };

  const editTask = (taskId: any, newTitle: string, newStatus: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, title: newTitle, status: newStatus }
        : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center">
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
    </div>
  );
};
