import { create } from "zustand";

// Search stays in the URL (useSearchParams, Lab 6.2).
type FilterStore = {
  assignee: string;
  setAssignee: (assignee: string) => void;
};

export const useFilterStore = create<FilterStore>()((set) => ({
  assignee: "",
  setAssignee: (assignee) => set({ assignee }),
}));
