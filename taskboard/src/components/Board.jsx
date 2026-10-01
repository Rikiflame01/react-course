import Column from "./Column.jsx";

const columns = [
  { status: "todo", heading: "To do" },
  { status: "doing", heading: "In progress" },
  { status: "done", heading: "Done" },
];

// Lab 4.3: Board filters tasks by status and forwards task actions.
function Board({ tasks, onStatusChange, onRename, onDelete }) {
  return (
    <div className="board">
      {columns.map((column) => (
        <Column
          key={column.status}
          status={column.status}
          heading={column.heading}
          tasks={tasks.filter((task) => task.status === column.status)}
          onStatusChange={onStatusChange}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default Board;
