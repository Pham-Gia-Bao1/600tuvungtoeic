
// CourseCard.types.ts
import { CourseType } from "@/types/course";
import { ReactNode, HTMLAttributes } from "react";

export interface CourseCardProps
  extends Omit<CourseType, "title">,
    Omit<HTMLAttributes<HTMLDivElement>, "className" | "children" | "id" | "title"> {
  /** Custom action buttons under the card */
  actions?: ReactNode;
  /** Callback when retry button is clicked */
  onRetry?: () => void;
  /** Callback when view answer button is clicked */
  onViewAnswer?: () => void;
  /** Custom class names */
  className?: string;
  /** Children elements inside the card */
  children?: ReactNode;
  /** Callback khi start course */
  onStart?: () => void;
  /** Title for the course card */
  title: string;
    /** ID for the course card */
  onRetake?: () => void;
  id: number | string;
  onViewAnswers?: () => void;
}