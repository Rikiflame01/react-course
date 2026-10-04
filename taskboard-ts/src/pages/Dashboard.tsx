// Lab 6.2
import { useOutletContext, useSearchParams } from "react-router";
import Header from "../components/Header";
import Board from "../components/Board";
import AddTaskForm from "../components/AddTaskForm";
import type { NewTaskFields } from "../components/AddTaskForm";
import type { Status } from "../types";
import type { BoardContext } from "./Layout";

export default function Dashboard() {
  const { tasks, setTasks } = useOutletContext<BoardContext>();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const visible = tasks.filter((task) =>
    task.title.toLowerCase().includes(q.toLowerCase())
  );

  function handleSearch(value: string) {
    setSearchParams(value ? { q: value } : {});
  }

  function handleAdd(newTask: NewTaskFields) {
    const id = crypto.randomUUID();
    setTasks((previousTasks) => [
      ...(previousTasks ?? []),
      { ...newTask, id, status: "todo" },
    ]);
  }

  function handleStatusChange(id: string, status: Status) {
    setTasks((previousTasks) =>
      (previousTasks ?? []).map((task) => (task.id === id ? { ...task, status } : task))
    );
  }

  function handleRename(id: string, title: string) {
    setTasks((previousTasks) =>
      (previousTasks ?? []).map((task) => (task.id === id ? { ...task, title } : task))
    );
  }

  function handleDelete(id: string) {
    setTasks((previousTasks) =>
      (previousTasks ?? []).filter((task) => task.id !== id)
    );
  }

  return (
    <main>
      <Header tasks={visible} />
      <button type="button" className="reset-board" onClick={() => setTasks(null)}>
        Reset board
      </button>
      <form className="task-search" role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="task-search">Search tasks</label>
        <input
          id="task-search"
          type="search"
          value={q}
          placeholder="Filter by title"
          onChange={(event) => handleSearch(event.target.value)}
        />
      </form>
      <AddTaskForm onAdd={handleAdd} />
      <Board
        tasks={visible}
        onStatusChange={handleStatusChange}
        onRename={handleRename}
        onDelete={handleDelete}
      />
    </main>
  );
}
