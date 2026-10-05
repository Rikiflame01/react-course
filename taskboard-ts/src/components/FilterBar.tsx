import { useSearchParams } from "react-router";
import { useFilterStore } from "../state/useFilterStore";
import { useTaskStore } from "../state/useTaskStore";

export default function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const tasks = useTaskStore((s) => s.tasks);
  const assignee = useFilterStore((s) => s.assignee);
  const setAssignee = useFilterStore((s) => s.setAssignee);
  const assignees = [...new Set(tasks.flatMap((t) => (t.assignee ? [t.assignee] : [])))];

  function handleSearch(value: string) {
    setSearchParams(value ? { q: value } : {});
  }

  return (
    <form className="task-search" role="search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="task-search">Search tasks</label>
      <input
        id="task-search"
        type="search"
        value={q}
        placeholder="Filter by title"
        onChange={(event) => handleSearch(event.target.value)}
      />
      <label htmlFor="assignee-filter">Assignee</label>
      <select
        id="assignee-filter"
        value={assignee}
        onChange={(event) => setAssignee(event.target.value)}
      >
        <option value="">Everyone</option>
        {assignees.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
    </form>
  );
}
