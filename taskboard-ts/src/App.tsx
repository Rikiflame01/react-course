// Lab 6.1 board shell. Lab 6.2 moved routing into main.tsx and pages/.
import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Board from "./components/Board";
import AddTaskForm from "./components/AddTaskForm";
import type { NewTaskFields } from "./components/AddTaskForm";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { SEED_URL, toTasks } from "./data/seed";
import type { Todo } from "./data/seed";
import type { Status, Task } from "./types";

function App() {
  // Lab 5.3: I persist tasks in localStorage. null means I still need to seed the board.
  const [tasks, setTasks] = useLocalStorage<Task[] | null>("tasks", null);
  const needsSeed = tasks === null;

  useEffect(() => {
    if (!needsSeed) return;

    const controller = new AbortController();
    fetch(SEED_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((todos: Todo[]) => {
        setTasks(toTasks(todos));
      })
      .catch((err: unknown) => {
        if (!controller.signal.aborted) console.error(err);
      });

    return () => controller.abort();
  }, [needsSeed, setTasks]);

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

  if (tasks === null) {
    return <p className="seed-loading">Loading starter tasks...</p>;
  }

  return (
    <main>
      <Header tasks={tasks} />
      <button type="button" className="reset-board" onClick={() => setTasks(null)}>
        Reset board
      </button>
      {/* Lab 4.3: controlled task form and interactive task board. */}
      <AddTaskForm onAdd={handleAdd} />
      <Board
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onRename={handleRename}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default App;
