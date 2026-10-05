// Lab 7.3: tasks from useQuery
// Lab 7.2: assignee from useFilterStore
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import TaskCard from "./TaskCard";
import { fetchTasks } from "../api/tasks";
import { useFilterStore } from "../state/useFilterStore";
import type { Status } from "../types";

type ColumnProps = {
  heading: string;
  status: Status;
  projectId?: string;
};

function Column({ heading, status, projectId }: ColumnProps) {
  const { data: allTasks = [] } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
  const assignee = useFilterStore((s) => s.assignee);
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") ?? "").toLowerCase();

  const tasks = allTasks.filter((task) =>
    task.status === status &&
    (!projectId || task.projectId === projectId) &&
    (!assignee || task.assignee === assignee) &&
    task.title.toLowerCase().includes(q)
  );

  return (
    <section className={`column column-${status}`}>
      <h2>
        {heading} <span className="column-count">{tasks.length}</span>
      </h2>
      {tasks.length === 0 ? (
        <p className="column-empty">Nothing here yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Column;
