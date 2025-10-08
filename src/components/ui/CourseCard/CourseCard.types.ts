import { CourseType } from "@/types/course";
import { ReactNode, HTMLAttributes } from "react";

export interface CourseCardProps
  extends Omit<CourseType, "title">,
    Omit<HTMLAttributes<HTMLDivElement>, "className" | "children" | "id" | "title"> {
  /** Custom action buttons under the card */
  actions?: ReactNode;

  /** ID cho course card */
  id: number | string;

  /** Tiêu đề của course card */
  title: string;

  /** Callback khi bắt đầu khóa học */
  onStart?: () => void;

  /** Callback khi làm lại bài (retake) */
  onRetake?: () => void;

  /** Callback khi xem đáp án */
  onViewAnswers?: () => void;

  /** Text cho nút "Xem đáp án" */
  viewAnswersText?: string;

  /** Text cho nút "Làm bài" */
  retakeText?: string;

  /** Custom class names */
  className?: string;

  /** Nội dung con hiển thị trong card */
  children?: ReactNode;

  /** Tùy biến phần header (thay vì title mặc định) */
  headerContent?: ReactNode;

  /** Tùy biến phần footer (thay vì 2 nút mặc định) */
  footerContent?: ReactNode;

  /** Nút trái tùy chỉnh (thay thế "Xem đáp án") */
  leftButton?: ReactNode;

  /** Nút phải tùy chỉnh (thay thế "Làm bài") */
  rightButton?: ReactNode;
}