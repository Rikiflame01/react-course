import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";

export type NewTaskFields = {
  title: string;
  assignee: string;
  points: number;
};

type AddTaskFormProps = {
  onAdd: (task: NewTaskFields) => void;
};

type FormState = {
  title: string;
  assignee: string;
  points: string;
};

// Lab 4.3: Controlled form for creating tasks.
const emptyForm: FormState = { title: "", assignee: "", points: "1" };

function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Lab 5.3: I focus the title field when the form first appears.
    titleRef.current?.focus();
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    if (name === "title" && value.trim().length >= 3) setError("");
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = form.title.trim();
    if (title.length < 3) {
      setError("Title needs 3+ characters.");
      return;
    }
    onAdd({
      title,
      assignee: form.assignee.trim(),
      points: Math.max(1, Number(form.points) || 1),
    });
    setForm({ ...emptyForm });
    setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add a task</h2>
      <div className="task-form-fields">
        <div>
          <label htmlFor="new-task-title">Title</label>
          <input
            id="new-task-title"
            name="title"
            ref={titleRef}
            value={form.title}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "new-task-error" : undefined}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="new-task-assignee">Assignee</label>
          <input
            id="new-task-assignee"
            name="assignee"
            value={form.assignee}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="new-task-points">Points</label>
          <input
            id="new-task-points"
            name="points"
            type="number"
            min="1"
            value={form.points}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add task</button>
      </div>
      {error && <p id="new-task-error" role="alert">{error}</p>}
    </form>
  );
}

export default AddTaskForm;
