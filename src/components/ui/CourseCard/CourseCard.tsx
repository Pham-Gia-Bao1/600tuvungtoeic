import React from "react";
import { CourseCardProps } from "./CourseCard.types";
import { Button } from "@/components/common/Button/Button";
import { CircleCheck } from "lucide-react";

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  subtitle,
  duration,
  parts,
  questions,
  score,
  isOfficial = false,
  onViewAnswers,
  onRetake,
  // new flexible slots
  headerContent,
  footerContent,
  leftButton,
  rightButton,
  children,
  className = "",
  viewAnswersText = "Xem đáp án",
  retakeText = "Làm bài",
}) => {
  return (
    <div
      className={`w-full max-w-md bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {/* Header */}
      {headerContent ? (
        headerContent
      ) : (
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {isOfficial && (
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-medium">
              Đề thi thật
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div className="flex-1 mt-2">
        {children ? (
          children
        ) : (
          <>
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
            {(duration || parts || questions) && (
              <div className="text-xs text-gray-500 mt-1">
                • {duration} • {parts} • {questions}
              </div>
            )}
            {score && (
              <div className="mt-3 flex items-center gap-2 text-green-500 text-sm font-medium">
                <CircleCheck className="w-4 h-4" />
                <span>Total score: {score}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      {footerContent ? (
        footerContent
      ) : (
        <div className="flex items-center justify-between mt-4">
          {leftButton ? (
            leftButton
          ) : (
            <Button
              onClick={onViewAnswers}
              variant="outline"
              className="text-sm w-[70%]"
            >
              {viewAnswersText}
            </Button>
          )}
          {rightButton ? (
            rightButton
          ) : (
            <Button onClick={onRetake} variant="primary">
              {retakeText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseCard;