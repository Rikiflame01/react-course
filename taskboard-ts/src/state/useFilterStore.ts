// Lab 7.2: assignee filter. Search stays in the URL (Lab 6.2).
import { create } from "zustand";
type FilterStore = {
  assignee: string;
  setAssignee: (assignee: string) => void;
};

export const useFilterStore = create<FilterStore>()((set) => ({
  assignee: "",
  setAssignee: (assignee) => set({ assignee }),
}));
