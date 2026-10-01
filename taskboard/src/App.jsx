import "./App.css";
import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Board from "./components/Board.jsx";
import Counter from "./components/Counter.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Accordion from "./components/Accordion.jsx";
import Shop from "./components/catalogue/Shop.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import WeatherDashboard from "./components/WeatherDashboard.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

const SEED_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

function App() {
  // Lab 5.3: I persist tasks in localStorage. null means I still need to seed the board.
  const [tasks, setTasks] = useLocalStorage("tasks", null);
  const needsSeed = tasks === null;

  useEffect(() => {
    if (!needsSeed) return;

    const controller = new AbortController();
    fetch(SEED_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((todos) => {
        setTasks(
          todos.map((todo) => ({
            id: String(todo.id),
            title: todo.title,
            status: todo.completed ? "done" : "todo",
            points: 1,
          }))
        );
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [needsSeed, setTasks]);

  function handleAdd(newTask) {
    const id = crypto.randomUUID();
    setTasks((previousTasks) => [
      ...previousTasks,
      { ...newTask, id, status: "todo" },
    ]);
  }

  function handleStatusChange(id, status) {
    setTasks((previousTasks) =>
      previousTasks.map((task) => task.id === id ? { ...task, status } : task)
    );
  }

  function handleRename(id, title) {
    setTasks((previousTasks) =>
      previousTasks.map((task) => task.id === id ? { ...task, title } : task)
    );
  }

  function handleDelete(id) {
    setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id));
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
      <Board tasks={tasks} onStatusChange={handleStatusChange} onRename={handleRename} onDelete={handleDelete} />
      {/* Lab 5.2: I rendered WeatherDashboard here for the weather lab. */}
      <WeatherDashboard />
      <section className="practice">
        {/* Lab 4.1: counter, theme toggle, and accordion practice. */}
        <h2>Lab 4.1 practice</h2>
        <Counter />
        <ThemeToggle />
        <Accordion />
      </section>
      <section className="practice">
        {/* Lab 4.2: product catalogue and shopping cart. */}
        <h2 className="catalogue-title">Lab 4.2 shopping cart</h2>
        <Shop />
      </section>
    </main>
  );
}

export default App;
