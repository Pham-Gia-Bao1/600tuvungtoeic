import React from "react";
import { X } from "lucide-react";
import { ModalProps } from "./Modal.types";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative animate-fadeIn">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
