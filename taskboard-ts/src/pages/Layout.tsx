// Lab 6.2: nav and Outlet
// Lab 7.1: ThemeButton, useAuth
import { NavLink, Outlet, useNavigate } from "react-router";
import { ThemeButton } from "../components/ThemeButton";
import { useAuth } from "../hooks/useAuth";
import { projects } from "../data/projects";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
        <ThemeButton />
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
        <Outlet />
      </div>
    </div>
  );
}
