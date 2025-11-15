// types/project.ts
export interface Project {
  id: string;
  name: string;
  location: string;
  price?: string;
  builder?: string;
  latitude?: number | null;
  longitude?: number | null;
}
