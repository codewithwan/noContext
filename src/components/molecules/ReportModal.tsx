import { useState } from 'react';

interface ReportModalProps {
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const ReportModal = ({ onClose, onSubmit }: ReportModalProps) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    onSubmit(reason);
    onClose();
  };

  return (
    <div className="p-4">
      <textarea
        className="w-full h-40 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
        placeholder="Describe the violation..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Report
        </button>
      </div>
    </div>
  );
};

export default ReportModal;
