import Column from "./Column";
import type { Status } from "../types";

type BoardProps = {
  projectId?: string;
};

const columns: { status: Status; heading: string }[] = [
  { status: "todo", heading: "To do" },
  { status: "doing", heading: "In progress" },
  { status: "done", heading: "Done" },
];

function Board({ projectId }: BoardProps) {
  return (
    <div className="board">
      {columns.map((column) => (
        <Column
          key={column.status}
          status={column.status}
          heading={column.heading}
          projectId={projectId}
        />
      ))}
    </div>
  );
}

export default Board;
