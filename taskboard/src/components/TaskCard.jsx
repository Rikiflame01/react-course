import { useState } from "react";

// Lab 4.3: TaskCard supports local title editing and reports task actions upward.
function TaskCard({ task, onStatusChange, onRename, onDelete }) {
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

  return (
    <article className="card task-card">
      {isEditing ? (
        <div className="task-edit">
          <label htmlFor={`task-title-${task.id}`}>Task title</label>
          <input id={`task-title-${task.id}`} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => {
            if (event.key === "Enter") { event.preventDefault(); handleSave(); }
            if (event.key === "Escape") handleCancel();
          }} autoFocus />
          <div className="task-actions">
            <button type="button" onClick={handleSave} disabled={draft.trim().length < 3}>Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3>{task.title}</h3>
          <button type="button" onClick={() => { setDraft(task.title); setIsEditing(true); }}>Edit</button>
        </>
      )}
      {task.assignee && <p className="task-assignee">Assigned to {task.assignee}</p>}
      {task.points > 0 && <p className="task-points">{task.points} pts</p>}
      <label className="task-status-label" htmlFor={`task-status-${task.id}`}>Status</label>
      <select id={`task-status-${task.id}`} value={task.status} onChange={(event) => onStatusChange(task.id, event.target.value)}>
        <option value="todo">To do</option>
        <option value="doing">In progress</option>
        <option value="done">Done</option>
      </select>
      <button className="task-delete" type="button" onClick={() => {
        if (window.confirm(`Delete "${task.title}"?`)) onDelete(task.id);
      }}>Delete</button>
    </article>
  );
}

export default TaskCard;
