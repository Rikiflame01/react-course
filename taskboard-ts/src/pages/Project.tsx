// Lab 6.2
import { Link, useOutletContext, useParams } from "react-router";
import Header from "../components/Header";
import Board from "../components/Board";
import AddTaskForm from "../components/AddTaskForm";
import type { NewTaskFields } from "../components/AddTaskForm";
import { projects } from "../data/projects";
import type { Status } from "../types";
import type { BoardContext } from "./Layout";

export default function Project() {
  const { projectId } = useParams();
  const { tasks, setTasks } = useOutletContext<BoardContext>();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <section className="page-panel">
        <h1>Project not found</h1>
        <Link to="/">Back to dashboard</Link>
      </section>
    );
  }

  const projectTasks = tasks.filter((task) => task.projectId === projectId);

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
      <Header tasks={projectTasks} />
      <p className="page-kicker">{project.name}</p>
      <AddTaskForm onAdd={handleAdd} projectId={project.id} />
      <Board
        tasks={projectTasks}
        onStatusChange={handleStatusChange}
        onRename={handleRename}
        onDelete={handleDelete}
      />
    </main>
  );
}
