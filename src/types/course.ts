// Course.types.ts
export interface CourseType {
  id: number | string;
  title: string;
  subtitle: string;
  description?: string;
  score?: number;
  image?: string;
  duration?: string;
  questions?: string;
  isOfficial?: boolean;
  parts?: string;
  listeningTime?: number;
  readingTime?: number;
  totalTime?: number;
  rules?: string[];
  isDone?: boolean;
}
