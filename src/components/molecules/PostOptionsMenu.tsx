import { useRef, useEffect } from 'react';

interface PostOptionsMenuProps {
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onReport: () => void;
  onClose: () => void;
}

const PostOptionsMenu = ({ isOwner, onEdit, onDelete, onReport, onClose }: PostOptionsMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
      {isOwner ? (
        <>
          <button onClick={onEdit} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
          <button onClick={onDelete} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Delete</button>
        </>
      ) : (
        <button onClick={onReport} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Report</button>
      )}
    </div>
  );
};

export default PostOptionsMenu;
