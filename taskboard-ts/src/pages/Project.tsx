// Lab 6.2: project route
// Lab 7.2: FilterBar
// Lab 7.3: tasks from useQuery
import { Link, useParams } from "react-router";
import Header from "../components/Header";
import Board from "../components/Board";
import AddTaskForm from "../components/AddTaskForm";
import FilterBar from "../components/FilterBar";
import { projects } from "../data/projects";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks";

export default function Project() {
  const { projectId } = useParams();
  const { data: tasks = [] } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
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

  return (
    <main>
      <Header projectId={project.id} />
      <p className="page-kicker">{project.name}</p>
      <p className="task-count">{projectTasks.length} tasks</p>
      <FilterBar />
      <AddTaskForm projectId={project.id} />
      <Board projectId={project.id} />
    </main>
  );
}
