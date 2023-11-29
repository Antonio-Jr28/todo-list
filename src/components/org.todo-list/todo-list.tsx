import React, { useState, useEffect } from "react";
import { TaskForm } from "./task-form.components";
import { Task } from "./task-list-item-component";
import { TaskList } from "./task-list.component";
import axios from "axios";

export const TaskListContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  //requisição para consutar lista de tarefas no banco
  useEffect(() => {
    axios
      .get("http://localhost:3333/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Erro ao obter tarefas", error));
  }, []);

  //requisicao para adicionar nova tarefa
  const addTask = (task: Task) => {
    axios
      .post("http://localhost:3333/tasks", task)
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);

        window.location.reload();
      })
      .catch((error) => console.error("Erro ao adicionar tarefa", error));
  };

  //requisicao para deletar tarefa
  const deleteTask = (task: Task) => {
    axios
      .delete(`http://localhost:3333/tasks/${task.id}`)
      .then(() => setTasks(tasks.filter((t) => t !== task)))
      .catch((error) => console.error("Erro ao excluir tarefa", error));
  };

  //requisicao para editar tarefa
  const editTask = (taskId: any, newTitle: string, newStatus: string) => {
    axios
      .put(`http://localhost:3333/tasks/${taskId}`, {
        title: newTitle,
        status: newStatus,
      })
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.id === taskId
            ? { ...task, title: newTitle, status: newStatus }
            : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Erro ao editar tarefa", error));
  };

  return (
    <section className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <TaskForm onAddTask={addTask} />
        <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
      </div>
    </section>
  );
};
