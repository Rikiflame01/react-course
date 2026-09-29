function TaskCard({ title, assignee, points }) {
  return (
    <article className="card task-card">
      <h3>{title}</h3>
      {assignee && <p className="task-assignee">Assigned to {assignee}</p>}
      {points > 0 && <p className="task-points">{points} pts</p>}
    </article>
  );
}

export default TaskCard;
