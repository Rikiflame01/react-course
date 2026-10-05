import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, Status } from "../types";
import { tasksReducer } from "./tasksReducer";

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  moveTask: (id: string, status: Status) => void;
  renameTask: (id: string, title: string) => void;
  deleteTask: (id: string) => void;
  resetTasks: () => void;
};

function readLegacyTasks(): Task[] {
  try {
    if (localStorage.getItem("taskboard")) return [];
    const raw = localStorage.getItem("tasks");
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    localStorage.removeItem("tasks");
    return parsed as Task[];
  } catch {
    return [];
  }
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: readLegacyTasks(),
      addTask: (task) =>
        set((s) => ({ tasks: tasksReducer(s.tasks, { type: "added", task }) })),
      moveTask: (id, status) =>
        set((s) => ({ tasks: tasksReducer(s.tasks, { type: "moved", id, status }) })),
      renameTask: (id, title) =>
        set((s) => ({ tasks: tasksReducer(s.tasks, { type: "renamed", id, title }) })),
      deleteTask: (id) =>
        set((s) => ({ tasks: tasksReducer(s.tasks, { type: "deleted", id }) })),
      resetTasks: () => set({ tasks: [] }),
    }),
    { name: "taskboard" },
  ),
);
