import { create } from "zustand";

interface Project {
  name: string;
  location: string;
  price: string;
  builder: string;
  lat?: number;
  lng?: number;
}

interface StoreState {
  projects: Project[];
  addProject: (p: Project) => void;
  clear: () => void;
}

export const useProjectsStore = create<StoreState>((set) => ({
  projects: [],
  addProject: (p) =>
    set((state) => ({ projects: [...state.projects, p] })),
  clear: () => set({ projects: [] }),
}));
