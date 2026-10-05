// Lab 7.3: move / rename / delete via TanStack Query
import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useMoveTask } from "../hooks/useMoveTask";
import { useRenameTask } from "../hooks/useRenameTask";
import type { Status, Task } from "../types";

type TaskCardProps = {
  task: Task;
};

function TaskCard({ task }: TaskCardProps) {
  const moveTask = useMoveTask();
  const renameTask = useRenameTask();
  const deleteTask = useDeleteTask();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const failed = moveTask.isError || renameTask.isError || deleteTask.isError;

  function handleSave() {
    const title = draft.trim();
    if (title.length < 3) return;
    renameTask.mutate({ id: task.id, title }, {
      onSuccess: () => setIsEditing(false),
    });
  }

  function handleCancel() {
    setDraft(task.title);
    setIsEditing(false);
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    moveTask.mutate({ id: task.id, status: event.target.value as Status });
  }

  function handleTitleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave();
    }
    if (event.key === "Escape") handleCancel();
  }

  function handleDeleteClick() {
    if (window.confirm(`Delete "${task.title}"?`)) deleteTask.mutate(task.id);
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
            <button
              type="button"
              onClick={handleSave}
              disabled={draft.trim().length < 3 || renameTask.isPending}
            >
              {renameTask.isPending ? "Saving..." : "Save"}
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
        disabled={moveTask.isPending}
      >
        <option value="todo">To do</option>
        <option value="doing">In progress</option>
        <option value="done">Done</option>
      </select>
      <button
        className="task-delete"
        type="button"
        onClick={handleDeleteClick}
        disabled={deleteTask.isPending}
      >
        {deleteTask.isPending ? "Deleting..." : "Delete"}
      </button>
      {failed && <p role="alert">Could not save the change. Is json-server running?</p>}
    </article>
  );
}

export default TaskCard;
