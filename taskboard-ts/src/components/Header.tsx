import { useEffect } from "react";
import { useTaskStore } from "../state/useTaskStore";

type HeaderProps = {
  projectId?: string;
};

function Header({ projectId }: HeaderProps) {
  const allTasks = useTaskStore((s) => s.tasks);
  const tasks = projectId
    ? allTasks.filter((task) => task.projectId === projectId)
    : allTasks;
  const openCount = tasks.filter((task) => task.status !== "done").length;

  useEffect(() => {
    document.title = `TaskBoard (${openCount} open)`;
  }, [openCount]);

  return (
    <header className="page-header">
      <p className="page-kicker">Damian Grobler</p>
      <h1>TaskBoard</h1>
      <p className="task-count">{tasks.length} tasks · {openCount} open</p>
    </header>
  );
}

export default Header;
