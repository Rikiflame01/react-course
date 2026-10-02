import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { Status, Task } from "../types";

type TaskCardProps = {
  task: Task;
  onStatusChange: (id: string, status: Status) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

// Lab 4.3: TaskCard supports local title editing and reports task actions upward.
function TaskCard({ task, onStatusChange, onRename, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  function handleSave() {
    const title = draft.trim();
    if (title.length < 3) return;
    onRename(task.id, title);
    setIsEditing(false);
  }

  function handleCancel() {
    setDraft(task.title);
    setIsEditing(false);
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    onStatusChange(task.id, event.target.value as Status);
  }

  function handleTitleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave();
    }
    if (event.key === "Escape") handleCancel();
  }

  function handleDeleteClick() {
    if (window.confirm(`Delete "${task.title}"?`)) onDelete(task.id);
  }

  return (
    <article className="card task-card">
      {isEditing ? (
        <div className="task-edit">
          <label htmlFor={`task-title-${task.id}`}>Task title</label>
          <input
            id={`task-title-${task.id}`}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleTitleKeyDown}
            autoFocus
          />
          <div className="task-actions">
            <button type="button" onClick={handleSave} disabled={draft.trim().length < 3}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3>{task.title}</h3>
          <button
            type="button"
            onClick={() => {
              setDraft(task.title);
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        </>
      )}
      {task.assignee && <p className="task-assignee">Assigned to {task.assignee}</p>}
      {task.points > 0 && <p className="task-points">{task.points} pts</p>}
      <label className="task-status-label" htmlFor={`task-status-${task.id}`}>Status</label>
      <select
        id={`task-status-${task.id}`}
        value={task.status}
        onChange={handleStatusChange}
      >
        <option value="todo">To do</option>
        <option value="doing">In progress</option>
        <option value="done">Done</option>
      </select>
      <button className="task-delete" type="button" onClick={handleDeleteClick}>
        Delete
      </button>
    </article>
  );
}

export default TaskCard;
