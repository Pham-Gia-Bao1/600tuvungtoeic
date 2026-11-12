import { supabase } from "../lib/supabase";
import type { CourseType } from "../types/course";

type CourseRow = {
  id: number;
  sort_order: number;
  content: CourseType;
};

export const courseService = {
  fetchCourses: async (): Promise<CourseType[]> => {
    const { data, error } = await supabase
      .from("courses")
      .select("id, sort_order, content")
      .order("sort_order");

    if (error) throw error;
    return ((data ?? []) as CourseRow[]).map((row) => row.content);
  },
};
