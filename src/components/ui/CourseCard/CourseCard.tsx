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
  onViewAnswers,
  onRetake,
  isOfficial = false,
}) => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-between">
      {/* Nội dung */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {isOfficial && (
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-medium">
              Đề thi thật
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 mt-1">{subtitle}</p>

        <div className="text-xs text-gray-500 mt-1">
          • {duration} • {parts} • {questions}
        </div>

        {score && (
          <div className="mt-3 flex items-center gap-2 text-green-500 text-sm font-medium">
            <span className="text-xl"><CircleCheck /></span> Total score: {score}
          </div>
        )}
      </div>

      {/* Buttons luôn ở đáy */}
      <div className="flex items-center justify-between mt-4">
        <Button
          onClick={onViewAnswers}
          variant="outline"
          className="text-sm w-[70%]"
        >
          Xem đáp án
        </Button>
        <Button onClick={onRetake} variant="primary">
         Làm bài
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
