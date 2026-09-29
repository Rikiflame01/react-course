import TaskCard from "./TaskCard.jsx";

function Column({ heading, status, tasks }) {
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
              <TaskCard title={task.title} assignee={task.assignee} points={task.points} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Column;
