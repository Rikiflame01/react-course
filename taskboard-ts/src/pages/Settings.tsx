import { useTaskStore } from "../state/useTaskStore";

export default function Settings() {
  const resetTasks = useTaskStore((s) => s.resetTasks);

  return (
    <section className="page-panel">
      <h1>Settings</h1>
      <p>This page is only for logged-in users. TaskBoard still stores tasks in this browser.</p>
      <button type="button" className="reset-board" onClick={resetTasks}>
        Reset board
      </button>
    </section>
  );
}
