// Lab 6.2
export type Status = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  status: Status;
  points: number;
  projectId: string;
  assignee?: string;
  tags?: string[];
}
