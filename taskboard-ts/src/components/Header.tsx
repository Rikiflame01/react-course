import { useEffect } from "react";
import type { Task } from "../types";

type HeaderProps = {
  tasks: Task[];
};

// Lab 4.3: Header displays the current task count.
function Header({ tasks }: HeaderProps) {
  const openCount = tasks.filter((task) => task.status !== "done").length;

  useEffect(() => {
    // Lab 5.3: I keep the browser tab title in sync with how many tasks are still open.
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
