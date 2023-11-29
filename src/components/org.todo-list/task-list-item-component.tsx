import React, { useState } from "react";

export interface Task {
  id: any;
  title: string;
  status: string;
  created_at: Date;
}

interface TaskEditFormProps {
  task: Task;
  onSaveEdit: (newTitle: string, newStatus: string) => void;
  onCancelEdit: () => void;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({
  task,
  onSaveEdit,
  onCancelEdit,
}) => {
  const [newTitle, setNewTitle] = useState(task.title);
  const [newStatus, setNewStatus] = useState(task.status);

  const handleSaveEdit = () => {
    onSaveEdit(newTitle, newStatus);
  };

  return (
    <div>
      <input
        className="border border-gray-300"
        type="text"
        placeholder="Digite novo task"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <select
        className="border border-gray-300 ml-2"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
      >
        <option value="pendente">Pendente</option>
        <option value="Em andamento">Em andamento</option>
        <option value="concluida">Concluída</option>
      </select>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded"
        onClick={handleSaveEdit}
      >
        <i className="fas fa-save"></i>
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 ml-2 rounded"
        onClick={onCancelEdit}
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

interface TaskListItemProps {
  task: Task;
  onDelete: (task: Task) => void;
  onEdit: (taskId: any, newTitle: string, newStatus: string) => void;
}

export const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveEdit = (newTitle: string, newStatus: string) => {
    onEdit(task.id, newTitle, newStatus);
    setIsEditing(false);
  };

  return (
    <li className="bg-gray-200 p-4 rounded-3xl flex flex-row justify-between space-x-2 items-center">
      <div className="">
        {isEditing ? (
          <TaskEditForm
            task={task}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={() => setIsEditing(false)}
          />
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2">{task.title}</h2>
            <p className="text-sm text-gray-500">Status: {task.status}</p>
            <p className="text-sm text-gray-500">
              <p className="text-sm text-gray-500">
                Criado em:{" "}
                {task.created_at ? task.created_at.toLocaleString() : "N/A"}
              </p>
            </p>
          </>
        )}
      </div>
      <div className="mt-4" />
      <div className="flex flex-col space-x-1 space-y-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-14 h-14 ml-1"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-edit"></i>
          )}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full w-14 h-14"
          onClick={() => onDelete(task)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </li>
  );
};
