import React from "react";
import { Button } from "@/components/common/Button/Button";
import { Headphones, BookOpen, Clock } from "lucide-react";
import Modal from "@/components/common/Modal/Modal";
import { StartTestModalProps } from "./StartTestModal.types";

const StartTestModal: React.FC<StartTestModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  listeningTime,
  readingTime,
  totalTime,
  rules = [],
  onStart,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <h2 className="text-xl font-bold text-center mb-4">
        Welcome, you are about to start the <br />
        <span className="text-2xl">{title}</span>
      </h2>

      <div className="flex justify-around text-center mb-4">
        <div>
          <Headphones className="mx-auto text-blue-500" />
          <p className="font-medium">Listening</p>
          <p className="text-sm text-gray-500">{listeningTime} minutes</p>
        </div>
        <div className="text-2xl font-bold flex items-center">+</div>
        <div>
          <BookOpen className="mx-auto text-green-500" />
          <p className="font-medium">Reading</p>
          <p className="text-sm text-gray-500">{readingTime} minutes</p>
        </div>
        <div className="text-2xl font-bold flex items-center">=</div>
        <div>
          <Clock className="mx-auto text-orange-500" />
          <p className="font-medium">Total time</p>
          <p className="text-sm text-gray-500">{totalTime} minutes</p>
        </div>
      </div>

      <ul className="text-sm text-gray-600 space-y-1 mb-6">
        {rules.length > 0 ? (
          rules.map((rule, idx) => <li key={idx}>• {rule}</li>)
        ) : (
          <>
            <li>• This test has two sections: reading and listening</li>
            <li>• You will start with a 7.5-minute reading section</li>
            <li>• Pace yourself to avoid running out of time</li>
            <li>• No penalty for wrong answers</li>
            <li>• Once you click “Next” you cannot go back</li>
            <li>• Full-screen mode recommended</li>
          </>
        )}
      </ul>

      <div className="flex justify-between gap-4">
        <Button
          onClick={() => setIsOpen(false)}
          variant="outline"
          className="w-1/2"
        >
          Trở lại
        </Button>
        <Button
          onClick={() => {
            setIsOpen(false);
            onStart();
          }}
          variant="primary"
          className="w-1/2"
        >
          Bắt đầu làm bài
        </Button>
      </div>
    </Modal>
  );
};

export default StartTestModal;