import { FC } from "react";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white p-4 rounded shadow-lg">
        <p>{message}</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="bg-white text-blue-500 px-2 py-1 border-blue-500 rounded mr-2 text-xs"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-white text-red-500 border-red-500 px-2 py-1 rounded text-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
