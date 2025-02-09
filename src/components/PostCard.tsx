import React from 'react';

interface PostCardProps {
  content: string;
}

const PostCard: React.FC<PostCardProps> = ({ content }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <p className="text-gray-800">{content}</p>
    </div>
  );
};

export default PostCard;
