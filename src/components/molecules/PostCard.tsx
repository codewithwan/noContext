import { useState } from 'react';
import { Heart, Share2, MoreHorizontal } from 'lucide-react';
import PostOptionsMenu from './PostOptionsMenu';
import PostModal from './PostModal';
import ReportModal from './ReportModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';

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
          <DialogContent aria-describedby="edit-post-description">
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
          <DialogContent aria-describedby="report-post-description">
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

export default PostCard;
