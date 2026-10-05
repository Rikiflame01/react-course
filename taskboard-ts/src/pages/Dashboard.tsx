// Lab 7.2: FilterBar
// Lab 7.3: Board loads tasks from the API
import Header from "../components/Header";
import Board from "../components/Board";
import AddTaskForm from "../components/AddTaskForm";
import FilterBar from "../components/FilterBar";
import { projects } from "../data/projects";

export default function Dashboard() {
  return (
    <main>
      <Header />
      <FilterBar />
      <p className="hint">New tasks added here go into the {projects[0].name} project, or pick another in the form.</p>
      <AddTaskForm />
      <Board />
    </main>
  );
}
