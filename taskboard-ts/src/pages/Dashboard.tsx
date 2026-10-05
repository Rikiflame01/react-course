import Header from "../components/Header";
import Board from "../components/Board";
import AddTaskForm from "../components/AddTaskForm";
import FilterBar from "../components/FilterBar";
import { useTaskStore } from "../state/useTaskStore";

export default function Dashboard() {
  const resetTasks = useTaskStore((s) => s.resetTasks);

  return (
    <main>
      <Header />
      <button type="button" className="reset-board" onClick={resetTasks}>
        Reset board
      </button>
      <FilterBar />
      <AddTaskForm />
      <Board />
    </main>
  );
}
