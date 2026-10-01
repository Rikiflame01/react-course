import TaskCard from "./TaskCard.jsx";

// Lab 4.3: Column forwards each task and its actions to TaskCard.
function Column({ heading, status, tasks, onStatusChange, onRename, onDelete }) {
  return (
    <section className={`column column-${status}`}>
      <h2>
        {heading} <span className="column-count">{tasks.length}</span>
      </h2>
      {tasks.length === 0 ? (
        <p className="column-empty">Nothing here yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} onStatusChange={onStatusChange} onRename={onRename} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Column;
