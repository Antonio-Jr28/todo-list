import React from "react";

import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { TaskListContainer } from "./components/org.todo-list/todo-list";

export const App = () => {
  return (
    <div>
      <TaskListContainer />
    </div>
  );
};
