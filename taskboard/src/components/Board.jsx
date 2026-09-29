import Column from "./Column.jsx";

const columns = [
  { status: "todo", heading: "To do" },
  { status: "doing", heading: "In progress" },
  { status: "done", heading: "Done" },
];

function Board({ tasks }) {
  return (
    <div className="board">
      {columns.map((column) => (
        <Column
          key={column.status}
          status={column.status}
          heading={column.heading}
          tasks={tasks.filter((task) => task.status === column.status)}
        />
      ))}
    </div>
  );
}

export default Board;
