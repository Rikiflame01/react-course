// Lab 7.2: seeding left Layout. Tasks now live in the Zustand store.
import type { Task } from "../types";
import { projects } from "./projects";

export const SEED_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

export type Todo = { id: number; title: string; completed: boolean };

export function toTasks(todos: Todo[]): Task[] {
  return todos.map((t, index) => ({
    id: String(t.id),
    title: t.title,
    status: t.completed ? "done" : "todo",
    points: 1,
    projectId: projects[index % projects.length]?.id ?? "website",
  }));
}
