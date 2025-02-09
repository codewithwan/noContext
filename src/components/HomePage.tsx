import { useState, useRef, useEffect } from 'react';
import { Heart, Share2, MoreHorizontal, PlusCircle, Home, Compass, User, Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select"

// Create/Edit Post Modal Component
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

// Report Modal Component
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

// Post Options Menu Component
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

// Post Card Component (Updated with Edit Modal)
interface PostCardProps {
  username: string;
  timestamp: string;
  content: string;
  font: string;
  likes: number;
}

const PostCard = ({ username, timestamp, content, font, likes }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [postContent, setPostContent] = useState(content);
  const [showOptions, setShowOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const currentUser = "creative_writer"; // Replace with actual current user logic

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleEdit = (newContent: { content: string; font: string }) => {
    setPostContent(newContent.content);
    setShowEditModal(false);
  };

  const handleDelete = () => {
    console.log('Post deleted');
  };

  const handleReport = (reason: string) => {
    console.log(`Reported for: ${reason}`);
    setShowReportModal(false);
  };

  const getFontClass = () => {
    switch(font) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      case 'cursive': return 'font-serif italic';
      default: return 'font-sans';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 mb-4 relative">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
            {username[0].toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{username}</h3>
            <p className="text-xs text-gray-500">{timestamp}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowOptions(!showOptions)}>
          <MoreHorizontal className="w-5 h-5" />
        </button>
        {showOptions && (
          <PostOptionsMenu
            isOwner={username === currentUser}
            onEdit={() => setShowEditModal(true)}
            onDelete={handleDelete}
            onReport={() => setShowReportModal(true)}
            onClose={() => setShowOptions(false)}
          />
        )}
      </div>

      <div className={`p-6 ${getFontClass()} bg-gradient-to-br from-gray-50 to-white`}>
        <p className="text-gray-800 text-lg leading-relaxed">{postContent}</p>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <button 
          onClick={handleLike}
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current text-red-500' : ''}`} />
          <span>{likeCount}</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {showEditModal && (
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Post</DialogTitle>
            </DialogHeader>
            <PostModal
              isEdit={true}
              initialContent={postContent}
              onClose={() => setShowEditModal(false)}
              onSubmit={handleEdit}
            />
          </DialogContent>
        </Dialog>
      )}

      {showReportModal && (
        <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report Post</DialogTitle>
            </DialogHeader>
            <ReportModal
              onClose={() => setShowReportModal(false)}
              onSubmit={handleReport}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Main Home Page Component
const HomePage = () => {
  const [posts, setPosts] = useState([
    {
      username: "creative_writer",
      timestamp: "2 hours ago",
      content: "Life is not about finding yourself. Life is about creating yourself.",
      font: "serif",
      likes: 42
    },
    {
      username: "tech_enthusiast",
      timestamp: "4 hours ago",
      content: "𝚃𝚑𝚎 𝚋𝚎𝚜𝚝 𝚠𝚊𝚢 𝚝𝚘 𝚙𝚛𝚎𝚍𝚒𝚌𝚝 𝚝𝚑𝚎 𝚏𝚞𝚝𝚞𝚛𝚎 𝚒𝚜 𝚝𝚘 𝚌𝚛𝚎𝚊𝚝𝚎 𝚒𝚝.",
      font: "mono",
      likes: 89
    }
  ]);

  const handleNewPost = (postData: { content: string; font: string }) => {
    const newPost = {
      username: "user",
      timestamp: "Just now",
      content: postData.content,
      font: postData.font,
      likes: 0
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              noContext
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                  <PlusCircle className="w-6 h-6" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                </DialogHeader>
                <PostModal
                  onClose={() => {}}
                  onSubmit={handleNewPost}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-24 lg:pb-16 px-4 max-w-3xl mx-auto">
        <div className="space-y-4">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col space-y-6 bg-white p-3 rounded-full shadow-sm">
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <Home className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <Compass className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <User className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 lg:hidden flex items-center bg-white rounded-full shadow-lg px-6 py-3 space-x-8">
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <Home className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <Compass className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <User className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default HomePage;