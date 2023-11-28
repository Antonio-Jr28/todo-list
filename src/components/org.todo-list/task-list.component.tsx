import React from "react";
import { Task, TaskListItem } from "./task-list-item-component";

interface TaskListProps {
  tasks: Task[];
  onDelete: (task: Task) => void;
  onEdit: (taskId: any, newTitle: string, newStatus: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onEdit,
}) => {
  return (
    <ul className="space-y-6">
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};
