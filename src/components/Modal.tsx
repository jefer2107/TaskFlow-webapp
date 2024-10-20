import { FC } from "react";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-5 px-3 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg px-6 py-10 w-96">
        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
