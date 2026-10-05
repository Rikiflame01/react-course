// Lab 7.3
import { useQuery } from "@tanstack/react-query";
import Column from "./Column";
import { fetchTasks } from "../api/tasks";
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
  const { isPending, isError, error } =
    useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });

  if (isPending) return <p className="seed-loading">Loading tasks...</p>;
  if (isError) return <p role="alert">{error.message}</p>;

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
