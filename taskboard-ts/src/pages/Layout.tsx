// Lab 6.2 / Lab 6.3
import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "../hooks/useAuth";
import { projects } from "../data/projects";
import { SEED_URL, toTasks } from "../data/seed";
import type { Todo } from "../data/seed";
import type { Task } from "../types";

export type BoardContext = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[] | null>>;
};

export default function Layout() {
  const [tasks, setTasks] = useLocalStorage<Task[] | null>("tasks", null);
  const needsSeed = tasks === null;
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Lab 6.2: older saved tasks had no projectId, so I fill it in once.
  useEffect(() => {
    if (!tasks) return;
    if (tasks.every((task) => task.projectId)) return;
    setTasks(
      tasks.map((task, index) => ({
        ...task,
        projectId: task.projectId ?? projects[index % projects.length]?.id ?? "website",
      }))
    );
  }, [tasks, setTasks]);

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

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="app">
      <nav className="app-nav">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        {projects.map((project) => (
          <NavLink key={project.id} to={`/projects/${project.id}`}>
            {project.name}
          </NavLink>
        ))}
        <NavLink to="/settings">Settings</NavLink>
        {user ? (
          <span className="app-nav-user">
            <span>{user.name}</span>
            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </span>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
      <div className="app-main">
        {tasks === null ? (
          <p className="seed-loading">Loading starter tasks...</p>
        ) : (
          <Outlet context={{ tasks, setTasks } satisfies BoardContext} />
        )}
      </div>
    </div>
  );
}
