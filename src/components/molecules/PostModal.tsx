import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

interface PostModalProps {
  isEdit?: boolean;
  initialContent?: string;
  onClose: () => void;
  onSubmit: (data: { content: string; font: string }) => void;
}

const PostModal = ({ isEdit = false, initialContent = '', onClose, onSubmit }: PostModalProps) => {
  const [content, setContent] = useState(initialContent);
  const [selectedFont, setSelectedFont] = useState('sans');

  const handleSubmit = () => {
    onSubmit({ content, font: selectedFont });
    onClose();
  };

  return (
    <div className="p-4">
      <textarea
        className={`w-full h-40 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 font-${selectedFont}`}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-between items-center mb-4">
        <Select value={selectedFont} onValueChange={setSelectedFont}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sans">Sans-serif</SelectItem>
            <SelectItem value="serif">Serif</SelectItem>
            <SelectItem value="mono">Monospace</SelectItem>
            <SelectItem value="cursive">Cursive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {isEdit ? 'Save Changes' : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default PostModal;
